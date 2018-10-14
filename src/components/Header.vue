<template>
  <div class="header-bar">
    <div class="header-namespace">
      <div>
        <img class="userbar-avatar" :src="imgSrc" alt="头像">
        <div class="userbar-content">
          <span class="ng-binding">{{user}}</span>
          <div class="ng-bingding">{{userType}}</div>
        </div>
      <div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personal">xuzhenglun</el-dropdown-item>
            <el-dropdown-item command="cache">cache</el-dropdown-item>
            <el-dropdown-item command="userCenter">{{userCenter}}</el-dropdown-item>
            <el-dropdown-item command="signout">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- <svg></svg> -->
      </div>
    </div>
    <div class="notification"></div>
  </div>
</template>
<script>
import personalMenu from '@/config/personal-menu-config'
import cachaMenu from '@/config/cacha-menu-config'
export default {
  data: () => ({
    user: '',
    userType: '个人',
    userCenter: '用户中心',
    imgSrc: 'https://cdn-daoweb-prod.daocloud.io/static/noavatar01.png'
  }),
  created () {
    this.axios.get('https://api.daocloud.io/get-token-info', {headers: {'Authorization': this.$cookies.get('token')}}).then(response => {
      this.user = response.data.user.username
      // this.$store.state.menu = personalMenu
      // console.log(this.$store.state.menu)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleCommand (command) {
      if (command === 'signout') {
        this.$router.push({path: '/login'})
      } else if (command === 'personal') {
        if (this.user !== 'xuzhenglun') {
          this.user = 'xuzhenglun'
          this.userType = '个人'
          this.userCenter = '用户中心'
          // this.$store.commit('change')
          // console.log(this.$store.state.menu)

          // this.$emit('ChangeNs',{
          //     isOrg: false,
          //     tenantName: 'xuzhenglun',
          // })
          this.$emit('ChangeNs', personalMenu)
        }
      } else if (command === 'cache') {
        if (this.user !== 'cache') {
          this.user = 'cache'
          this.userType = '组织'
          this.userCenter = '组织中心'
          // this.$store.commit('change')
          // console.log(this.$store.state.menu)

          //  this.$emit('ChangeNs',{
          //     isOrg: true,
          //     tenantName: 'cache',
          // })
          this.$emit('ChangeNs', cachaMenu)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-bar{
  height: 100%;
}
.header-namespace{
  height: 100%;
  padding:0px 25px;
  border-left:1px solid #e4e7ed;
  float:right;
  line-height:100%;
  img.userbar-avatar{
    // display:inline-block;
    width:36px;
    height:36px;
    border-radius:50%;
  }
  .userbar-content{
    display: inline-block;
  }
}
.notification{
  width:50px;
  height: 100%;
  float: right;
  padding: 0 25px;
  border-left: 1px solid #e4e7ed;
}
</style>
