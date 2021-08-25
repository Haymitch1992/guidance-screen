<template>
  <div>
    <div class="safe-box" v-show="this.$store.state.emergencyState">
      <div class="tips">
        <p class="text-1">当前区域为安全区域，请按引导标识有序疏散</p>
        <p class="text-2">
          The current area is safe, please evacuate orderly by guidence
        </p>
      </div>
      <div class="danger-content">
        <img class="danger-img" src="../assets/danger-page-5.png" alt="" />
        <div class="danger-text">
          <p>安全出口</p>
          <p class="danger-text-en">
            EXIT
            <span style="float:right;">20m</span>
            <img
              style="float:right;margin-top:16px;margin-right:10px;"
              src="../assets/danger-page-16.png"
              alt=""
            />
          </p>
        </div>
      </div>
    </div>
    <div v-show="!this.$store.state.emergencyState">
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
            <img
              class="scroll-icon"
              src="../assets/arrow-bottom-1.png"
              alt=""
            />
          </div>
        </div>
        <div class="screen-item  exit-block">
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
      </div>
      <broadcast></broadcast>
    </div>
  </div>
</template>

<script>
import '../assets/danger.scss';
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
export default {
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
.tips {
  color: #fff;
  text-align: right;
  padding-right: 40px;
  .text-1 {
    font-size: 60px;
  }
  .text-2 {
    font-size: 30px;
  }
}
.scroll-icon {
  transform: rotate(-90deg);
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
