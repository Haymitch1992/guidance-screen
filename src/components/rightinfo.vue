<template>
  <div class="arrived-box">
    <div class="snow"></div>
    <div class="time-item">
      <div class="current-time">
        {{ currentTime1[0] }}年{{ currentTime1[1] }}月{{ currentTime1[2] }}日
      </div>
      <div class="current-time">
        {{ transformCn[currentTime3] }} {{ currentTime2 }}
      </div>
    </div>
    <ul>
      <li>
        <div>
          <img src="../assets/line-6.png" alt="" />
          <div class="station-info">
            <p>开往肿瘤医院</p>
            <p class="english">To Tumour Hospital</p>
          </div>
        </div>
        <div class="time-text">{{ line1.up }}分钟（Min）</div>
      </li>
      <li>
        <div>
          <img src="../assets/line-6.png" alt="" />
          <div class="station-info">
            <p>开往坳背</p>
            <p class="english">To Aobei</p>
          </div>
        </div>
        <div class="time-text">{{ line1.down }}分钟（Min）</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'tips',
  props: {
    stopObj: Object,
    line1: {
      type: Object,
      default: () => {
        return { up: 3, down: 3 };
      }
    },
    line2: {
      type: Object,
      default: () => {
        return { up: 3, down: 3 };
      }
    }
  },
  data() {
    return {
      currentTime1: '',
      currentTime2: '',
      currentTime3: '', // 星期几
      transformCn: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    };
  },
  mounted() {
    this.getCurrentTime();
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  },
  methods: {
    getCurrentTime() {
      let dayjs = require('dayjs');
      let currnet = dayjs();
      this.currentTime1 = currnet.format('YYYY-MM-DD').split('-');
      this.currentTime2 = currnet.format('HH:mm:ss');
      this.currentTime3 = currnet.day();
    }
  }
};
</script>

<style scoped lang="scss">
.arrived-box {
  width: 394px;
  background: linear-gradient(#1e1e3b, #07071b);
  height: 1080px;
  border: 4px solid #2b2b46;
  position: absolute;
  color: #fff;
  right: 0;
  box-sizing: border-box;
  .time-item {
    height: 300px;
    padding-top: 100px;

    box-sizing: border-box;
    background: #09091f url('../assets/right-bg.png') no-repeat 0px 230px;
  }
  .current-time {
    font-size: 36px;
    padding-bottom: 10px;
  }
  .time-text {
    font-size: 40px;
    padding-top: 20px;
    padding-left: 80px;
  }
  li {
    padding: 24px 0;
  }
  .station-info {
    display: inline-block;
    width: 240px;
    color: #838383;
    text-align: left;
    font-size: 30px;
    margin-left: 20px;
    .english {
      font-size: 18px;
    }
  }
}
@keyframes snow {
  0% {
    background-position: 0 0, 0 0;
  }
  100% {
    background-position: 500px 500px, 1000px 500px;
  }
}

.snow {
  width: 394px;
  position: absolute;
  top: 0;
  right: 0;
  height: 300px;
  // height: 1440px;
  background: url('../assets/snow1.png'), url('../assets/snow2.png');
  animation: 10s snow linear infinite;
}
</style>
