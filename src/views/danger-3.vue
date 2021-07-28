<template>
  <div>
    <div class="safe-box">
      <danger-header :showtext="true"></danger-header>
      <div class="danger-content">
        <div class="danger-item">
          <img src="../assets/danger-page-3.png" alt="" />
          <p>拥挤</p>
          <p class="en">Crowded</p>
        </div>
        <div class="danger-item">
          <p class="big">安全出口</p>
          <p class="big-en">EXIT</p>
        </div>
        <div class="danger-item">
          <img src="../assets/danger-page-6.png" alt="" />
          <p>畅通</p>
          <p class="en">Smooth</p>
        </div>
        <div class="danger-item right-item">
          <img src="../assets/danger-page-16.png" alt="" />
          20m
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/danger.scss';
import dangerHeader from '../components/danger-header.vue';
export default {
  name: '禁止出站',
  components: {
    dangerHeader
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss"></style>
