<template>
  <div class="app">
    <el-container>
      <el-header height="50">
        <el-row :gutter="5">
          <el-col :span="6"><div class="grid-content bg-purple">
              <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>本地Push镜像</el-button>
            </div></el-col>
          <el-col :span="6" :offset="0"><div class="grid-content bg-purple">共{{total}}个镜像</div></el-col>
          <el-col :span="6" :offset="5"><div class="grid-content bg-purple">
              <el-input
                placeholder="搜索镜像"
                prefix-icon="el-icon-search"
                v-model="search"
                @keyup.enter.native="searchInfo">
              </el-input>
            </div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          v-loading="isLoading"
          :data="repos"
          tooltip-effect="dark"
          style="width:100%"
          :show-header="false">
          <el-table-column
            label="项目名称"
            width="180">
            <template slot-scope="scope">
              <div><a :href="`/MirrorWarehouseList/MirrorWarehouseItemInfo/${scope.row.id}`">{{scope.row.name}}</a></div>
              <div>{{scope.row.updated_at}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="镜像"
            width="300">
            <template slot-scope="scope">
              <div>镜像:{{scope.row.image_url}}</div>
              <div>版本:{{scope.row.version}}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="重新部署"
            width="200"
            :offset="10">
            <template slot-scope='scope'>
              <el-button icon="el-icon-refresh" :disabled="scope.row.disabled">部署最新版本</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import MirrorWarehouse from '@/services/mirrorWarehouse'
export default {
  data: () => ({
    repoListParams: {
      page: 1,
      page_size: 10,
      search: ''
    },
    search: '',
    repos: [],
    total: 0,
    isLoading: true
  }),
  created() {
    this.fetchRepos()
  },
  watch: {
    repoListParams: {
      handler: function(value, oldValue) {
        this.fetchRepos()
      },
      deep: true
    }
  },
  methods: {
    fetchRepos() {
      MirrorWarehouse.listMirrorWarehouse(
        this.repoListParams.page,
        this.repoListParams.page_size,
        this.repoListParams.search
      ).then(res => {
        this.total = res.data.total_count
        this.isLoading = false
        this.repos = []
        res.data.results.forEach(item => {
          this.repos.push({
            id: item.id,
            name: item.name,
            updated_at: this.$moment(item.updated_at).fromNow(),
            img_url: item.img_url,
            version: item.latest_tag ? item.latest_tag.name : '未知',
            disabled: item.latest_tag == null
          })
        })
      })
    },
    getItemInfo(value) {
      this.$router.push('/MirrorWarehouseList/MirrorWarehouseItemInfo')
    },
    searchInfo() {
      this.repoListParams.search = this.search
      this.isLoading = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
