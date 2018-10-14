<template>
<div class="setting">
  <div class="title-block">代码托管
    <p>通过关联 Github 和 Bitbucket 等第三方代码托管服务，您可以从他们的代码源创建项目，并实现持续集成和自动化构建。</p>
  </div>
    <div class="setting-block">
      <div class="content">
        <div class="setting-title"><img src="" alt="图片区"></div>
        <div class="setting-content">
          <h4>Github</h4><span>xuzhenglun</span>
          <p>Github于2008年上线，目前，除了Git代码仓库托管及基本的Web管理界面以外，还提供了订阅、讨论组、文本渲染、在线文件编辑器、协作图谱（报表）、代码片段分享（Gist）等功能。</p>
        </div>
      </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.title-block{
  p{
    font-size: 14px;
    line-height: 24px;
    margin: 7px 0 -5px;
    color: #9ba3af;
    text-shadow:0 1px 0 rgba(255,255,255,.8);
  }
}
div.setting-block{
    // border-bottom: 1px solid #e4e7ed;
    div.content{
      border: 1px solid #e4e7ed;
      display: flex;
    }
  }
</style>
