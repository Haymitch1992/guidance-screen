import {
  GET_SETTING,
  GET_WEATHER_INFO,
  GET_TRAIN_INFO,
  GET_GUIDE_INFO,
  HOTSPOTINFO,
  TRAININFO,
  WAITDATA,
  CUSTOMERFLOW
} from '@/service/api'
import {request, METHOD, removeAuthorization} from '@/utils/request'


// 获取配置数据
export async function screenSetting() {
  return request(GET_SETTING, METHOD.GET)
}

// 获取ATS 天气数据 公交
export async function weatherInfoApi(deviceId,direction,station) {
  return request(GET_WEATHER_INFO, METHOD.GET, {
    deviceId: deviceId, // 设备ID
    direction:direction, // 上下行
    station: station, // 车站ID
  })
}

// 获取ATS 动态数据
export async function trainInfo(deviceId,direction,station) {
  return request(GET_TRAIN_INFO, METHOD.GET, {
    deviceId: deviceId, // 设备ID
    direction:direction, // 上下行
    station: station, // 车站ID
  })
}
// 获取AGS
export async function agsagsInfo(deviceId) {
  return request(GET_GUIDE_INFO, METHOD.GET, {
    device_id: localStorage.getItem('device_id'), // 设备ID
  })
}

/**
 * 车辆信息
 * @param direction 0上行，1下行
 * @param station 车站Id
 * @returns {Promise<AxiosResponse<T>>}
 */
 export async function GETTRAININFO(direction,station) {
  return request(TRAININFO, METHOD.GET,{
    direction: direction,
    station:station
  })
}

/**
 * 广播信息
 * @param
 * @returns {Promise<AxiosResponse<T>>}
 */
 export async function GETHOTSPOTINFO() {
  return request(HOTSPOTINFO, METHOD.GET)
 }
 export async function GETWAITDATA() {
  return request(WAITDATA, METHOD.GET)
 }
 export async function GETCUSTOMERFLOW(start,end) {
  return request(CUSTOMERFLOW, METHOD.GET,{
    start: start,
    end: end,
    interval:1440
  })
}


export default {
  weatherInfoApi,
  screenSetting,
  trainInfo,
  agsagsInfo,
  GETHOTSPOTINFO,
  GETTRAININFO,
  GETWAITDATA,
  GETCUSTOMERFLOW
}
