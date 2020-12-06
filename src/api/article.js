// 文章相关请求模块

import request from '@/utils/request'

// Body参数使用 data 设置
// Query参数使用params设置
// Headers参数使用headers设置

// 获取文章列表
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
