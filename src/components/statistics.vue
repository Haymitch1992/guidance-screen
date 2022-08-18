<template>
  <div class="statistics">
    <!-- <p>
      站内人数
      <span class="number-text">{{ num1 }}</span>
    </p> -->
    <p>
      当日进站人数
      <span class="number-text">{{ this.$store.state.countNum.get_in }}</span>
    </p>
    <p>
      当日出站人数
      <span class="number-text">{{ this.$store.state.countNum.get_out }}</span>
    </p>
    <p>
      累计参观人数
      <span class="number-text">{{ this.$store.state.countNum.sum }}</span>
    </p>
  </div>
</template>

<script>
// 通过websocket 获取进站数据

export default {
  props: {},
  data() {
    return {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      timer: null,
      routerUrl: '',
      wsuri: 'ws://172.51.216.152:5005/', // ws wss
      lockReconnect: false, // 连接失败不进行重连
      maxReconnect: 5, // 最大重连次数，若连接失败
      socket2: null
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  unmounted() {
    // this.socket.close();
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
  width: 72px;
  display: inline-block;
  color: #0a96d9;
  text-align: right;
  position: relative;
  top: 4px;
}
</style>
