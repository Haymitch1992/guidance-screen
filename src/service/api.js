// 获取设备
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  GET_SETTING:`/deviceSeting.json`,
  GET_WEATHER_INFO: `${BASE_URL}/api/v1/device/platform_other/base_info`,// 获取天气
  GET_ATS_INFO: `${BASE_URL}/api/v1/device/platform_other/ats_info`,// 获取ATS
  GET_TRAIN_INFO: `${BASE_URL}/api/v1/device/platform_other/train_info`,// 获取ATS
  GET_DEVICE_ERROR: `${BASE_URL}/api/v1/device/platform_manage/device_error`,// 设备故障查询
  GET_GUIDE_INFO: `${BASE_URL}/ags/v1/device/platform_ags/guide_info`,
  TRAININFO: `/api/v1/device/platform_ats/train_info`, // 车辆信息查询
  HOTSPOTINFO: `/api/v1/device/platform_ats/hotspot_info`,// 广播信息
  WAITDATA: `/api/v1/device/platform_ips/wait_info`,// 获取进站人数
  CUSTOMERFLOW: `/api/v1/device/platform_ips/customer_flow`// 获取进站人数
}
