import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    // 命名路由layout有一个默认子路由，这个名字没有意义
    // 正确的做法是:如果有默认子路由，就不要给父路由起名 // name: 'layout',
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // path空 默认作为 子路由渲染
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/article',
        name: 'article',
        component: () => import('@/views/article')
      }

    ]

  }

]

const router = new VueRouter({
  routes
})

// 路由导航守卫:说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to:要去的路由信息
// from:来自哪里的路由信息
// next:放行方法
router.beforeEach((to, from, next) => {
  const tokenUser = JSON.parse(window.localStorage.getItem('tokenUser'))
  if (to.path !== '/login') {
    if (tokenUser) {
      // 允许通过
      next()
    } else {
      // 没有登录跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
