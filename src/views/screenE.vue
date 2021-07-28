<template>
  <div>
    <headerbox :showTip="true"></headerbox>
    <div class="screen-C">
      <div class="screen-item">
        <img src="../assets/arrow-left.png" alt="" />
        <img class="distance-img" src="../assets/distance-left.gif" alt="" />
        <span class="distance-text">12m</span>
        <img
          src="../assets/subway-icon.png"
          class="margin-icon"
          style="margin-left:260px"
          alt=""
        />
        <div class="screent-text-block" style="width:140px;">
          <p>乘车</p>
          <p class="text">To Train</p>
        </div>
      </div>
      <div class="screen-item">
        <img
          class="margin-icon"
          src="../assets/information.png"
          alt=""
          style="margin-left:0px;margin-right:20px;"
        />
        <div class="screent-text-block" style="margin-right:0px;width:408px">
          <p>综合信息查询</p>
          <p class="text">Information</p>
        </div>

        <img
          class="distance-img"
          src="../assets/distance-right.gif"
          style="margin-left:90px;margin-right:0px;"
          alt=""
        />
        <span class="distance-text" style="margin-right:16px;">12m</span>

        <img src="../assets/arrow-right.png" alt="" />
      </div>
      <div class="screen-item">
        <img src="../assets/next.png" alt="" />
        <div class="information-block">
          <p>本次列表车</p>
          <p class="text">This Train</p>
        </div>
        <div class="information-block-1 exit-block">
          <p>{{ tarin_state.arrival_time }}分钟</p>
          <p class="text">{{ tarin_state.arrival_time }}Min</p>
        </div>
        <img src="../assets/next.png" alt="" />
        <div class="information-block">
          <p>下次列车</p>
          <p class="text">Next Train</p>
        </div>
        <div class="information-block-1">
          <p>{{ tarin_state.next_arrival_time }}分钟</p>
          <p class="text">{{ tarin_state.next_arrival_time }}Min</p>
        </div>
      </div>
    </div>
    <broadcast></broadcast>
  </div>
</template>

<script>
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
import { trainInfo } from '../service/user';
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
      },
      tarin_state: {
        arrival_state: '未到达',
        arrival_time: 3,
        next_arrival_time: 13
      },
      timer: ''
    };
  },
  mounted() {
    this.getAtsInfo();
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.getAtsInfo();
    }, this.intervalNum);
  },
  methods: {
    getAtsInfo() {
      // 上行
      trainInfo(1, 1, 0)
        .then(res => {
          this.tarin_state = res.data.result[0].tarin_state;
        })
        .catch(() => {
          this.$goBack();
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    clearInterval(this.timer);
    next();
  }
};
</script>

<style lang="scss">
.screen-C {
  position: absolute;
  top: 190px;
  width: 100%;
  padding: 0 44px;
  color: #fff;
  box-sizing: border-box;
  .information-block {
    display: inline-block;
    font-size: 34px;
    vertical-align: middle;
    color: #707070;
    margin: 0 100px 0 20px;
    .text {
      font-size: 24px;
    }
  }
  .information-block-1 {
    display: inline-block;
    font-size: 48px;
    vertical-align: middle;
    margin-right: 40px;
  }
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
    width: 500px;
    .text {
      font-size: 38px;
    }
  }
  .exit-block {
    color: #fdd40d;
    margin-right: 130px;
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
