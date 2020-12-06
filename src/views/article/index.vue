<template>
  <div class="article-container">
    <el-card class="top-card">
  <div slot="header" class="clearfix">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>内容管理</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
   <el-form
    :model="ruleForm"
    :rules="rules" ref="ruleForm"
    label-width="40px"
    class="demo-ruleForm"
    size="mini">
      <el-form-item label="状态" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>

          <el-form-item label="频道" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="date1"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="bot-card">
  <div slot="header" class="clearfix">
    <span>根据筛选条件共查询到46147条结果</span>
  </div>
  <!-- Table·表格组件
      1、把需要展示的数组列表数据绑定给·table·组件的·data·属性
      注意:你不用去·v-for·遍历，它自己会遍历
      2、设计表格列·el-table-column
      width可以设定表格列的宽度
      label可以设定列的标题
      prop用来设定要渲染的列表项数据字段 -->
      <!-- 3、表格列默认只能渲染普通文本，如果需要展示其它
      内容，例如放个按钮啊、放个图片啊，那就需要自定义
      表格列模板了:https://element.eleme.cn/#/zh-CN/
      component/table#zi-ding-yi-lie-mo-ban -->

    <el-table
        :data="artciles"
        style="width: 100%"
        stripe
        border
        size='mini'
        class="table-bot"
        >
        <el-table-column
          prop="data"
          label="封面">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if='scope.row.status === 0'>草稿</el-tag>
            <el-tag type="success" v-else-if='scope.row.status === 1'>待审核</el-tag>
            <el-tag type="success" v-else-if='scope.row.status === 2'>审核通过</el-tag>
            <el-tag type="success" v-else-if='scope.row.status === 3'>审核失败</el-tag>
            <el-tag type="success" v-else-if='scope.row.status === 4'>已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <!--如果需要自定义表格列模板，则把需要自定义
          的内容放到template里面-->
          <template>
            <el-button
              size="mini"
              circle
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
            ></el-button>
        </template>
        </el-table-column>
    </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="1000"
        class="pag-top">
    </el-pagination>
</el-card>

  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  name: 'articleIndex',
  components: {},
  props: {},
  data () {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      artciles: [] // 文章数据列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.ladgetArticle()
  },
  mounted () {},
  methods: {
    ladgetArticle () {
      getArticle().then(res => {
        console.log(res)
        this.artciles = res.data.data.results
      })
    }
  }
}
</script>
<style scoped lang='less'>
  .top-card {
    margin-bottom: 30px;
  }
  .pag-top {
    margin-top: 20px;
  }
</style>
