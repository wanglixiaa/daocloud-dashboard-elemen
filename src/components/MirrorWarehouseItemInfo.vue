<template>
  <div class="app">
    <div class="header">
      <div class="left">
        <h1>exciting</h1>
        <p>私有访问</p>
        <p>更新于12月前</p>
      </div>
      <div class="right">
        <button>拉取</button>
        <button>部署</button>
      </div>
    </div>
    <div class="content">
      <div class="projectInfo">
        <div>项目:<a>exciting</a></div>
        <div>最新版本:master-ec450a7</div>
        <div>镜像地址:daocloud.io/xzhenglun/exciting</div>
      </div>
      <div class="details"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.app{
  padding: 15px 20px;
}
.header{
  display: flex;
  justify-content: space-between;
}
.content{
  div.projectInfo{
    display: flex;
    border:1px;
    // border-left: 0;
    // border-right: 0;
  }
}
</style>
