<template>
  <div class="model-bg" v-if="showGateInInfo">
    <div class="container">
      <h1>无感进站</h1>
      <div class="user-info-container">
        <div class="user-img-box"></div>
        <img :src="gateInInfo.jinzhan_picture" alt="" class="user-img" />
        <p>
          乘客姓名：
          <span class="info-text">{{ gateInInfo.jinzhan_name }}</span>
        </p>
        <p>
          进站位置：
          <span class="info-text">交控二层平台 A1闸机</span>
        </p>
        <p>
          进站时间：
          <span class="info-text">{{ gateInInfo.jinzhan_time }}</span>
        </p>
        <p>
          路线规划：
          <span class="info-text">
            列车预计5分钟后到达，您可先前往休闲区域等待。
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// 监听
const heartCheck = {
  timeout: 60 * 1000,
  timer: null,
  serverTimer: null,
  reset() {
    this.timer && clearTimeout(this.timer);
    this.serverTimer && clearTimeout(this.serverTimer);
  },
  start(ws) {
    this.reset();
    this.timer = setTimeout(() => {
      // console.log('发送心跳,后端收到后，返回一个心跳消息')
      // onmessage拿到返回的心跳就说明连接正常
      ws.send(JSON.stringify({ id: 1, registerId: '36421' }));
      this.serverTimer = setTimeout(() => {
        // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
        ws.close();
      }, this.timeout);
    }, this.timeout);
  }
};
export default {
  name: 'forbid',
  data() {
    return {
      timer: null,
      timer2: null,
      showGateInInfo: false,
      routerUrl: '',
      wsuri: 'ws://172.51.216.152:5005', // ws wss
      lockReconnect: false, // 连接失败不进行重连
      maxReconnect: 5, // 最大重连次数，若连接失败
      socket: null,
      gateInInfo: {}
    };
  },
  mounted() {
    // if (localStorage.getItem('showAuto')) {
    //   this.initWebSocket();
    // }
  },
  methods: {
    reconnect() {
      console.log('尝试重连');
      if (this.lockReconnect || this.maxReconnect <= 0) {
        return;
      }
      // setTimeout(() => {
      //   // this.maxReconnect-- // 不做限制 连不上一直重连
      //   this.initWebSocket();
      // }, 60 * 1000);
    },
    initWebSocket() {
      try {
        if ('WebSocket' in window) {
          this.socket = new WebSocket(this.wsuri);
        } else {
          console.log('您的浏览器不支持websocket');
        }
        this.socket.onopen = this.websocketonopen;
        this.socket.onerror = this.websocketonerror;
        this.socket.onmessage = this.websocketonmessage;
        this.socket.onclose = this.websocketclose;
      } catch (e) {
        this.reconnect();
      }
    },
    websocketonopen() {
      console.log('WebSocket连接成功', this.socket.readyState);
      heartCheck.start(this.socket);
      // this.socket.send('发送数据')
      this.websocketsend();
    },
    websocketonerror(e) {
      console.log('WebSocket连接发生错误', e);
      this.reconnect();
    },
    websocketonmessage(e) {
      console.log(e);
      // console.log('得到响应', e.data);
      // 将数据进行切割

      // console.log('得到响应', e.data);
      let obj = JSON.parse(e.data);
      if (obj.gateInInfo) {
        clearTimeout(this.timer2);
        this.showGateInInfo = true;
        this.gateInInfo = obj.gateInInfo.data;
        this.timer2 = setTimeout(() => {
          this.showGateInInfo = false;
        }, 3000);
      }
      if (obj.data) {
        // 获取基础站信息
        this.$store.commit('setCountNum', obj.data);
        console.log(obj.data);
      }

      // 存储数据
      // 消息获取成功，重置心跳
      heartCheck.start(this.socket);
    },
    websocketclose(e) {
      console.log('connection closed (' + e.code + ')');
      this.reconnect();
    },
    websocketsend() {
      let data = { id: 'start', registerId: '36421' };
      this.socket.send(JSON.stringify(data));
    }
  },
  unmounted() {
    this.socket.close();
  }
};
// 两秒后自动关闭
</script>

<style lang="scss" scoped>
@keyframes mymove {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.user-img-box {
  background: url('../assets/user-img.png') no-repeat 0 0;
  background-size: 300px;
  width: 300px;
  height: 300px;
  position: absolute;
  animation: mymove 5s infinite;
  left: -30px;
  top: 0;
}
.user-img {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 46px;
  top: 74px;
  border-radius: 50%;
}
.model-bg {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
}
h1 {
  font-size: 80px;
  text-align: center;
  margin: 20px 0;
}
.user-info-container {
  padding-left: 350px;
  position: relative;
  padding-top: 20px;
}

p {
  line-height: 50px;
  font-size: 30px;
}
.container {
  width: 1200px;
  height: 540px;
  padding: 0 100px;
  box-sizing: border-box;
  background: #22223c;
  border-radius: 6px;
  font-size: 24px;
  color: #fff;
  text-align: left;
  border: 4px solid #2b2b46;
  z-index: 2000;
  margin: 20vh auto 0;
  display: block;
}
.info-text {
  color: #0a96d9;
}
</style>
