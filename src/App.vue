<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
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
</style>
