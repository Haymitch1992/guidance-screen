<template>
  <div>
    <div
      class="safe-box"
      v-show="
        this.$store.state.emergencyState === 3 ||
          this.$store.state.emergencyState === 4
      "
    >
      <div class="tips" v-if="this.$store.state.emergencyState === 3">
        <p class="text-1">暴雨黄色预警，请乘客有序出站</p>
        <p class="text-2">
          Yellow Rainstorm Warning，Please Exit in Order.
        </p>
      </div>
      <div class="tips tips2" v-if="this.$store.state.emergencyState === 4">
        <p class="text-1">暴雨红色预警，请乘客迅速出站</p>
        <p class="text-2">
          Red Rainstorm Warning，Please Exit as Soon as Possible.
        </p>
      </div>
      <div class="danger-content">
        <img class="danger-img" src="../assets/danger-page-5.png" alt="" />
        <div class="danger-text">
          <p>安全出口</p>
          <p class="danger-text-en">
            EXIT
            <img
              style="margin-left:20px; margin-right:20px;"
              src="../assets/danger-page-16.png"
              alt=""
            />
            <span>2Min</span>
          </p>
        </div>
      </div>
    </div>
    <div v-show="this.$store.state.emergencyState === 1">
      <headerbox></headerbox>
      <div
        class="screen-C"
        :class="{ active: this.$store.state.recommend === 1 }"
      >
        <div class="screen-item  exit-block">
          <span class="floor-num">2F</span>
          <span class="exit-icon">A</span>
          <div class="screent-text-block">
            <p>西南口</p>
            <p class="text">Southwest</p>
          </div>
          <span class="exit-icon">B</span>
          <div class="screent-text-block">
            <p>西北口</p>
            <p class="text">Northwest</p>
          </div>
          <div class="screent-text-block screent-text-block-2">
            <span>10m</span>
            <img
              class="person-icon"
              src="../assets/distance-right-1.gif"
              alt=""
            />
            <img
              class="scroll-icon"
              src="../assets/arrow-bottom-1.png"
              alt=""
            />
          </div>
        </div>
        <div class="screen-item  exit-block">
          <span class="floor-num">2F</span>
          <span class="unvisiabled">
            <span class="exit-icon">A</span>
            <div class="screent-text-block">
              <p>西南口</p>
              <p class="text">Northeast</p>
            </div>
          </span>
          <span class="exit-icon">C</span>
          <div class="screent-text-block">
            <p>东北口</p>
            <p class="text">Northeast</p>
          </div>
          <div class="screent-text-block screent-text-block-2">
            <span>10m</span>
            <img
              class="person-icon"
              src="../assets/distance-right-1.gif"
              alt=""
            />
            <img src="../assets/arrow-top-1.png" alt="" />
          </div>
        </div>
        <!-- 商业推荐 -->
        <div
          class="screen-item  exit-block"
          v-if="$store.state.recommend === 1"
        >
          <span class="floor-num">1F</span>
          <span class="unvisiabled">
            <span class="exit-icon">T</span>
            <div class="screent-text-block">
              <p>西南口</p>
              <p class="text">Northeast</p>
            </div>
          </span>
          <span class="exit-icon" style="background:#fff">
            <img src="../assets/coffee.png" class="coffee-icon" alt="" />
          </span>
          <div class="screent-text-block">
            <p>咖啡厅</p>
            <p class="text">Tcoffee</p>
          </div>
          <div class="screent-text-block screent-text-block-2">
            <span>50m</span>
            <img
              class="person-icon"
              src="../assets/distance-right-1.gif"
              alt=""
            />
            <img src="../assets/arrow-bottom-1.png" alt="" />
          </div>
        </div>
      </div>
      <broadcast></broadcast>
      <count-down style="left:1480px"></count-down>
    </div>
  </div>
</template>

<script>
import '../assets/danger.scss';
import broadcast from '../components/broadcast.vue';
import CountDown from '../components/count-down.vue';
import headerbox from '../components/headerbox.vue';
export default {
  components: {
    broadcast,
    headerbox,
    CountDown
  },
  data() {
    return {
      stationType: {
        text1: '出站检票',
        text2: 'Exit Gate'
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.coffee-icon {
  width: 100px;
  height: 100px;
}
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
.scroll-icon {
  transform: rotate(-90deg);
}
.screen-C.active {
  top: 200px;
}
.floor-num {
  font-size: 80px;
  position: relative;
  top: 20px;
  left: -140px;
  margin-right: 50px;
}
.screen-C {
  position: absolute;
  top: 320px;
  width: 100%;
  padding: 0 44px;
  color: #fff;
  box-sizing: border-box;
  .screen-item {
    border: 2px solid #484879;

    background: #17172c;
    display: inline-block;
    width: 100%;
    border-radius: 20px;
    padding: 30px 0;
    margin-bottom: 30px;
  }
  .screent-text-block {
    display: inline-block;
    font-size: 68px;
    margin-right: 60px;
    text-align: left;
    vertical-align: middle;
    width: 280px;
    .text {
      font-size: 38px;
    }
    span {
      vertical-align: middle;
      margin: 0 10px;
      font-size: 46px;
    }
    img {
      vertical-align: middle;
      display: inline-block;
    }
  }
  .screent-text-block-2 {
    width: 350px;
    margin-right: 0;
    .person-icon {
      margin-right: 40px;
      margin-left: 10px;
    }
  }
  .unvisiabled {
    opacity: 0;
  }
  .exit-icon {
    border: 5px solid #fdd40d;
    border-radius: 20px;
    font-size: 100px;
    text-align: center;
    display: inline-block;
    line-height: 100px;
    width: 100px;
    vertical-align: middle;
    margin-right: 20px;
  }
  .exit-block {
    color: #fdd40d;
  }
  .distance-text {
    font-size: 48px;
    margin-right: 80px;
    margin-left: 12px;
    vertical-align: middle;
  }
  .distance-img {
    margin-left: 20px;
    vertical-align: middle;
  }
  img {
    vertical-align: middle;
  }
  .margin-icon {
    margin: 0 22px;
  }
}
</style>
