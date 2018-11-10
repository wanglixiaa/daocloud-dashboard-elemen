<template>
<div>
  <el-table
    :data="projectItem"
    border
    style="width: 100%">
    <el-table-column
      label="执行记录编号"
      width="180">
      <template slot-scope="scope">
        <div>{{scope.row.tag}}</div>
        <div>{{scope.row.trigger_method}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="commit"
      width="180">
      <template slot-scope="scope">
        <div>{{scope.row.ref}}</div>
        <div>{{scope.row.number}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="message"
      label="commit message">
    </el-table-column>
    <el-table-column
      label="状态">
      <template slot-scope="scope">
        <div class="container">
          <div class="status" v-for="item in scope.row.stages" :key="item.id">
            <div :class="item.status.toLowerCase()"></div>
            <span :class="item.status.toLowerCase()"></span>
            </div>
          </div>
        <div :class=scope.row.status().toLowerCase()>{{scope.row.status()}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="时间">
      <template slot-scope="scope">
        <div>{{scope.row.duration}}</div>
        <div>{{scope.row.created_at}}</div>
      </template>
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
import viewDetails from '@/services/viewDetails'
// import buildflow from '@/services/buildflow'

export default {
  data() {
    return {
      projectParams: {
        offset: 0,
        size: 10,
        tream_room: ''
      },
      projectItem: [],
      centerDialogVisible: false,
      yy: '<h1>fff</h1>'
    }
  },
  created() {
    this.getRepoInfo()
  },
  methods: {
    // getRepoInfo() {
    //   let query = `?offset=0&size=10&stream_room=20018a36.1539706689.95ca8e0007dd2a2b6aa44a9bfd57f23e6a24696a`
    //   this.axios.get(` https://api.daocloud.io/v1/ship/project/671eae2e-0712-478b-9bcc-c5278efa020a/pipelines${query}`, {headers: {'Authorization': this.$cookies.get('token')}}).then(data => {
    //     this.tableData = data.data.builds
    //     console.log(data)
    //   })
    // }
    getRepoInfo() {
      viewDetails
        .executionRecord(
          this.projectParams.offset,
          this.projectParams.size,
          this.projectParams.tream_room,
          this.$route.params.id
        )
        .then(res => {
          // console.log(res)
          res.data.builds.forEach(item => {
            this.projectItem.push({
              tag: item.tag,
              trigger_method: `${item.author}${
                item.trigger_method === 'manual' ? '手动触发' : ''
              }`,
              ref: item.ref,
              number: item.tag.slice(7),
              message: item.message ? item.message : '-',
              stages: item.stages,
              // status: buildflow.semanticStatusMap[item.status],
              status() {
                if (item.status === 'Failure') {
                  return '执行失败'
                } else if (item.status === 'Success') {
                  return '执行成功'
                } else if (item.status === 'Cancelled') {
                  return '被取消'
                } else {
                  return ''
                }
              },
              duration: `耗时${this.$moment
                .duration(Math.floor(item.duration * 1000))
                .minutes()}分${this.$moment
                .duration((item.duration % 60) * 1000)
                .seconds()}秒`,
              created_at: this.$moment(item.created_at * 1000).fromNow()
            })
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
div.status {
  span {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    border: 0;
    overflow: hidden;
    display: inline-block;
    margin-left: 10px;
  }
}
div.status {
  display: inline-block;
  div {
    width: 15px;
    height: 15px;
    border-radius: 15px;
    display: inline-block;
  }
  span {
    display: inline-block;
    width: 15px;
    height: 2px;
    margin: 0;
    position: relative;
    top: -7.5px;
    left: -2px;
  }
}
div.status:nth-last-of-type(1) span {
  display: none;
}
.success {
  background-color: #22c36a;
}
.failure {
  background-color: #f1483f;
}
.cancelled {
  background-color: grey;
}
</style>
