import Mock from 'mockjs'

export default {
  getWeatherInfo: () => {
    return {
      code: 200,
      result: [{
        weather_info: {
          city: '深圳',
          data: "2021年5月7号",
          week: "星期五", // 星期
          weather: "小雨", //天气情况，小雨、中雨转小雨、晴
          temperture: "19℃~23℃",// 温度   19℃~23℃
          humidity:"40%"  
        },
        traffic_info: {// 有多个公交返回多个信息
          stop_name: '', // 当前公交站名
          subway_exit: 'A',
          bus_info: [{
            bus_name:"",
            start_stop: "xxx站",
            end_stop: "xxxx站",
            start_time:"", // 首班时间
            end_time:"" ,  // 末班时间  
          }],
          bus_state: [{ // 不同出口对应不同公交站点
            bus_name: "xxx路",
            stop_interval:"3", // 公交车到达本站的站数
            distance:"500",// 公交车到达本站的距离
            arrival_time:"4", //到达本站时间
            status: 1, // 公交车状态  0 等待发车，1 运行中
          },{
            bus_name: "xxx路",
            stop_interval:"3", // 公交车到达本站的站数
            distance:"500",// 公交车到达本站的距离
            arrival_time:"4", //到达本站时间
            status: 1, // 公交车状态  0 等待发车，1 运行中
          }],
          buslines: [{
            start_stop: Mock.mock('@province') + '站',
            end_stop: Mock.mock('@province') + '站',
            bus_name: Mock.mock('@province') + '站'
          }]
        }
      }]
    }
  },
  getAtsInfo: () => {
    return{
      code: 200,
      result: [{
        ats_station_info: {
          station: '深圳',
          line: "2021年5月7号",
          uplink: {
            next_station: '',
            arrival_time:'',
          },
          downlink: {
            next_station: '',
            arrival_time:'',
          }, // 星期
          weather: "小雨", //天气情况，小雨、中雨转小雨、晴
          temperture: "19℃~23℃",// 温度   19℃~23℃
          humidity:"40%"  
        }
      }]
    }
  }
}