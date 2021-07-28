<template>
  <div>
    <headerbox showTip="true"></headerbox>
    <div class="screen-B">
      <div class="screen-item">
        <img src="../assets/arrow-top.png" alt="" />
        <img class="distance-img" src="../assets/distance-left.gif" alt="" />
        <span class="distance-text">12m</span>
        <img src="../assets/subway-icon.png" alt="" />
        <img class="margin-icon" src="../assets/line-6-big.png" alt="" />
        <div class="screent-text-block">
          <p>开往肿瘤医院</p>
          <p class="text">To Tumour Hospital</p>
        </div>
        <img src="../assets/stairs.png" alt="" />
      </div>
      <div class="screen-item">
        <img src="../assets/subway-icon.png" alt="" />
        <img class="margin-icon" src="../assets/line-6-big.png" alt="" />
        <div class="screent-text-block" style="width:520px">
          <p>开往坳背</p>
          <p class="text">To Aobei</p>
        </div>
        <img
          class="distance-img"
          src="../assets/distance-right.gif"
          alt=""
          style="margin-left:40px;"
        />
        <span class="distance-text" style="margin-right:20px;">20m</span>
        <img src="../assets/arrow-right.png" alt="" />
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

<style lang="scss">
.screen-B {
  position: absolute;
  top: 344px;
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
    .text {
      font-size: 38px;
    }
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
