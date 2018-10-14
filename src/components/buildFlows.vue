<template>
<div class="app">
  <el-container>
    <el-header height="50">
      <el-row :gutter="5">
        <el-col :span="5"><div class="grid-content bg-purple">
            <el-row>
              <el-button type="primary">创建新项目</el-button>
            </el-row>
          </div></el-col>
        <el-col :span="3" :offset="1"><div class="grid-content bg-purple">
            共{{dataCount}}个项目
          </div></el-col>
        <el-col :span="5" :offset="10"><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="search">
            </el-input>
          </div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="updated" label="最近更新" width="120"></el-table-column>
        <el-table-column prop="repoUrl" label="代码仓库" show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.repoUrl">{{scope.row.repoUrl}}</a>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="执行状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <el-tag size="mini" :class="colorStyle">{{scope.row.status}}</el-tag> -->
            <span :class="colorStyle(scope.row.status)">{{scope.row.status}}</span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-dropdown size="medium" split-button type="primary" @click="viewDetails">查看详情
              <!-- <router-link to="ViewDetails" append>查看详情</router-link> -->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>手动触发</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handlePageSizeChange"
      @current-change="handleCurrentPageChange"
      :current-page="parseInt(offset / pagesize) + 1"
      :page-sizes="[2, 4, 6, 8, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="dataCount">
    </el-pagination>
    </el-main>
  </el-container>
</div>
</template>
<script>
export default {
  data: () => ({
    search: '',
    tableData: [],
    dataCount: 0,
    pagesize: 2,
    offset: 0
  }),
  created () {
    this.getProjectInfo()
  },
  watch: {
    search: function (val, oldVal) {
      this.getProjectInfo()
    }
  },
  methods: {
    getProjectInfo () {
      // let query = `?pagesize=${this.pagesize}offset=${this.offset}&search=${this.search}`
      let query = `?offset=${this.offset}&search=${this.search}&size=${this.pagesize}`
      console.log(this.search)
      this.axios.get(`https://api.daocloud.io/v1/ship/projects${query}`, {headers: {'Authorization': this.$cookies.get('token')}}).then(value => {
        let data = value.data.projects
        for (var i = 0; i < data.length; i++) {
          this.tableData.push({
            name: data[i].project.name,
            updated: parseInt((new Date().getTime() -
            ((data[i].project.updated_at) * 1000)) / 1000 / 60 / 60 / 24 / 30),
            repoUrl: data[i].project.repo_url,
            status: (() => {
              if (data[i].last_build) {
                if (data[i].last_build.status === 'Failure') {
                  return '执行失败'
                } else if (data[i].last_build.status === 'Success') {
                  console.log('succ')
                  return '执行成功'
                }
              } else {
                return '尚未构建'
              }
            })()
          })
        }
        this.dataCount = data.length
      })
    },
    colorStyle (color) {
      if (color === '执行成功') {
        return 'success'
      } else if (color === '执行失败') {
        return 'failure'
      }
    },
    enter () {
      alert('jhh')
      this.getProjectInfo()
    },
    handlePageSizeChange (e) {
      this.pagesize = e
      this.offset = 0
      this.getProjectInfo()
    },
    // 当前页号改变时，根据页号算出当前 offset，并重新获取数据
    handleCurrentPageChange (e) {
      this.offset = this.pagesize * (e - 1)
      this.getProjectInfo()
    },
    viewDetails () {
      this.$router.push({path: '/buildflows/ViewDetails'})
    }
  }
}
</script>
<style lang="scss" scoped>
.success{
  color: green;
}
.failure{
  color: red
}
</style>
<style>
div.app{
  background-color: #E9EEF3;
}
div.app .el-header{
  background-color: #E9EEF3;
  margin:20px 0 0;
  /* padding:0px 20px 20px 20px; */
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /* padding:0px 20px 20px 20px; */
}
</style>
