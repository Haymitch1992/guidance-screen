<template>
  <div>
    <headerbox></headerbox>
    <broadcast></broadcast>
    <rightinfo :line1="1"></rightinfo>
    <entrance :stationType="stationType"></entrance>
  </div>
</template>

<script>
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
import rightinfo from '../components/rightinfo-train.vue';
import entrance from '../components/entrance.vue';
import { weatherInfoApi, trainInfo } from '../service/user';
export default {
  name: 'jinzhanjianpiao', // 进站检票
  components: {
    broadcast,
    headerbox,
    rightinfo,
    entrance
  },
  data() {
    return {
      stationType: {
        text1: '进站检票',
        text2: 'Check in'
      },
      weatherInfo: {},
      timer: '',
      line1: {
        up: '',
        down: ''
      },
      line2: {
        up: '',
        down: ''
      }
    };
  },
  methods: {
    connect() {
      this.$socket.open(); // 开始连接socket
      console.log('链接');
      // 仅在组件内订阅事件
      this.sockets.subscribe('welcome', data => {
        console.log('welcome data ', data);
      });
    },
    // 获取天气信息 传递给子组件
    getWeatherInfo() {
      weatherInfoApi(1, 1, 1)
        .then(res => {
          this.weatherInfo = res.data.result[0].weather_info;
        })
        .catch(() => {
          this.$goBack();
        });
    },
    getAtsInfo() {
      // 上行
      trainInfo(1, 1, 0)
        .then(res => {
          this.line1.up = res.data.result[0].tarin_state.arrival_time;
          this.line2.up = res.data.result[1].tarin_state.arrival_time;
        })
        .catch(() => {
          this.$goBack();
        });
      // 下行
      trainInfo(1, 1, 1)
        .then(res => {
          this.line1.down = res.data.result[0].tarin_state.arrival_time;
          this.line2.down = res.data.result[1].tarin_state.arrival_time;
        })
        .catch(() => {
          this.$goBack();
        });
    }
  },
  mounted() {
    // this.getWeatherInfo();
    // this.getAtsInfo();
    // clearInterval(this.timer);
    // this.timer = setInterval(() => {
    //   this.getWeatherInfo();
    //   this.getAtsInfo();
    // }, this.intervalNum);
    this.connect();
    this.$socket.emit('connect', 1);
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    clearInterval(this.timer);
    next();
  }
};
</script>

<style></style>
