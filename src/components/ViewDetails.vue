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
      width="50%"
      center>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="触发方式">
          <div><button><span>{{tab}}</span>{{tabItem}}</button></div>
        </el-form-item>
        <div>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="keyword"></el-input>
          <el-tabs v-model="activeName">
            <el-tab-pane v-for="tab in tabs" :key="tab.id" :label="tab.label" :name="tab.name">
              <div :class="item.styleState" v-if="tab.name==='branch'" @click="selectTriggerType(item,tab.label,tab.name)" v-for="item in form.branches" :key="item.id">{{item.name}}</div>
              <div :class="item.styleState" v-if="tab.name==='tag'" @click="selectTriggerType(item,tab.label,tab.name)" v-for="item in form.tags" :key="item.id">{{item.name}}</div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- <el-select v-model="value7" placeholder="请选择">
    <el-option-group>
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      
    </el-option-group>

    <el-option-group>
      <el-select v-model="value8" filterable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-option-group>
  </el-select> -->
  </div>
</template>
<script>
import ExecutionRecord from '@/components/ExecutionRecord'
import ProcessDefinitionContainer from '@/components/ProcessDefinitionContainer'
import Setting from '@/components/Setting'

export default {
  data: () => ({
    tabs: [{ label: '分支', name: 'branch' }, { label: '标签', name: 'tag' }],
    tab: '',
    tabItem: '',
    tabName: '',
    triggerType: '',
    keyword: '',
    activeName: 'branch',
    branchValue: '',
    tagValue: '',
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
    // options3: [
    //   {
    //     label: '热门城市',
    //     options: [
    //       {
    //         value: 'Shanghai',
    //         label: '上海'
    //       },
    //       {
    //         value: 'Beijing',
    //         label: '北京'
    //       }
    //     ]
    //   },
    //   {
    //     label: '城市名',
    //     options: [
    //       {
    //         value: 'Chengdu',
    //         label: '成都'
    //       },
    //       {
    //         value: 'Shenzhen',
    //         label: '深圳'
    //       },
    //       {
    //         value: 'Guangzhou',
    //         label: '广州'
    //       },
    //       {
    //         value: 'Dalian',
    //         label: '大连'
    //       }
    //     ]
    //   }
    // ],
    // value7: '',
    // options: [
    //   {
    //     value: '选项1',
    //     label: '黄金糕'
    //   },
    //   {
    //     value: '选项2',
    //     label: '双皮奶'
    //   },
    //   {
    //     value: '选项3',
    //     label: '蚵仔煎'
    //   },
    //   {
    //     value: '选项4',
    //     label: '龙须面'
    //   },
    //   {
    //     value: '选项5',
    //     label: '北京烤鸭'
    //   }
    // ],
    // value8: ''
  }),
  created() {
    this.getProjectInfo()
  },
  watch: {
    keyword: function(val, oldVal) {
      this.form.branches.forEach(item => {
        if (item.name.indexOf(this.keyword) === -1) {
          item.styleState = 'show'
        } else {
          item.styleState = ''
        }
      })
      this.form.tags.forEach(item => {
        if (item.name.indexOf(this.keyword) === -1) {
          item.styleState = 'show'
        } else {
          item.styleState = ''
        }
      })
    }
  },
  computed: {},
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
          this.form = res.data
          this.form.branches.forEach(item => {
            item.styleState = ''
          })
          this.form.tags.forEach(item => {
            item.styleState = ''
          })
        })
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    selectTriggerType(item, tab, name) {
      this.tab = tab
      this.tabItem = item.name
      this.tabName = name
      // this.triggerType = `${tab}:${item.name}`
    },
    confirm() {
      let tab = {}
      tab[this.tabName] = this.tabItem
      this.dialogVisible = false
      this.axios
        .post(
          `https://api.daocloud.io/v1/ship/project/${
            this.$route.params.id
          }/pipelines`,
          tab
        )
        .then(res => {
          console.log(res)
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
.show {
  display: none;
}
</style>
