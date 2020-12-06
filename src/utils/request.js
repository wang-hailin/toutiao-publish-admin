import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 配置基本路径
})

export default request

// 请求拦截器

request.interceptors.request.use(
  // 任何所有请求会经过这里
  // config是当前请求相关的配置信息对象
  function (config) {
    const tokenUser = JSON.parse(window.localStorage.getItem('tokenUser'))
    // console.log(config)
    // 如果有登录用户信息，则统一设置token
    if (tokenUser) {
      config.headers.Authorization = `Bearer ${tokenUser.token}`
    }
    // 然后我们就可以在允许请求出去之前定制统一业务功能处理
    // 例如:统一的设置token
    // 当这里 return config之后请求在会真正的发出去
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
