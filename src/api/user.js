// 登录相关请求模块
import request from '@/utils/request.js'
// 用户登录请求接口

export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 获取用户个人信息

export const getUserProfile = data => {
  // const tokenUser = JSON.parse(window.localStorage.getItem('tokenUser'))
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // headers: {
    //   Authorization: `Bearer ${tokenUser.token}`
    // }
  })
}
