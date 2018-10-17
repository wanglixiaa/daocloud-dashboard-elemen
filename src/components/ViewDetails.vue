<template>
  <div>
    <div class="top-header">
      <img src="https://dashboard.daocloud.io/assets/images/buildflow/github.svg" alt="">
      <div class="title-container">
        <h1>exciting</h1>
        <div class="info">
          <span class="info-item">
            镜像:<a>exciting</a>
          </span>
          <span class="info-item ng-scope">
            代码源:<a>xuzhenglun/docker-shadowsocks</a>
          </span>
        </div>
      </div>
      <div class="type">
          <span class="push-code-info">push代码触发</span>
          <button>手动触发</button>
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
  </div>
</template>
<script>
import ExecutionRecord from '@/components/ExecutionRecord'
import ProcessDefinition from '@/components/ProcessDefinition'
import Setting from '@/components/Setting'

export default {
  data: () => ({
    currentTabComponent: ExecutionRecord,
    tabNavItemList: [
      {name: '执行记录', component: ExecutionRecord},
      {name: '流程定义', component: ProcessDefinition},
      {name: '设置', component: Setting}
    ]
  }),
  methods: {
    exchange (component) {
      this.currentTabComponent = component
    }
  }
}
</script>

<style lang="scss" scoped>
div.top-header{
  display: flex;
  padding: 17px 30px;
  border: 1px solid #e4e7ed;
  background-color: #fff;
  align-items:center;
  img{
    // display: block;
    width: 64px;
    height: 64px;
    margin-right: 20px;
    border-radius: 4px;
  }
  div.title-container{
    text-align: left;
    flex:1;
    font-size: 14px;
    h1{
      font-size: 21px;
      line-height: 1;
      margin: 0 0 10px;
      color:#595f69;
    }
    div.info{
      span.info-item{
        font-size: 13px;
        color: #595f69;
        a{
          margin-left: 5px;
          color: #3890ff;
        }
      }
      span.ng-scope{
        margin-left: 38px;
      }
    }
  }
  div.type{
    span.push-code-info{
      margin-right: 15px;
      color: #9ba3af;
    }
  }
}
div.container{
  text-align: left;
}
</style>
