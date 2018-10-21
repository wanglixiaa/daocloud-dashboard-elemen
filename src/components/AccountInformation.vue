<template>
<div class="setting">
  <div class="title-block">账户信息</div>
    <div class="setting-block">
      <div class="setting-title">当前套餐</div>
      <div class="setting-content">
        <h4>个人</h4>
        <p>个人用户可以使用基本功能，
          <el-button type="text" @click="dialogFormVisible = true">创建组织</el-button>
          开启团队协作与更多高级功能，或<a> 升级个人账号为组织账号</a>。</p>
      </div>
    </div>
    <div class="setting-block">
      <div class="setting-title">账户余额</div>
      <div class="setting-content">
        <span>10.66</span>
      </div>
    </div>
    <div class="setting-block">
      <div class="setting-title">我的礼包</div>
      <div class="setting-content">
        <p>目前您还没有获得任何礼包</p>
        <p>在礼包的有效期内，礼包内的资源会叠加到您的套餐配额中。</p>
      </div>
    </div>
    <div class="setting-block">
      <div class="setting-title">我的礼券</div>
      <div class="setting-content">
        <input class="number" placeholder="请输入礼券好号" type="text"><button class="exchange">兑换</button>
        <button class="check">查看已失效礼券</button>
      </div>
    </div>
    <el-dialog title="创建组织" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="组织名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="成员数量" :label-width="formLabelWidth">
        <el-input v-model="form.number" autocomplete="off" type="number"></el-input>
        <div class="pay"><span>5名基础人员</span><span>200元/月</span></div>
        <div class="pay"><span>{{form.number-5}}名增加成员(80元/人/月)</span><span>+{{(form.number-5)*80}}元/月</span></div>
        <div class="pay"><span>实付</span><span>{{(form.number-5)*80+200}}元/月</span></div>
      </el-form-item>
      <el-form-item label="支付方式" :label-width="formLabelWidth">
        <el-radio v-model="radio" label="1">微信</el-radio>
        <el-radio v-model="radio" label="2">支付宝</el-radio>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  data: () => ({
    currentTabComponent: 'AccountInformation',
    radio: '1',
    dialogTableVisible: false,
    dialogFormVisible: false,
    form: {
      name: '组织名称',
      number: 5
    },
    formLabelWidth: '120px'
  }),
  methods: {
    handleClose(done) {
      // this.$confirm('确认关闭？')
      //   .then(_ => {
      //     done();
      //   })
      //   .catch(_ => {});
    }
  }
}
</script>
<style lang="scss">
div.setting{
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
</style>
<style lang="scss" scoped>
// div.title-block{
//     border-radius:4px 4px 0 0;
//     padding: 24px 30px 20px;
//     border-bottom: 1px solid #e4e7ed;
//   }
//   div.setting-block{
//     display: flex;
//     font-size: 14px;
//     padding: 25px 30px;
//     border-bottom: 1px solid #e4e7ed;
//     background-color: #fff;
//     div.setting-title{
//       line-height: 24px;
//       width: 133px;
//       color: #3d444f;
//     }
//     div.setting-content{
//       flex: 1;
//     }
//   }
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
