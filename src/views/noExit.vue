<template>
  <div>
    <headerbox></headerbox>
    <stopbox :stopObj="stopObj"></stopbox>
  </div>
</template>

<script>
import headerbox from '../components/headerbox.vue';
import stopbox from '../components/stopbox.vue';
export default {
  name: 'noExit',
  components: {
    headerbox,
    stopbox
  },
  data() {
    return {
      stopObj: {
        text1: '禁止出站',
        text2: 'No Exit',
        text3: '此处距离出站口12米',
        text4: 'It is 12 meters away from the exit of the station'
      }
    };
  }
};
</script>

<style></style>
