<template>
  <div>
    <div class="safe-box">
      <danger-header :showtext="true"></danger-header>
      <div class="danger-content">
        <img class="danger-img" src="../assets/danger-page-5.png" alt="" />
        <div class="danger-text">
          <p>安全出口</p>
          <p class="danger-text-en">EXIT</p>
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
