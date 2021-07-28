<template>
  <div class="stop-box">
    <div class="stop-item">
      <img src="../assets/stop.png" alt="" class="stop-img" />
      <div class="stop-text">
        <p class="stop-text-1">{{ stopObj.text1 }}</p>
        <p class="stop-text-2">{{ stopObj.text2 }}</p>
      </div>
    </div>
    <div class="stop-item">
      <img src="../assets/arrow.gif" alt="" class="arrow-img" />
      <div class="stop-text">
        <p class="stop-text-3">{{ stopObj.text3 }}</p>
        <p class="stop-text-4">
          {{ stopObj.text4 }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'forbid',
  props: {
    stopObj: Object
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  text-align: left;
  vertical-align: middle;
}
.stop-box {
  position: absolute;
  top: 260px;
  width: 100%;
  color: #fff;
  .stop-item {
    margin-bottom: 108px;
    width: 100%;
  }
  .stop-img {
    display: inline-block;
    margin-right: 100px;
  }
  .arrow-img {
    display: inline-block;
    margin-right: 140px;
    margin-left: 50px;
    margin-top: 40px;
  }
  .stop-text {
    width: 900px;
    display: inline-block;
    vertical-align: top;
  }
  .stop-text-1 {
    font-size: 180px;
    font-weight: bold;
  }
  .stop-text-2 {
    font-size: 89px;
  }
  .stop-text-3 {
    font-size: 82px;
  }
  .stop-text-4 {
    font-size: 34px;
  }
}
</style>
