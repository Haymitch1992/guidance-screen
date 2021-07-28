<template>
  <div id="preview">
    <div class="video-item ">
      <h4>站台:</h4>
      <video id="localvideo" autoplay playsinline muted></video>
      <br />
      <textarea id="offer" style="display:none;"></textarea>
    </div>
    <div class="video-item">
      <h4>综控:</h4>
      <video id="remotevideo" autoplay playsinline></video>
      <br />
      <textarea id="answer" style="display:none;"></textarea>
    </div>
    <div class="video-btn-line">
      <button id="connserver">连接</button>
      <button id="leave" disabled>离开</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

export default {
  // 连接显示本地摄像头
  data() {
    return {};
  },

  mounted() {
    let _this = this;
    var localVideo = document.querySelector('video#localvideo');
    var remoteVideo = document.querySelector('video#remotevideo');

    var btnConn = document.querySelector('button#connserver');
    var btnLeave = document.querySelector('button#leave');

    var offer = document.querySelector('textarea#offer');
    var answer = document.querySelector('textarea#answer');

    // var report = document.querySelector('textarea#report');

    let bitrateGraph;
    let bitrateSeries;

    let packetGraph;
    let packetSeries;

    let lastResult;

    var localStream = null;
    var remoteStream = null;

    var pc = null;
    var pcConfig = null;
    var roomid = 224; // 房间号
    var socket = null;

    var offerdesc = null;
    var state = 'init';

    //设置定时器获取一些码流信息
    //=========================================================================================
    //如果返回的是false说明当前操作系统是手机端，如果返回的是true则说明当前的操作系统是电脑端

    function IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        'Android',
        'iPhone',
        'SymbianOS',
        'Windows Phone',
        'iPad',
        'iPod'
      ];
      var flag = true;

      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }

      return flag;
    }

    //如果返回true 则说明是Android  false是ios
    function is_android() {
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        //这个是安卓操作系统
        return true;
      }

      if (isIOS) {
        //这个是ios操作系统
        return false;
      }
    }

    //获取url参数
    function getQueryVariable(variable) {
      var query = window.location.search.substring(1);
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] == variable) {
          return pair[1];
        }
      }
      return false;
    }

    //=======================================================================

    function sendMessage(roomid, data) {
      console.log('send message to other end', roomid, data);
      if (!socket) {
        console.log('socket is null');
      }
      socket.emit('message', roomid, data);
    }

    function conn() {
      //socket io会捕获到url信息，从而会信令链接服务器
      socket = io.connect('https://tslauth.bj-tct.com/', {
        transports: ['websocket']
      });

      socket.on('joined', (roomid, id) => {
        console.log(
          'receive joined message!',
          'roomid:' + roomid,
          'socketid' + id
        );
        state = 'joined';
        //如果是多人的话，第一个人不该在这里创建peerConnection
        //都等到收到一个otherjoin时再创建
        //所以，在这个消息里应该带当前房间的用户数
        //
        //create conn and bind media track
        createPeerConnection();
        bindTracks();

        btnConn.disabled = true;
        btnLeave.disabled = false;

        console.log('receive joined message, state=', state);
      });

      socket.on('otherjoin', roomid => {
        console.log('receive joined message:', roomid, state);

        //如果是多人的话，每上来一个人都要创建一个新的 peerConnection
        //
        if (state === 'joined_unbind') {
          createPeerConnection();
          bindTracks();
        }

        state = 'joined_conn';
        call();

        console.log('receive other_join message, state=', state);
      });

      socket.on('full', (roomid, id) => {
        console.log('receive full message', roomid, id);
        socket.disconnect();
        hangup();
        closeLocalMedia();
        state = 'leaved';
        console.log('receive full message, state=', state);
        alert('the room is full!');
      });

      socket.on('leaved', (roomid, id) => {
        console.log('receive leaved message', roomid, id);
        state = 'leaved';
        // 客户端 断开连接
        socket.disconnect();
        _this.closeDialog();
        // 关闭客户端弹窗
        console.log('receive leaved message, state=', state);

        btnConn.disabled = false;
        btnLeave.disabled = true;
      });

      socket.on('bye', (room, id) => {
        console.log('receive bye message', roomid, id);
        //state = 'created';
        //当是多人通话时，应该带上当前房间的用户数
        //如果当前房间用户不小于 2, 则不用修改状态
        //并且，关闭的应该是对应用户的peerconnection
        //在客户端应该维护一张peerconnection表，它是
        //一个key:value的格式，key=userid, value=peerconnection
        state = 'joined_unbind';
        socket.disconnect();
        hangup();
        offer.value = '';
        answer.value = '';
        console.log('receive bye message, state=', state);

        btnConn.disabled = false;
        btnLeave.disabled = true;
        _this.closeDialog();
        closeLocalMedia();
      });

      socket.on('disconnect', socket => {
        console.log('receive disconnect message!', roomid);
        if (!(state === 'leaved')) {
          hangup();
          closeLocalMedia();
        }
        state = 'leaved';
        console.log('receive bye message, state=', state);
      });

      socket.on('message', (roomid, data) => {
        console.log('receive message!', roomid, data);

        if (data === null || data === undefined) {
          console.error('the message is invalid!');
          return;
        }

        if (data.hasOwnProperty('type') && data.type === 'offer') {
          offer.value = data.sdp;

          pc.setRemoteDescription(new RTCSessionDescription(data));

          //create answer，可以再这里对音视频进行约束，第三个参数
          pc.createAnswer()
            .then(getAnswer)
            .catch(handleAnswerError);
        } else if (data.hasOwnProperty('type') && data.type == 'answer') {
          answer.value = data.sdp;
          pc.setRemoteDescription(new RTCSessionDescription(data));
        } else if (data.hasOwnProperty('type') && data.type === 'candidate') {
          //收到信令服务器发送的candidate数据，则添加到本地pc上
          var candidate = new RTCIceCandidate({
            sdpMLineIndex: data.label,
            candidate: data.candidate
          });
          console.log(
            'recv date condidate sdpMLineIndex:',
            data.label,
            'candidate',
            data.candidate
          );
          pc.addIceCandidate(candidate);
        } else {
          console.log('the message is invalid!', data);
        }
      });

      //从url中取出roomid值，加入房间
      // roomid = 21;
      socket.emit('join', roomid);
      // socket.broadcast.emit('roomid', roomid); //发给除自己之外的这个节点上的所有人

      return true;
    }

    function connSignalServer() {
      //开启本地视频
      start();
      return true;
    }

    function getMediaStream(stream) {
      //获取本地视频流并用HTML5本地播放器播放
      if (localStream) {
        stream.getAudioTracks().forEach(track => {
          localStream.addTrack(track);
          stream.removeTrack(track);
        });
      } else {
        localStream = stream;
      }

      localVideo.srcObject = localStream;
      //画图使用

      //这个函数的位置特别重要，
      //一定要放到getMediaStream之后再调用
      //否则就会出现绑定失败的情况
      //
      //setup connection
      conn();

      //btnStart.disabled = true;
      //btnCall.disabled = true;
      //btnHangup.disabled = true;
    }

    function getDeskStream(stream) {
      localStream = stream;
    }

    function handleError(err) {
      console.error('Failed to get Media Stream!', err);
    }

    function shareDesk() {
      if (IsPC()) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true })
          .then(getDeskStream)
          .catch(handleError);

        return true;
      }

      return false;
    }

    function start() {
      console.log(navigator);
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.error('the getUserMedia is not supported!');
        return;
      } else {
        var constraints;
        constraints = {
          video: {
            width: 400,
            height: 400
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          }
        };
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then(getMediaStream)
          .catch(handleError);
      }
    }

    function getRemoteStream(e) {
      //添加远端音视频到本地Video播放器进行播放展示
      remoteStream = e.streams[0];
      remoteVideo.srcObject = e.streams[0];
    }

    function handleOfferError(err) {
      console.error('Failed to create offer:', err);
    }

    function handleAnswerError(err) {
      console.error('Failed to create answer:', err);
    }

    function getAnswer(desc) {
      //获取本地的SDP信息则会向stun和turn询问本地的候选者
      pc.setLocalDescription(desc);
      answer.value = desc.sdp;

      //send answer sdp
      sendMessage(roomid, desc);
    }

    function getOffer(desc) {
      //获取本地的SDP信息则会向stun和turn询问本地的候选者
      pc.setLocalDescription(desc);
      offer.value = desc.sdp;
      offerdesc = desc;

      //send offer sdp
      sendMessage(roomid, offerdesc);
    }

    function createPeerConnection() {
      //如果是多人的话，在这里要创建一个新的连接.
      //新创建好的要放到一个map表中。
      //key=userid, value=peerconnection
      console.log('create RTCPeerConnection!');
      if (!pc) {
        pc = new RTCPeerConnection(pcConfig);

        //端到端连接通的回调,这是来自询问了stun和turn服务器得到信息之后的回调
        pc.onicecandidate = e => {
          //将该信息通过信息服务器通知到房间其它人
          if (e.candidate) {
            sendMessage(roomid, {
              type: 'candidate',
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate
            });
          } else {
            console.log('this is the end candidate');
          }
        };

        //收到远端的码流的回调函数
        pc.ontrack = getRemoteStream;
      } else {
        console.log('the pc have be created!');
      }

      return;
    }

    //绑定永远与 peerconnection在一起，
    //所以没必要再单独做成一个函数
    function bindTracks() {
      console.log('bind tracks into RTCPeerConnection!');

      if (pc === null || localStream === undefined) {
        console.error('pc is null or undefined!');
        return;
      }

      if (localStream === null || localStream === undefined) {
        console.error('localstream is null or undefined!');
        return;
      }

      //add all track into peer connection
      localStream.getTracks().forEach(track => {
        pc.addTrack(track, localStream);
      });
    }

    function call() {
      if (state === 'joined_conn') {
        var offerOptions = {
          offerToRecieveAudio: 1,
          offerToRecieveVideo: 1
        };

        pc.createOffer(offerOptions)
          .then(getOffer)
          .catch(handleOfferError);
      }
    }

    function hangup() {
      if (!pc) {
        return;
      }

      offerdesc = null;

      pc.close();
      pc = null;
    }

    function closeLocalMedia() {
      if (!(localStream === null || localStream === undefined)) {
        localStream.getTracks().forEach(track => {
          track.stop();
        });
      }
      localStream = null;
    }

    function leave() {
      socket.emit('leave', roomid); //notify server

      hangup();
      closeLocalMedia();

      offer.value = '';
      answer.value = '';
      btnConn.disabled = false;
      btnLeave.disabled = true;
    }

    btnConn.onclick = connSignalServer;
    btnLeave.onclick = leave;
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog');
    }
  }
};
</script>

<style lang="scss" scoped>
#preview {
  width: 1000px;
  background: #fff;
  padding: 30px 0;
  border-radius: 10px;
  border: 1px solid #fff;
  font-size: 16px;
}
.video-btn-line {
  text-align: center;
  padding-top: 20px;
  button {
    background: #fff;
    border: none;
    height: 40px;
    width: 128px;
    border-radius: 20px;
    background: linear-gradient(#85eebe, #61daa2);
    color: #fff;
    font-size: 16px;
    display: inline-block;
    margin: 0 30px;
    cursor: pointer;
  }
  #leave {
    background: linear-gradient(#f77b8d, #de6173);
  }
}
body {
  background: #fff;
}
.btn-line {
  color: #fff;
  padding-top: 20px;
  span {
    padding: 4px 20px;
    margin: 0 10px;
    background: #fff;
    color: #666;
  }
}

#localvideo {
  background: #f3f3f3;
  width: 400px;
  height: 400px;
}
#remotevideo {
  background: #f3f3f3;
  width: 400px;
  height: 400px;
}
.video-item {
  display: inline-block;
  width: 400px;
  margin: 0 10px;
  color: #666;
  h4 {
    padding: 4px 0;
    margin: 0;
    background: #f3f3f3;
    margin-bottom: 10px;
  }
}
</style>
