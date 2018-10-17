<template>
<div class="setting">
  <div class="title-block">交易记录
  </div>
    <div class="setting-block">
      <div class="content">
        <h4>共7条交易记录</h4>
        <div>
          <el-table
            border
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="订单号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="时间">
            </el-table-column>
            <el-table-column
              prop="address"
              label="状态">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
</div>
</template>
<script>
export default {
  data: () => ({
    tableData: []
  })
}
</script>

<style lang="scss" scoped>
.title-block{
  p{
    font-size: 14px;
    line-height: 24px;
    margin: 7px 0 -5px;
    color: #9ba3af;
    text-shadow:0 1px 0 rgba(255,255,255,.8);
  }
}
div.setting-block{
    // border-bottom: 1px solid #e4e7ed;
    div.content{
      border: 1px solid #e4e7ed;
      // display: flex;
    }
  }
</style>
