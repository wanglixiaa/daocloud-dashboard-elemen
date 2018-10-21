<template>
  <div class="app">
    <div class="sidebar">
      <button @click="substitution(item.component)" class="list" v-for="item in items" :key="item.id" type="primary">{{item.name}}<i class="el-icon-arrow-right el-icon--right"></i></button>
    </div>
    <div class="container">
      <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import AccountInformation from '@/components/AccountInformation'
import personalInformation from '@/components/personalInformation'
import Email from '@/components/Email'
import CodeManage from '@/components/CodeManage'
import TransactionRecord from '@/components/TransactionRecord'

export default {
  data: () => ({
    currentTabComponent: 'AccountInformation',
    items: [
      {name: '账户信息', component: 'AccountInformation'},
      {name: '个人信息', component: 'personalInformation'},
      {name: '邮箱', component: 'Email'},
      {name: '代码托管', component: 'CodeManage'},
      {name: '交易记录', component: 'TransactionRecord'},
      {name: '我的组织', component: 'AccountInformation'},
      {name: '登陆设置', component: 'AccountInformation'},
      {name: '通知', component: 'AccountInformation'},
      {name: 'API', component: 'AccountInformation'},
      {name: '开发者中心', component: 'AccountInformation'}
    ]
  }),
  components: {
    AccountInformation,
    personalInformation,
    Email,
    CodeManage,
    TransactionRecord
  },
  methods: {
    substitution(component) {
      this.currentTabComponent = component
    }
  }
}
</script>
<style lang="scss" scoped>
div.app{
  display: flex;
  margin-top: 20px;
  padding: 0 20px;
  border: 1pxsolid #e4e7ed;
  border-bottom-width: 0;
  border-radius: 4px;
  box-shadow: 0 1px 4px 0 rgba(204,209,217,.3);
}
div.sidebar{
  // flex: 1;
  min-width: 205px;
  .list{
  width: 100%;
  text-align: left;
  display:block;
  background-color: #fff;
  color: #3d444f;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  border: 1px solid #e4e7ed;
  cursor: pointer;
  margin-bottom: -1px;
}
}
div.container{
  flex: 1;
  text-align: left;
  margin-left: 20px;
  margin-bottom: 20px;
  border: 1px solid #e4e7ed;
  div.title-block{
    border-radius:4px 4px 0 0;
    padding: 24px 30px 20px;
    border-bottom: 1px solid #e4e7ed;
  }
  div.setting-block{
    display: flex;
    font-size: 14px;
    padding: 25px 30px;
    border-bottom: 1px solid #e4e7ed;
    background-color: #fff;
    div.setting-title{
      line-height: 24px;
      width: 133px;
      color: #3d444f;
    }
    div.setting-content{
      flex: 1;
    }
  }
}
.number{
  display: inline-flex;
  padding: 0 10px;
  width: 287px;
  height: 32px;
  color: #3d444f;
  background-color: #fff;
  border: 1px solid #ccd1d9;
  border-radius: 2px;
  line-height: 1;
  vertical-align: middle;
}
.exchange{
  display: inline-block;
  color: #ccd1d9;
  border-color: #ccd1d9;
  cursor: not-allowed;
  margin-left: 10px;
  padding: 8px 17px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 14px;
  line-height: 1;
}
.check{
  display: block;
  padding: 8px 17px;
  margin-top: 20px;
  color: #3d444f;
  font-weight: 400;
  font-size: 14px;
  border: 1px solid transparent;
  border-color: #ccd1d9;
  line-height: 1;
  border-radius: 4px;
}
div.pay{
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
div.pay:nth-child(3){
  border-bottom: 1px solid grey;
}
.el-radio{
  display: block;
  text-align: left;
  margin-left: 0;
  margin-bottom: 10px;
}
</style>
