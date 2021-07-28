<template>
  <div class="arrived-box">
    <div class="time-item">
      <div class="current-time">
        {{ currentTime1[0] }}年{{ currentTime1[1] }}月{{ currentTime1[2] }}日
      </div>
      <div class="current-time">
        {{ transformCn[currentTime3] }} {{ currentTime2 }}
      </div>
    </div>
    <img src="../assets/line.png" alt="" />
    <ul>
      <li>
        <div>
          <img src="../assets/station-A.png" alt="" />
          <div class="station-info">
            <p>旺民路</p>
            <p class="english">Wangmin Road</p>
          </div>
        </div>
        <div class="car-middle">
          <span class="car-text">{{ nearestStationA.bus_name }}</span>
          <div class="car-info">
            <p>距旺民路站最近{{ busInfo[0].bus_state.length }}辆</p>
            <p class="english">One nearest to Wangmin station</p>
          </div>
        </div>
        <div>
          <div class="car-status">
            <img
              src="../assets/car-1.png"
              :title="nearestStationA.crowding_degree"
              alt=""
            />
            <p>
              {{ nearestStationA.stop_interval }}站
              {{ nearestStationA.distance }}公里
            </p>
          </div>
          <span class="car-num">
            {{ nearestStationA.arrival_time }}
          </span>
          <div class="car-time">
            <p>分钟</p>
            <p>min</p>
          </div>
        </div>
      </li>
      <li>
        <div>
          <img src="../assets/station-B.png" alt="" />
          <div class="station-info">
            <p>腾龙路</p>
            <p class="english">Tenglong Road</p>
          </div>
        </div>
        <div class="car-middle">
          <span class="car-text">{{ nearestStationB.bus_name }}</span>
          <div class="car-info">
            <p>距腾龙路站最近{{ busInfo[1].bus_state.length }}辆</p>
            <p class="english">One nearest to Tenglong station</p>
          </div>
        </div>
        <div>
          <div class="car-status">
            <img
              src="../assets/car-1.png"
              alt=""
              :title="nearestStationA.crowding_degree"
            />
            <p>
              {{ nearestStationB.stop_interval }}站
              {{ nearestStationB.distance }}公里
            </p>
          </div>
          <span class="car-num">
            {{ nearestStationB.arrival_time }}
          </span>
          <div class="car-time">
            <p>分钟</p>
            <p>min</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { GET_WEATHER_INFO } from '../service/api';
export default {
  name: 'tips',
  props: {
    stopObj: Object,
    busInfo: Array,
    nearestStationA: Object,
    nearestStationB: Object
  },
  data() {
    return {
      currentTime1: '',
      currentTime2: '',
      currentTime3: '', // 星期几
      transformCn: [
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
        '星期日'
      ]
    };
  },
  mounted() {
    this.getCurrentTime();
    setInterval(() => {
      this.getCurrentTime();
    }, 1000);
  },
  methods: {
    // 获取公交信息

    getCurrentTime() {
      let dayjs = require('dayjs');
      let currnet = dayjs();
      this.currentTime1 = currnet.format('YYYY-MM-DD').split('-');
      this.currentTime2 = currnet.format('HH:mm:ss');
      this.currentTime3 = currnet.day();
    }
  }
};
</script>

<style scoped lang="scss">
.arrived-box {
  width: 394px;
  background: linear-gradient(#000, #383838);
  height: 1080px;
  position: absolute;
  color: #fff;
  right: 0;
  .car-status {
    width: 100px;
    display: inline-block;
    margin: 0 20px 0 20px;
    position: relative;
    top: 7px;
  }
  .car-text {
    display: inline-block;
    border: 2px solid #fff;
    border-radius: 8px;
    padding: 4px 10px;
    color: #fff;
    font-size: 30px;
    vertical-align: top;
    margin-left: 24px;
  }
  .car-middle {
    margin: 20px 0;
  }
  .car-info {
    display: inline-block;
    width: 220px;
    color: #fff;
    text-align: left;
    font-size: 25px;
    margin-left: 20px;
    vertical-align: top;
    .english {
      font-size: 14px;
    }
  }
  .car-num {
    color: #fdd40d;
    font-size: 80px;
    display: inline-block;
    width: 88px;
    margin-left: 18px;
  }
  .car-time {
    display: inline-block;
    width: 100px;
    font-size: 30px;
    padding-left: 10px;
    position: relative;
    top: 5px;
  }
  .time-item {
    height: 270px;
    padding-top: 100px;
    box-sizing: border-box;
  }
  .current-time {
    font-size: 36px;
    padding-bottom: 10px;
  }
  .time-text {
    font-size: 40px;
    padding-top: 20px;
    padding-left: 80px;
  }
  li {
    padding: 24px 0;
  }
  .station-info {
    display: inline-block;
    width: 240px;
    text-align: left;
    font-size: 40px;
    margin-left: 20px;
    margin-bottom: 20px;
    .english {
      font-size: 24px;
    }
  }
}
</style>
