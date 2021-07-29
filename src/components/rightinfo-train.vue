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
    <!-- 根据状态 切换显示 -->
    <ul>
      <li v-if="line1 === 1 || line1 === 2 || line1 === 3">
        <div class="exit-icon-line">
          <span class="exit-icon">11</span>

          <div class="station-info">
            <p>开往金顶街</p>
            <p class="english">To JINDINGJIE</p>
          </div>
        </div>
        <div class="time-text">
          <div class="train-info">
            <img src="../assets/train-icon.png" alt="" />
            <div class="train-text">
              <p class="p1">本次列车</p>
              <p class="p2">The train Arriving</p>
            </div>
          </div>
          <span class="time-num">3</span>
          <span>分钟（Min）</span>
        </div>
        <div class="time-text" v-if="line1 !== 3">
          <div class="train-info">
            <img src="../assets/train-icon.png" alt="" />
            <div class="train-text">
              <p class="p1">下次列车</p>
              <p class="p2">Next train</p>
            </div>
          </div>
          <span class="time-num">3</span>
          <span>分钟（Min）</span>
        </div>
      </li>
      <li v-if="line1 === 4 || line1 === 2 || line1 === 3">
        <div class="exit-icon-line">
          <span class="exit-icon">11</span>
          <div class="station-info">
            <p>开往首钢</p>
            <p class="english">To SHOUGANG</p>
          </div>
          <img class="dongao-logo" src="../assets/dongao.png" alt="" />
        </div>
        <div class="time-text">
          <div class="train-info">
            <img src="../assets/train-icon.png" alt="" />
            <div class="train-text">
              <p class="p1">本次列车</p>
              <p class="p2">The train Arriving</p>
            </div>
          </div>
          <span class="time-num">3</span>
          <span>分钟（Min）</span>
        </div>
        <div class="time-text" v-if="line1 !== 3">
          <div class="train-info">
            <img src="../assets/train-icon.png" alt="" />
            <div class="train-text">
              <p class="p1">下次列车</p>
              <p class="p2">Next train</p>
            </div>
          </div>
          <span class="time-num">3</span>
          <span>分钟（Min）</span>
        </div>
      </li>
      <li v-if="line1 === 3">
        <div class="exit-icon-line">
          <span class="exit-icon s1">S1</span>
          <div class="station-info">
            <p>开往四道桥</p>
            <p class="english">To SIDAOQIAO</p>
          </div>
        </div>
        <div class="time-text">
          <div class="train-info">
            <img src="../assets/train-icon.png" alt="" />
            <div class="train-text">
              <p class="p1">本次列车</p>
              <p class="p2">The train Arriving</p>
            </div>
          </div>
          <span class="time-num">3</span>
          <span>分钟（Min）</span>
        </div>
      </li>
      <li v-if="line1 === 3">
        <div class="exit-icon-line">
          <span class="exit-icon line-6">6</span>
          <div class="station-info">
            <p>开往杨庄</p>
            <p class="english">To YANGZHUANG</p>
          </div>
        </div>
        <div class="time-text">
          <div class="train-info">
            <img src="../assets/train-icon.png" alt="" />
            <div class="train-text">
              <p class="p1">本次列车</p>
              <p class="p2">The train Arriving</p>
            </div>
          </div>
          <span class="time-num">3</span>
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
    line1: Number // 1 首钢 2 北辛安 3 金安桥 4 金顶街
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
.dongao-logo {
  display: inline-block;
  width: 40px;
  position: absolute;
  right: 50px;
  top: 10px;
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
  .train-info {
    display: inline-block;
    vertical-align: middle;
    margin-right: 10px;
    width: 158px;
    padding-left: 14px;
    text-align: left;
    position: relative;
    top: 2px;
    img {
      margin-right: 10px;
    }
    .train-text {
      display: inline-block;
      color: #a4a4af;
      font-weight: bold;
      .p1 {
        font-size: 18px;
      }
      .p2 {
        font-size: 14px;
      }
    }
  }
  .exit-icon {
    display: inline-block;
    width: 60px;
    font-size: 30px;
    color: #fff;
    background: #ed9166;
    border: 4px solid #fff;
    text-align: center;
    vertical-align: bottom;
    border-radius: 10px;

    box-sizing: border-box;
    height: 60px;
    line-height: 52px;
  }
  .s1 {
    background: #b35a20;
  }
  .line-6 {
    background: #b28619;
  }
  .exit-icon-line {
    margin-bottom: 20px;
    position: relative;
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
      // color: #fdd40d;
      // font-size: 50px;
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
    width: 240px;
    color: #a4a4af;
    text-align: left;
    font-size: 30px;
    margin-left: 20px;
    vertical-align: top;
    .english {
      font-size: 20px;
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
