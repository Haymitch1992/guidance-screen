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
      <li style="padding-top:40px;">
        <div class="exit-icon-line">
          <span class="exit-icon">A</span>
          <div class="station-info">
            <p>出口</p>
            <p class="english">EXIT</p>
          </div>
          <img class="bus-icon" src="../assets/bus.png" alt="" srcset="" />
        </div>
        <div class="time-text">
          <span class="car-icon">984</span>
          <span class="time-num">3</span>
          <span>分钟（Min）</span>
        </div>
        <div class="time-text">
          <span class="car-icon">926</span>
          <span class="time-num">2</span>
          <span>分钟（Min）</span>
        </div>
        <div class="time-text">
          <span class="car-icon">358</span>
          <span class="time-num">1</span>
          <span>分钟（Min）</span>
        </div>
      </li>
      <li>
        <div class="exit-icon-line">
          <span class="exit-icon">B</span>
          <div class="station-info">
            <p>出口</p>
            <p class="english">EXIT</p>
          </div>
          <img class="bus-icon" src="../assets/bus.png" alt="" srcset="" />
        </div>
        <div class="time-text">
          <span class="car-icon">984</span>
          <span class="time-num">3</span>
          <span>分钟（Min）</span>
        </div>
        <div class="time-text">
          <span class="car-icon">926</span>
          <span class="time-num">2</span>
          <span>分钟（Min）</span>
        </div>
        <div class="time-text">
          <span class="car-icon">358</span>
          <span class="time-num">1</span>
          <span>分钟（Min）</span>
        </div>
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
.bus-icon {
  display: inline-block;
  margin-right: 53px;
}
.arrived-box {
  width: 394px;
  background: linear-gradient(#1e1e3b, #07071b);
  height: 1080px;
  border: 4px solid #2b2b46;
  position: absolute;
  color: #fff;
  right: 0;
  box-sizing: border-box;

  .exit-icon {
    display: inline-block;
    width: 70px;
    font-size: 40px;
    color: #fff;
    background: #003c85;
    border: 2px solid #fff;
    text-align: center;
    vertical-align: bottom;
    border-radius: 10px;

    box-sizing: border-box;
    height: 70px;
    line-height: 62px;
  }
  .exit-icon-line {
    margin-bottom: 20px;
  }
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
    font-size: 30px;
    padding: 10px 0;
    span {
      vertical-align: middle;
    }
    .time-num {
      color: #fdd40d;
      font-size: 50px;
      margin: 0 10px;
    }
    .car-icon {
      line-height: 40px;
      padding: 4px 20px;
      border: 2px solid #fff;
      border-radius: 10px;
      margin-right: 10px;
    }
  }
  li {
    padding: 24px 0;
  }
  .station-info {
    display: inline-block;
    width: 110px;
    color: #fff;
    text-align: left;
    font-size: 36px;
    margin-left: 20px;
    vertical-align: top;
    .english {
      font-size: 24px;
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
