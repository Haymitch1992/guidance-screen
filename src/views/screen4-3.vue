<template>
  <div>
    <headerbox></headerbox>
    <div class="screen-C">
      <div class="screen-item  exit-block">
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
          <img class="scroll-icon" src="../assets/arrow-bottom-1.png" alt="" />
        </div>
      </div>
      <div class="screen-item  exit-block">
        <span class="unvisiabled">
          <span class="exit-icon">A</span>
          <div class="screent-text-block">
            <p>西南口</p>
            <p class="text">Sounthwest</p>
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
      <div class="screen-item  exit-block">
        <span class="exit-icon exit-icon-3 s1">S1</span>
        <div class="screent-text-block">
          <p>号线</p>
          <p class="text">Line s1</p>
        </div>
        <span class="exit-icon exit-icon-3">6</span>
        <div class="screent-text-block">
          <p>号线</p>
          <p class="text">Line 6</p>
        </div>
        <div class="screent-text-block screent-text-block-2">
          <span>30m</span>
          <img
            class="person-icon"
            src="../assets/distance-right-1.gif"
            alt=""
          />
          <img src="../assets/fanhui.png" alt="" />
        </div>
      </div>
    </div>
    <broadcast></broadcast>
    <count-down style="left:1480px"></count-down>
  </div>
</template>

<script>
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
  },
  computed: {
    currentStation() {
      return this.$store.state.station;
    }
  },
  // 监听变化 切换路由
  watch: {
    currentStation(curVal, oldVal) {
      if (curVal !== '11002' && curVal !== '11102') {
        // 金安桥 切换
        this.$router.push({ path: 'screen4' });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.scroll-icon {
  transform: rotate(-90deg);
}
.screen-C {
  position: absolute;
  top: 190px;
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
  .rotate-img {
    transform: rotate(180deg);
    margin-right: 20px;
  }
  .person-icon {
    margin-right: 40px;
    margin-left: 10px;
  }
  .screent-text-block-2 {
    width: 340px;
    margin-right: 0;
  }
  .screent-text-block-3 {
    width: 350px;
    text-align: left;
    position: relative;
    left: -20px;
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
  .exit-icon-3 {
    border: 5px solid #fff;
    background: #b28619;
    color: #fff;
  }
  .s1 {
    border: 5px solid #fff;
    background: #a24416;
    color: #fff;
    font-size: 70px;
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
