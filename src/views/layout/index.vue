<template>
  <el-container class="layout-container">
  <el-aside width="auto" class="aside">
    <side-bar class="aside-meun" :is-collaps='isCollaps'/>
  </el-aside>
  <el-container>
    <el-header class="header">
      <!-- class样式处理{
          css类名:布尔值
         }
          true:作用类名
          false:不作用类名 -->
      <div class="open">
        <i
          :class="{
            'el-icon-s-fold': isCollaps,
            'el-icon-s-unfold': !isCollaps
          }"
          @click="isCollaps = !isCollaps"
        ></i>
        <span>黑马头条后台管理系统</span>
      </div>
      <el-dropdown>
        <div class="avatar-wrap">
          <img class="img-size" :src="user.photo" alt="">
          <span>{{user.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </div>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item>设置</el-dropdown-item>
    <!-- 组件默认是不识别原生事件的, 除非内部做了处理 -->
    <el-dropdown-item @click.native="onlogOut">退出</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
    </el-header>
    <el-main class="main">
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import SideBar from './components/sidebar'
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'LayoutIndex',
  components: {
    SideBar
  },
  props: {},
  data () {
    return {
      user: {},
      isCollaps: false // 侧边栏的展开与隐藏
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取用户资料
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onlogOut () {
      this.$confirm('此操作将会退出登录, 是否继续?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户登录状态清除
        window.localStorage.removeItem('tokenUser')
        // 跳转到登录页面
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>
<style scoped lang='less'>
  .layout-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc;
    .avatar-wrap {
      display: flex;
      align-items: center;
    .img-size {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 5px;
      background-color: deeppink;
      }
    }
  }
  .el-main  {
    background-color: #ccc;
  }
  .aside {
    .aside-meun {
      height: 100%;
    }
  }
</style>
