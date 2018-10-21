<template>
  <div>
    <el-container>
        <el-aside width="200px"  class="explore-sidebar">
          <div>
            <el-input
              placeholder="搜索镜像"
              prefix-icon="el-icon-search"
              v-model="search"
              @change="searchRepo">
            </el-input>
          </div>
          <div>
            <div>来源</div>
            <el-radio-group v-model="source" @change="selectSource">
              <div><el-radio label="featured">精选镜像</el-radio></div>
              <div><el-radio label="community">社区镜像</el-radio></div>
              <div><el-radio label="dockerhub">Docker Hub</el-radio></div>
            </el-radio-group>
          </div>
          <div>
            <div>
              分类
            </div>
            <el-checkbox-group v-model="checkList" @change="handleCheckAllChange" :disabled="disabled">
              <div><el-checkbox label="cms">内容管理系统</el-checkbox></div>
              <div><el-checkbox label="container-tools">容器工具</el-checkbox></div>
              <div><el-checkbox label="database">数据库</el-checkbox></div>
              <div><el-checkbox label="devops-tools">运维工具</el-checkbox></div>
              <div><el-checkbox label="game">游戏</el-checkbox></div>
              <div><el-checkbox label="message-queue">消息队列</el-checkbox></div>
              <div><el-checkbox label="os">操作系统</el-checkbox></div>
              <div><el-checkbox label="others">其他</el-checkbox></div>
              <div><el-checkbox label="programming-language">编程语言</el-checkbox></div>
              <div><el-checkbox label="server">服务器</el-checkbox></div>
              <div><el-checkbox label="web-framework">web框架</el-checkbox></div>
            </el-checkbox-group>
          </div>
        </el-aside>
        <el-main>
          <el-container>
            <div v-if="community" class="community">
              <span>请输入关键字搜索社区镜像</span>
            </div>
            <div v-if="dockerhub" class="dockerhub">
              <span>请输入关键字搜索 Docker Hub 镜像</span>
            </div>
            <div v-if="featured" class="featured">
              <el-header>
                <el-row :gutter="20">
                  <el-col :span="6"><div class="grid-content bg-purple">
                    共{{dataCount}}个精选镜像</div></el-col>
                  <el-col :span="6" :offset="11"><div class="grid-content bg-purple">
                    排序
                    <el-dropdown @command="handleCommand">
                      <el-button type="primary">
                        {{searchType}}<i class="el-icon-arrow-down el-icon--right"></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="updated_at">更新时间</el-dropdown-item>
                        <el-dropdown-item command="download_count">下载量</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div></el-col>
                </el-row>
              </el-header>
              <el-main>
                <ul class="clearfix">
                  <li v-for="item in dataObject" :key="item.id">
                    <div class="title-container">
                      <img :src="item.icon_url" alt="图片">
                      <div class="title">
                        <a :href="item.titleHref">{{item.repo_title}}</a>
                      </div>
                    </div>
                    <p class="description">{{item.brief}}</p>
                    <div class="item-category">{{item.categories.length?item.categories[0].name:"hh"}}</div>
                    <div class="item-footer">
                      <div><i class="el-icon-download">{{item.download_count}}</i></div>
                      <div><i class="el-icon-star-on">{{item.star_count}}</i></div>
                    </div>
                  </li>
                </ul>
                <div>
                  <el-pagination
                  @size-change="handlePageSizeChange"
                  @current-change="handleCurrentPageChange"
                  :current-page="currentPage"
                  :page-sizes="[9, 18, 27]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="dataCount">
                  </el-pagination>
                </div>
              </el-main>
                </div>
          </el-container>
        </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    source: '',
    community: false,
    dockerhub: false,
    featured: true,
    disabled: false,
    searchType: '更新时间',
    search: '',
    radio: '',
    checkList: [],
    dataObject: [],
    dataCount: 0,
    pagesize: 9,
    currentPage: 1
  }),
  created() {
    this.getRepoInfo()
  },
  // ?ordering=-updated_at&page=3&page_size=9&q=&random=false
  // category_ids=os&ordering=-updated_at&page=1&page_size=9&q=&random=false
  // ordering=-download_count&page=1&page_size=9&q=&random=false
  // category_ids=server&ordering=-updated_at&page=1&page_size=9&q=&random=false
  // category_ids=programming-language,server&ordering=-updated_at&page=1&page_size=9&q=&random=false
  // category_ids=os,programming-language,server&ordering=-updated_at&page=1&page_size=9&q=&random=false
  methods: {
    getRepoInfo(searchTypes) {
      let query = `?category_ids=${this.checkList.toString()}&ordering=-${!searchTypes ? 'updated_at' : searchTypes}&page=${this.currentPage}&page_size=${this.pagesize}&q=${this.search}&random=false`
      this.axios.get(`https://api.daocloud.io/hub/v2/store/repos${query}`, {headers: {'Authorization': this.$cookies.get('token')}}).then(data => {
        this.dataObject = data.data.results
        this.dataCount = data.data.total_count
      })
    },
    // pagesize 改变时重设当前页号，并重新获取数据
    handlePageSizeChange(e) {
      this.pagesize = e
      this.offset = 0
      this.getRepoInfo()
    },
    // 当前页号改变时，根据页号算出当前 offset，并重新获取数据
    handleCurrentPageChange(e) {
      this.currentPage = e
      this.getRepoInfo()
    },
    handleCommand(command) {
      if (command === 'updated_at') {
        this.searchType = '更新时间'
      } else {
        this.searchType = '下载量'
      }
      this.getRepoInfo(command)
    },
    handleCheckAllChange() {
      this.getRepoInfo()
    },
    selectSource() {
      if (this.source === 'featured') {
        this.getRepoInfo()
        this.featured = true
        this.community = false
        this.dockerhub = false
      } else if (this.source === 'community') {
        this.community = true
        this.dockerhub = false
        this.featured = false
        this.disabled = true
      } else {
        this.dockerhub = true
        this.community = false
        this.featured = false
        this.disabled = true
      }
    },
    searchRepo() {
      this.getRepoInfo()
    }
  }
}
</script>
<style lang="scss" scoped>
.explore-sidebar{
  text-align: left;
}
.el-main{
  overflow: hidden;
  width:100%;
}
ul{
  // width: 100%;
  // height: 1000px;
  li{
    text-align: left;
    float:left;
    min-width:265px;
    max-width:360px;
    height:270px;
    margin-right:20px;
    margin-bottom:20px;
    padding:20px 20px 25px 25px;
    border-radius:1px;
    background-color:#fff;
    box-shadow:0 2px 4px 0 rgba(0,0,0,.12);
    // width:calc((100%-40px)/3);
    width:300px;
    div.title-container{
      img{
        width: 64px;
        height: 64px;
        display: inline-block;
        border:0;
      }
      div.title{
        margin-left:20px;
        display: inline;
      }
    }
    p{
      font-size:13px;
      line-height:22px;
      overflow: hidden;
      height:66px;
      margin:25px 0 7px;
      text-overflow: ellipsis;
      color:#595f69;
    }
    span{
      font-size:13px;
      display:inline-block;
      height:13px;
      margin-bottom:20px;
      color:#9ba3af;
    }
    div.item-footer{
      div{
        float:right;
      }
    }
  }
}
</style>
