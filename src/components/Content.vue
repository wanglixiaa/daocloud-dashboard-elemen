<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <sidebar v-bind:namespace="namespace"></sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <vheader @ChangeNs="loadNamespace"></vheader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import buildFlows from '@/components/buildFlows'
export default {
  data () {
    return {
      namespace: []
    }
  },
  methods: {
    loadNamespace: function (data) {
      this.namespace = data
      console.log(data)
    }
  },
  components: {
    sidebar: Sidebar,
    vheader: Header,
    buildFlows: buildFlows
  }
}
</script>
<style lang="scss">
.el-header{
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 50px;
  padding: 0;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 100%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  padding:0px 0px 0px 0px;
}

.el-container{
  height:100%;
}
</style>
