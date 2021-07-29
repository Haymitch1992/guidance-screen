<template>
  <div>
    <headerbox></headerbox>
    <broadcast></broadcast>
    <rightinfo
      :busInfo="busInfo"
      :nearestStationA="nearestStationA"
      :nearestStationB="nearestStationB"
    ></rightinfo>
    <entrance :stationType="stationType"></entrance>
  </div>
</template>

<script>
import broadcast from '../components/broadcast.vue';
import headerbox from '../components/headerbox.vue';
import rightinfo from '../components/rightinfo-exit.vue';
import entrance from '../components/entrance.vue';
import { weatherInfoApi } from '../service/user';
export default {
  components: {
    broadcast,
    headerbox,
    rightinfo,
    entrance
  },
  data() {
    return {
      timer: '',
      stationType: {
        text1: '出站检票',
        text2: 'Check out'
      },
      busInfo: [
        {
          stop_name: '地铁A口公交站',
          subway_exit: 'A',
          bus_info: [
            {
              bus_name: '123路',
              start_stop: 'xxx',
              end_stop: 'xxx',
              start_time: '6:00',
              end_time: '10:00'
            },
            {
              bus_name: '124路',
              start_stop: 'xxx',
              end_stop: 'xxx',
              start_time: '6:00',
              end_time: '10:00'
            }
          ],
          bus_state: [
            {
              bus_name: '123路',
              stop_interval: 12,
              distance: 3,
              arrival_time: 10,
              crowding_degree: 0,
              status: 'running'
            },
            {
              bus_name: '124路',
              stop_interval: 10,
              distance: 2,
              arrival_time: 3,
              crowding_degree: 0,
              status: 'running'
            }
          ]
        },
        {
          stop_name: '地铁B口公交站',
          subway_exit: 'B',
          bus_info: [
            {
              bus_name: '125路',
              start_stop: 'xxx',
              end_stop: 'xxx',
              start_time: '6:00',
              end_time: '10:00'
            },
            {
              bus_name: '126路',
              start_stop: 'xxx',
              end_stop: 'xxx',
              start_time: '6:00',
              end_time: '10:00'
            }
          ],
          bus_state: [
            {
              bus_name: '125路',
              stop_interval: 12,
              distance: 3,
              arrival_time: 10,
              crowding_degree: 0,
              status: 'running'
            },
            {
              bus_name: '126路',
              stop_interval: 7,
              distance: 2,
              arrival_time: 3,
              crowding_degree: 0,
              status: 'running'
            }
          ]
        }
      ],
      nearestStationA: {}, // A站车辆信息
      nearestStationB: {} // B站车辆信息
    };
  },
  methods: {
    getInfo() {
      weatherInfoApi(1, 1, 1)
        .then(res => {
          // 获取公交信息
          console.log(res.data.result[0].traffic_info);
          this.nearestStationA = this.nearestStation(
            res.data.result[0].traffic_info[0].bus_state
          );
          this.nearestStationB = this.nearestStation(
            res.data.result[0].traffic_info[1].bus_state
          );
        })
        .catch(() => {
          this.$goBack();
        });
    },
    nearestStation(arr) {
      // 计算最近车辆
      let outObj = {};
      arr.forEach(element => {
        if (
          !outObj.arrival_time ||
          element.arrival_time < outObj.arrival_time
        ) {
          outObj = element;
        }
      });
      return outObj;
    }
  },
  mounted() {
    // this.getInfo();
    // clearInterval(this.timer);
    // this.timer = setInterval(() => {
    //   this.getInfo();
    // }, this.intervalNum);
  },
  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    clearInterval(this.timer);
    next();
  }
};
</script>

<style></style>
