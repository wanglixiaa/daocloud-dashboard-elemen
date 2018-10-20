<template>
  <div class="app">
    <el-container>
      <el-header height="50">
        <el-row :gutter="5">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>本地Push镜像</el-button>
            </div></el-col>
          <el-col :span="6" :offset="0"><div class="grid-content bg-purple">共7个镜像</div></el-col>
          <el-col :span="6" :offset="5"><div class="grid-content bg-purple">
              <el-input
                placeholder="搜索镜像"
                prefix-icon="el-icon-search"
                v-model="search">
              </el-input>
            </div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width:100%"
          :show-header="false">
          <el-table-column
            label="项目名称"
            width="180">
            <template slot-scope="scope">
              <div><a @click="getItemInfo(scope.row.id)">{{scope.row.name}}</a></div>
              <div>{{scope.row.updated_at}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="镜像"
            width="300">
            <template slot-scope="scope">
              <div>镜像:{{scope.row.image_url}}</div>
              <div>版本:{{scope.row.latest_tag?'scope.row.latest_tag.name':'未知'}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="重新部署"
            width="200"
            :offset="10">
            <template slot-scope='scope'>
              <el-button icon="el-icon-refresh" :disabled="scope.row.latest_tag?false:true">部署最新版本</el-button>
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
    search: '',
    tableData: []
  }),
  created () {
    this.getProjectInfo()
  },
  methods: {
    getProjectInfo () {
      this.axios.get('https://api.daocloud.io/hub/v2/hub/daohub/repos?',
        {headers: {'Authorization': this.$cookies.get('token')}}).then(data => {
        // console.log(data)
        this.tableData = data.data.results
        // for (let i = 0; i < data.data.total_count; i++) {
        //   // this.tableData[i] = {
        //   //   name: data.data.results[i].name,
        //   //   image_url: data.data.results[i].image_url
        //   // }
        //   this.tableData.push({
        //     name: data.data.results[i].name,
        //     time: this.$moment(data.data.results[i].updated_at).fromNow(),
        //     image_url: data.data.results[i].image_url,
        //     version: data.data.results[i].latest_tag.name,
        //     new_version: (() => {
        //       if (data.data.results[i].latest_tag) {
        //         // return data.data.results[i].latest_tag.name
        //         return '部署最新版本'
        //       } else {
        //         return 'null'
        //       }
        //     })()
        //   })
        // }
      })
    },
    getItemInfo (value) {
      this.$router.push('/MirrorWarehouseList/MirrorWarehouseItemInfo')
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
