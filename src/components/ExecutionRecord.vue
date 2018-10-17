<template>
<div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="执行记录编号"
      width="180">
      <template slot-scope="scope">
        <div>{{scope.row.tag}}</div>
        <div>{{`${scope.row.author}${scope.row.trigger_method=='manual'?'手动触发':''}`}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="ref"
      label="commit"
      width="180">
      <template slot-scope="scope">
        <div>{{scope.row.ref}}</div>
        <div>{{scope.row.tag}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="message"
      label="commit message">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <!-- <div display=none>shang</div><span></span><div>-</div><span></span><div>-</div> -->
        <div class="status">
          <span @click="centerDialogVisible = true" v-for="item in scope.row.stages"
          :key="item.id" :class="`${item.status=='Failure'?'false':'correct'}`"></span>
        </div>
        <div>{{scope.row.status}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="时间">
    </el-table-column>
  </el-table>
  <el-dialog
    title="流水线 master-ec450a7 的日志"
    :visible.sync="centerDialogVisible"
    width="30%" show-close>
    <div>
      <div>左</div>
      <div>右</div>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [],
      centerDialogVisible: false
    }
  },
  created () {
    this.getRepoInfo()
  },
  methods: {
    getRepoInfo () {
      let query = `?offset=0&size=10&stream_room=20018a36.1539706689.95ca8e0007dd2a2b6aa44a9bfd57f23e6a24696a`
      this.axios.get(` https://api.daocloud.io/v1/ship/project/671eae2e-0712-478b-9bcc-c5278efa020a/pipelines${query}`, {headers: {'Authorization': this.$cookies.get('token')}}).then(data => {
        this.tableData = data.data.builds
        console.log(data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
div.status{
  span{
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 0;
    overflow: hidden;
    display: inline-block;
    margin-left: 10px;
  }
}
  span.correct{
    background-color: #22c36a;
  }
  span.false{
    background-color:#f1483f;
  }
</style>
