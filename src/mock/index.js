// 首先引入Mock
import Mock from 'mockjs'
import other from './weather'
import {GET_WEATHER_INFO,GET_ATS_INFO } from '../service/api'

// 设置拦截ajax请求的相应时间
// Mock.setup({
//   timeout: '200-600'
// });

// 设置拦截

// 天气信息
// Mock.mock(GET_WEATHER_INFO, 'get', other.getWeatherInfo)
// ATS信息
// Mock.mock(GET_ATS_INFO, 'get', other.getAtsInfo)
