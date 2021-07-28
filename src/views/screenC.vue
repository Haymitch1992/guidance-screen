<template>
  <div>
    <headerbox showTip="true"></headerbox>
    <div class="screen-C">
      <div class="screen-item">
        <img src="../assets/subway-icon.png" alt="" />
        <img class="margin-icon" src="../assets/line-4-big.png" alt="" />
        <div class="screent-text-block">
          <p>换乘4号线</p>
          <p class="text">Transfer To Line 3</p>
        </div>
        <img class="distance-img" src="../assets/distance-right.gif" alt="" />
        <span class="distance-text">12m</span>
        <img src="../assets/arrow-right.png" alt="" />
      </div>
      <div class="screen-item">
        <img src="../assets/subway-icon.png" alt="" />
        <img class="margin-icon" src="../assets/line-6-big.png" alt="" />
        <div class="screent-text-block">
          <p>开往坳背</p>
          <p class="text">To Aobei</p>
        </div>
        <img class="distance-img" src="../assets/distance-right.gif" alt="" />
        <span class="distance-text">20m</span>
        <img src="../assets/arrow-right.png" alt="" />
      </div>
      <div class="screen-item  exit-block">
        <img src="../assets/exit-A.png" alt="" />
        <img class="margin-icon" src="../assets/exit-B.png" alt="" />
        <div class="screent-text-block">
          <p>出口</p>
          <p class="text">Exit</p>
        </div>
        <img class="distance-img" src="../assets/distance-right-1.gif" alt="" />
        <span class="distance-text">10m</span>
        <img src="../assets/arrow-right-1.png" alt="" />
      </div>
    </div>
    <broadcast></broadcast>
  </div>
</template>

<script>
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
export default {
  name: '出站检票',
  components: {
    broadcast,
    headerbox
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
.screen-C {
  position: absolute;
  top: 190px;
  width: 100%;
  padding: 0 44px;
  color: #fff;
  box-sizing: border-box;
  .screen-item {
    border: 2px solid #707070;
    background: #1d1a1b;
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
    width: 550px;
    .text {
      font-size: 38px;
    }
  }
  .exit-block {
    color: #fdd40d;
  }
  .distance-text {
    font-size: 48px;
    margin-right: 40px;
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
