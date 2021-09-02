<template>
  <div>
        <div
      class="danger-box"
      v-show="
        this.$store.state.emergencyState === 3 ||
          this.$store.state.emergencyState === 4
      "
    >
      <div class="tips" v-if="this.$store.state.emergencyState === 3">
        <p class="text-1">暴雨黄色预警，请勿停留</p>
        <p class="text-2">
          Yellow Rainstorm Warning, No Loitering!
        </p>
      </div>
      <div class="tips tips2" v-if="this.$store.state.emergencyState === 4">
        <p class="text-1">暴雨红色预警，请勿停留</p>
        <p class="text-2">
          Red Rainstorm Warning, No Loitering!
        </p>
      </div>
      <div class="danger-content">
        <img class="danger-img" src="../assets/danger-page-1.png" alt="" />
        <div class="danger-text">
          <p>禁止入内请尽快出站</p>
          <p class="danger-text-en">
            No Entry Please exit as soon as possible
          </p>
        </div>
      </div>
    </div>
    <div v-show="this.$store.state.emergencyState === 1">
    <headerbox></headerbox>
    <broadcast></broadcast>
    <rightinfo :line1="3"></rightinfo>
    <entrance :stationType="stationType"></entrance>
    </div>
  </div>
</template>

<script>
import '../assets/danger.scss';
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
  computed: {
    currentStation() {
      return this.$store.state.station;
    }
  },
  // 监听变化 切换路由
  watch: {
  currentStation(curVal, oldVal) {
      if (curVal === '11001' || curVal === '11101') {
        this.$router.push({ path: 'screen1-1' });
      } else if (curVal === '11002' || curVal === '11102') {
        this.$router.push({ path: 'screen1-3' });
      } else if (curVal === '11003' || curVal === '11103') {
        this.$router.push({ path: 'screen1-2' });
      } else if (curVal === '11004' || curVal === '11104') {
        this.$router.push({ path: 'screen1-1' });
      }
    }
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

<style lang="scss" scoped4>
.tips {
  color: #fff;
  text-align: center;
  padding-right: 40px;
  border: 20px solid #fffe48;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding: 30px 0;
  left: 0;
  top: 0;
  .text-1 {
    font-size: 60px;
    color: #fffe48;
  }
  .text-2 {
    font-size: 30px;
    color: #fffe48;
  }
}
.tips2 {
  border: 20px solid #d30001;
  .text-1 {
    font-size: 60px;
    color: #d30001;
  }
  .text-2 {
    font-size: 30px;
    color: #d30001;
  }
}
</style>
