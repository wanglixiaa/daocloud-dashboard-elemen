<template>
  <div id="app">
    <el-container>
      <el-aside width="200px">
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <vheader></vheader>
        </el-header>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
export default {
  name: 'App',
  components: {
    vheader: Header,
    sidebar: Sidebar
  }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
  }
html {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size:16px;
  }
body {
  height: 100%;
  color: #555;
  font: 400 1em/1.45 Open Sans,Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,STXihei,STHeiti,Microsoft YaHei,SimHei,sans-serif;
}

#app {
  height: 100%;
  width: 100%;
  margin: 0;
}
.el-header{
  background-color: #fff;
  color: #333;
  text-align: center;
  height: 60px;
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
}

.el-container{
  height:100%;
}
</style>
