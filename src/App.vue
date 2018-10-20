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
.flex{
  display: flex;
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
  cursor: pointer;
}
h1{
  font-weight: 400;
}
html {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  font-size:16px;
  }
  button{
    color: #3d444f;
    border-color: #ccd1d9;
    display: inline-block;
    font-weight: 400;
    border: 1px solid transparent;
    cursor: pointer;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    padding: 8px 17px;
    font-size: 14;
    line-height: 1;
    border-radius: 4px;
    // background: none;
  }
body {
  height: 100%;
  color: #555;
  font: 400 1em/1.45 Open Sans,Helvetica Neue,Helvetica,Arial,Hiragino Sans GB,STXihei,STHeiti,Microsoft YaHei,SimHei,sans-serif;
}
strong{
  font-weight: 700;
}
.dao-tab-nav{
  margin-bottom: 0;
  padding-left: 20px;
  border-width: 0 0 1px;
  border-style: solid;
  border-color: #e4e7ed;
  background-color: #fbfcfc;;
  box-shadow: 1px 0 4px 0 rgba(0,0,0,.1)
}
.dao-tab-nav-item{
  background:#fff;
  margin-bottom: 0;
  list-style: none;
  display: inline-block;
  cursor: pointer;
  padding: 0;
  display: inline-block;
  margin-right: 20px;
}
.dao-tab-nav-link{
  display: block;
  padding:10px 15px;
  font-size: 14px;
  color: #a2a9b5;
  border-top: none;
  // border-bottom: 2px solid #3d444f;
  background-color: #fbfcfc;
}
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>
