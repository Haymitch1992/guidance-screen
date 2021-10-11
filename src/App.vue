<template>
  <div id="app">
    <div v-show="this.$store.state.emergencyState != 5">
      <router-view />
    </div>
    <!-- 一键开关站 -->
    <div v-show="this.$store.state.emergencyState === 5">
      <div class="quick-box">
        <div>
          <p class="quick-text">已启动一键开关站流程</p>
          <p class="quick-text">请做好开关站保障工作</p>
        </div>
        <div class="progress candy" data-width="100%">
          <div class="progress-bar" style="width: 100%">
            <div class="progress-text">执行中</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import './assets/danger.scss';
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
      ws.send(JSON.stringify({ heart: 1 }));
      this.serverTimer = setTimeout(() => {
        // 如果超过一定时间还没响应(响应后触发重置)，说明后端断开了
        ws.close();
      }, this.timeout);
    }, this.timeout);
  }
};
import { agsagsInfo, GETHOTSPOTINFO, GETTRAININFO } from '../src/service/user';
export default {
  data() {
    return {
      routerUrl: '',
      wsuri: 'ws://172.51.215.158:8081/api/v1/device/platform_ats/connection', // ws wss
      lockReconnect: false, // 连接失败不进行重连
      maxReconnect: 5, // 最大重连次数，若连接失败
      socket: null
    };
  },
  mounted() {
    this.initWebSocket();
    // 获取车辆信息
    // 获取 websocket 返回的车站信息
    // 获取广播信息
    GETHOTSPOTINFO().then(res => {
      console.log('广播信息', res.data);
      this.$store.commit('setBroadcast', res.data.result[0].base_info);
    });
    setInterval(() => {
      GETTRAININFO(this.$store.state.station, this.$store.state.direction).then(
        res => {
          if (!res.data.result.train_002) return;
          this.$store.commit(
            'setArrivalTime',
            res.data.result.train_002.tarin_state.arrival_time
          );
        }
      );
    }, 10000);
  },
  methods: {
    reconnect() {
      console.log('尝试重连');
      if (this.lockReconnect || this.maxReconnect <= 0) {
        return;
      }
      setTimeout(() => {
        // this.maxReconnect-- // 不做限制 连不上一直重连
        this.initWebSocket();
      }, 60 * 1000);
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
      // console.log(e)
      // console.log('得到响应', e.data);
      // 将数据进行切割
      let arr = e.data.split('|');
      // console.log('可以渲染网页数据...');
      console.log(arr);
      if (arr.length === 2) {
        this.$store.commit('setStation', {
          station: arr[0],
          direction: arr[1]
        });
      }
      // 修改应急状态 setEmergencyState
      if (e.data === 'emergent1') {
        this.$store.commit('setEmergencyState', 4);
      } else if (e.data === 'emergent3') {
        this.$store.commit('setEmergencyState', 3);
      } else if (e.data === 'waiting') {
        this.$store.commit('setEmergencyState', 5);
      } else if (e.data === 'recover') {
        this.$store.commit('setEmergencyState', 1);
      }

      // 消息获取成功，重置心跳
      heartCheck.start(this.socket);
    },
    websocketclose(e) {
      console.log('connection closed (' + e.code + ')');
      this.reconnect();
    },
    websocketsend() {
      let data = { id: 'start' };
      this.socket.send(JSON.stringify(data));
    }
  },
  unmounted() {
    this.socket.close();
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 1920px;
  height: 1080px;
  background: #000 url('../src/assets/bg.png') repeat;
  position: relative;
}
p {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.quick-box {
  border: 10px solid rgb(45, 241, 38);
  height: 1080px;
  box-sizing: border-box;
  padding-top: 300px;
}
.quick-text {
  color: #fff;
  font-size: 80px;
  line-height: 120px;
}
.progress {
  top: 40px;
  position: relative;
  z-index: 5;
  background: #484848;
  border: 10px solid #282828;
  border-radius: 30px;
  display: inline-block;
  box-shadow: 0 5px 17px rgba(40, 40, 40, 0.5),
    0 0 3px 1px rgba(40, 40, 40, 0.5) inset;
  width: 800px;
  .progress-text {
    width: 100%;
    color: #fff;
    font-size: 24px;
  }
  .progress-bar {
    background-color: rgb(45, 241, 38);
    box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.3) inset;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.35) 25%,
      rgba(255, 255, 255, 0) 25%,
      rgba(255, 255, 255, 0) 50%,
      rgba(255, 255, 255, 0.35) 50%,
      rgba(255, 255, 255, 0.35) 75%,
      rgba(255, 255, 255, 0) 75%,
      rgba(255, 255, 255, 0)
    );
    background-repeat: repeat-x;
    background-size: 40px 40px;

    animation: candystripe 1s linear infinite;
    overflow: hidden;
    position: relative;
    z-index: 10;
    border-radius: 22px;
    line-height: 40px;

    transition: width 0.2s linear;
  }
  @keyframes candystripe {
    to {
      background-position: 40px 0;
    }
  }
}
</style>
