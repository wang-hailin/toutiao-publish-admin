<template>
  <div class="login-container">
      <div class="login-img"></div>
      <!-- 配置 Form表单验证:
      1、必须给el-from组件绑定model 为表单数据对象
      2、给需要验证的表单项el-form-item绑定prop属性
      注意:prop属性需要指定表单对象中的数据名称
      3、通过el-from组件的rules属性配置验证规则
      具体的验证规则可以参考:https://github.com/yimi
      如果内置的验证规则不满足，也可以自定义验证规则
      手动触发表单验证:
      1、给el-form设置ref 起个名字（随便起名，不要重
      2、通过ref获取el-form组件，调用组件的validat -->
      <el-form class="login-from" ref="loading-form" :model="user" :rules="fromRules">
        <el-form-item prop="mobile">
          <el-input placeholder="请输入手机号" v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input placeholder="请输验证码" v-model="user.code"></el-input>
        </el-form-item>
         <el-form-item prop="agerr">
          <el-checkbox v-model="user.agerr">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item prop="agerr">
          <el-button
            class="login-but"
            type="primary"
            @click="onSubmit"
            :loading="loadingy"
          >登录</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agerr: false //  是否同意协议
      },
      loadingy: false, //  登录 loading 显示状态
      fromRules: {
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { pattern: /^1[3|5|7|8|]\d{9}$/, message: '请输入正确的手机号码格式', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agerr: [
          {
            //  验证通过:callback()
            //  验证失败:callback(new Error('错误消息'))
            //  所以你只需要提供校验函数处理逻辑就可以了
            //  通过:callback()
            //  自定义校验规则: https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze
            //  validator验证函数不是你来调用的，而是当element表单触发验证的时候它会自己内部调用
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSubmit () {
      //  表单验证
      this.$refs['loading-form'].validate((valid) => {
        if (!valid) {
          return
        }
        // 验证通过, 请求登录
        this.loading()
      })
    },
    loading () {
      //  验证通过 登录中....
      this.loadingy = true
      //  请求后台数据
      login(this.user).then(res => {
        this.$message({
          message: '登录成功',
          type: 'success'
        })

        //  关闭 loading
        this.loadingy = false

        // 将接口返回的用户数据放到本地储存方便使用
        // 本地储存只能储存字符串
        // 如果需要储存对象，数组类型的数据，则把他们转换 JSON 格式的字符串进行储存
        window.localStorage.setItem('tokenUser', JSON.stringify(res.data.data))
      }).catch(err => {
        console.log('登录失败', err)
        this.$message.error('登录失败，手机号或验证码错误')
      })

      //  关闭 loading
      this.loadingy = false

      // 登录成功 跳转到首页
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>
<style scoped lang="less">
  .login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: url('./login_bg.jpg') no-repeat;
    background-size: cover;
    .login-img {
      width:300px;
      height: 57px;
      background: url('./logo_index.png') no-repeat;
      margin-bottom: 30px;
    }
    .login-from {
      background-color: #fff;
      padding: 50px;
      min-width: 300px;
      }
    .login-but {
      width: 100%;
    }
  }
</style>
