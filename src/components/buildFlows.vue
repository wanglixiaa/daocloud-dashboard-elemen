<template>
<div class="app">
  <el-container>
    <el-header height="50">
      <el-row>
        <el-col :span="2"><div class="grid-content bg-purple">
            <el-row>
              <el-button type="primary">创建新项目</el-button>
            </el-row>
          </div></el-col>
        <el-col :span="3" :offset="1"><div class="grid-content bg-purple">
            共{{projects.total}}个项目
          </div></el-col>
        <el-col :span="5" :offset="10"><div class="grid-content bg-purple">
            <el-input
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="search"
              @keyup.enter.native="searchInfo">
            </el-input>
          </div></el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-table v-loading="projects.isLoading" ref="multipleTable" :data="projects.content" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="项目名称">
          <template slot-scope="scope">
            <div><a :href="`/BuildFlowsList/ViewDetails/${scope.row.id}`">{{scope.row.name}}</a></div>
            <div>{{scope.row.build_tag}}</div>
          </template>
        </el-table-column>
        <el-table-column label="最近更新">
          <template slot-scope="scope">
            <div>{{getTime(scope.row.updated_at)}}</div>
          </template>
        </el-table-column>
        <el-table-column label="代码仓库" show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.code_src_url">{{scope.row.code_src}}</a>
          </template>
        </el-table-column>
        <el-table-column label="执行状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span :class="scope.row.status.toLowerCase()">{{scope.row.status}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip>
          <template slot-scope="scope">
            <el-dropdown size="medium" split-button type="primary" @click="viewDetails(scope.row.buildflow_id)">查看详情
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
        :current-page="projectListParams.page"
        :page-sizes="[3,6]"
        :page-size="projectListParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="projects.total">
        </el-pagination>
    </el-main>
  </el-container>
</div>
</template>

<script>
import buildflow from '@/services/buildflow'
import _ from 'lodash'

export default {
  data: () => ({
    projectListParams: {
      page: 1,
      size: 3,
      search: ''
    },
    projects: {
      content: [],
      total: 0,
      isLoading: true
    },
    search: ''
  }),

  created: function() {
    this.fetchProjects()
  },

  watch: {
    projectListParams: {
      handler: function(to, from) {
        this.fetchProjects()
      },
      deep: true
    }
  },

  methods: {
    fetchProjects() {
      this.projects.content = []
      buildflow
        .listProjects(
          this.projectListParams.page,
          this.projectListParams.size,
          this.projectListParams.search
        )
        .then(res => {
          this.projects.isLoading = false
          this.projects.total = res.data.total_count
          res.data.projects.forEach(item => {
            this.projects.content.push({
              id: item.project.buildflow_id,
              name: item.project.name,
              build_tag: item.last_build ? item.last_build.tag : '',
              updated_at: item.project.updated_at,
              code_src: item.project.source,
              code_src_url: item.project.repo_url,
              code_src_kind: item.project.remote,
              status:
                buildflow.semanticStatusMap[_.get(item, 'last_build.status')],
              buildflow_id: item.project.buildflow_id
            })
          })
        })
    },

    handlePageSizeChange(e) {
      this.projectListParams.size = e
    },
    // 当前页号改变时，根据页号算出当前 offset，并重新获取数据
    handleCurrentPageChange(e) {
      this.projectListParams.page = e
    },
    viewDetails(id) {
      console.log(`'/BuildFlows/${id}'`)
      this.$router.push({ path: `/BuildFlows/${id}` })
    },
    getTime(value) {
      return this.$moment(value * 1000).fromNow()
    },
    searchInfo(e) {
      this.projectListParams.search = this.search
    }
  }
}
</script>
<style lang="scss" scoped>
.success {
  color: green;
}
.failure {
  color: red;
}
</style>
<style>
div.app {
  background-color: #e9eef3;
  text-align: left;
}
div.app .el-header {
  background-color: #e9eef3;
  margin: 20px 0 0;
  /* padding:0px 20px 20px 20px; */
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* padding:0px 20px 20px 20px; */
}
.el-table,
.el-row {
  text-align: left;
}
.el-row {
  vertical-align: middle;
  height: 100%;
}
.el-col {
  height: 100%;
}
.grid-content .bg-purple {
  height: 100%;
  vertical-align: middle;
}
</style>
