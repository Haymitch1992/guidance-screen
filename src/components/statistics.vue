<template>
  <div class="statistics">
    <p>
      站内人数
      <span class="number-text">{{ num1 }}</span>
    </p>
    <p>
      当日进站人数
      <span class="number-text">{{ num2 }}</span>
    </p>
    <p>
      当日出站人数
      <span class="number-text">{{ num3 }}</span>
    </p>
  </div>
</template>

<script>
import { GETWAITDATA, GETCUSTOMERFLOW } from '../service/user';
export default {
  props: {},
  data() {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
      timer: null
    };
  },
  computed: {},
  methods: {
    getStatisticsData() {
      // 获取一下当前的时间
      let time = new Date();
      let year = time.getFullYear();
      let month = time.getMonth();
      let day = time.getDate();
      let start = year + '-' + month + '-' + day + ' 00:00:00';
      let end = year + '-' + month + '-' + day + ' 23:59:59';
      GETWAITDATA().then(res => {
        if (res.data.code === 200) {
          this.num1 = res.data.result.wait[0]['number'];
        }
      });
      GETCUSTOMERFLOW(start, end).then(res => {
        if (res.data.code === 200) {
          this.num2 = res.data.result.passenger_flow[0]['flow_in'];
          this.num3 = res.data.result.passenger_flow[0]['flow_out'];
        }
      });
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getStatisticsData();
      // 每隔10s请求数据
    }, 10000);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  created() {},
  components: {}
};
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'electronicFont';
  src: url('../assets/DS-DIGIT.TTF');
}
.statistics {
  position: absolute;
  top: 610px;
  left: 1226px;
  z-index: 1000;
  background: #22223c;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 24px;
  color: #fff;
  text-align: right;
  border: 4px solid #2b2b46;
  p {
    line-height: 40px;
  }
}
.number-text {
  font-family: 'electronicFont';
  font-size: 40px;
  margin: 0 2px;
  width: 60px;
  display: inline-block;
  color: #0a96d9;
  text-align: right;
}
</style>
