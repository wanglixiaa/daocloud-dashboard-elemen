<template>
  <div>
    <div class="top-header">
      <img src="https://dashboard.daocloud.io/assets/images/buildflow/github.svg" alt="">
      <div class="title-container">
        <h1>{{name}}</h1>
        <div class="info">
          <span class="info-item">
            镜像:<a href="https://dashboard.daocloud.io/packages/c355083e-d2f9-4e09-aa49-947fc903e01c">{{name}}</a>
          </span>
          <span class="info-item ng-scope">
            代码源:<a href="https://github.com/xuzhenglun/docker-shadowsocks">{{source}}</a>
          </span>
        </div>
      </div>
      <div class="type">
          <span class="push-code-info">push代码触发</span>
          <button type="text" @click="getBranchesTags">手动触发</button>
      </div>
    </div>
    <div class="container">
      <ul class="dao-tab-nav">
        <li class="dao-tab-nav-item" v-for="item in tabNavItemList" :key="item.id">
          <a class="dao-tab-nav-link" @click="exchange(item.component)">{{item.name}}</a>
        </li>
      </ul>
      <div>
        <keep-alive>
           <component v-bind:is="currentTabComponent"></component>
        </keep-alive>
      </div>
    </div>
    <el-dialog
      title="手动触发流水线"
      :visible.sync="dialogVisible"
      width="30%"
      center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="触发方式">
          <!-- <el-select v-model="分支" :placeholder="this.branches[0].name">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="input21">
            </el-input>
          </el-select> -->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ExecutionRecord from '@/components/ExecutionRecord'
import ProcessDefinitionContainer from '@/components/ProcessDefinitionContainer'
import Setting from '@/components/Setting'

export default {
  data: () => ({
    form: {},
    name: '',
    source: '',
    currentTabComponent: ExecutionRecord,
    dialogVisible: false,
    branches: [],
    tags: [],
    tabNavItemList: [
      { name: '执行记录', component: ExecutionRecord },
      { name: '流程定义', component: ProcessDefinitionContainer },
      { name: '设置', component: Setting }
    ]
  }),
  created() {
    this.getProjectInfo()
  },
  methods: {
    exchange(component) {
      this.currentTabComponent = component
    },
    getProjectInfo() {
      this.axios
        .get(`https://api.daocloud.io/v1/ship/project/${this.$route.params.id}`)
        .then(res => {
          this.name = res.data.project.name
          this.source = res.data.project.source
        })
    },
    getBranchesTags() {
      this.dialogVisible = true
      this.axios
        .get(
          `https://api.daocloud.io/v1/ship/project/${
            this.$route.params.id
          }/branches-tags`
        )
        .then(res => {
          console.log(res)
          this.branches = res.data.branches
          this.tags = res.data.tags
          console.log(this.branches[0].name)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
div.top-header {
  display: flex;
  padding: 17px 30px;
  border: 1px solid #e4e7ed;
  background-color: #fff;
  align-items: center;
  img {
    // display: block;
    width: 64px;
    height: 64px;
    margin-right: 20px;
    border-radius: 4px;
  }
  div.title-container {
    text-align: left;
    flex: 1;
    font-size: 14px;
    h1 {
      font-size: 21px;
      line-height: 1;
      margin: 0 0 10px;
      color: #595f69;
    }
    div.info {
      span.info-item {
        font-size: 13px;
        color: #595f69;
        a {
          margin-left: 5px;
          color: #3890ff;
        }
      }
      span.ng-scope {
        margin-left: 38px;
      }
    }
  }
  div.type {
    span.push-code-info {
      margin-right: 15px;
      color: #9ba3af;
    }
  }
}
div.container {
  text-align: left;
}
</style>
