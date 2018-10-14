<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: ''
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border-radius: 4px;
  }
.clearfix:before,
.clearfix:after {
  display: table;
  content: " ";
}
.clearfix:after {
  clear: both;
}
input{
  margin:0;
  padding: 0 10px;
  width: 287px;
  height: 32px;
  color: #3d444f;
  transition: all .25s ease;
  background-color: #fff;
  background-size: 16px 16px;
  border: 1px solid #ccd1d9;
  border-radius: 2px;
  line-height: 1;
  vertical-align: middle;
}
.clearfix{zoom:1;} //ie 6 7
li{
  list-style: none;
}
a{
  color: #5d9cec;
  text-decoration: none;
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
strong{
  font-weight: 700;
}

#app {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
