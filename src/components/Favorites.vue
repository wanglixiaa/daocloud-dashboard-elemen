<template>
  <div class="app">
    <el-container>
      <el-header :height="50">
        <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content bg-purple">当前收藏1个镜像</div></el-col>
          <el-col :span="6" :offset="11"><div class="grid-content bg-purple">
            <el-input
              placeholder="搜索镜像"
              prefix-icon="el-icon-search"
              v-model="mirror_name">
            </el-input>
            </div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          :show-header="false">
          <el-table-column
            prop="name"
            label="项目名称"
            width="180">
            <template slot-scope="scope">
              <div>{{scope.row.name}}</div>
              <div>更新于{{scope.row.time}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="image_url"
            label="镜像"
            width="300">
            <template slot-scope="scope">
              <div>镜像:{{scope.row.image_url}}</div>
              <div>版本:{{scope.row.version}}</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="new_version"
            label="重新部署"
            width="700">
            <template slot-scope='scope'>
              <!-- <el-button  icon="el-icon-refresh"> -->
                <el-dropdown split-button type="primary">
                  <i class="el-icon-refresh"></i>
                  {{scope.row.new_version}}
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>取消收藏</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              <!-- </el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    mirror_name: '',
    tableData: []
  }),
  created () {
    this.getProjectInfo()
  },
  methods: {
    getProjectInfo () {
      this.axios.get('https://api.daocloud.io/hub/v2/hub/starred/repos?',
        {headers: {'Authorization': this.$cookies.get('token')}}).then(data => {
        for (let i = 0; i < data.data.total_count; i++) {
          this.tableData.push({
            name: data.data.results[i].name,
            image_url: data.data.results[i].image_url,
            version: data.data.results[i].latest_tag.name,
            new_version: (() => {
              if (data.data.results[i].latest_tag) {
                return '部署最新版本'
              } else {
                return 'null'
              }
            })(),
            time: this.$moment(data.data.results[i].updated_at).fromNow()
          })
        }
      })
    }
  }
}
</script>
