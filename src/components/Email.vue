<template>
<div class="setting">
  <div class="title-block">账户信息
    <p>您可以关联和修改您的邮件地址，并设置其中的一个为主邮箱。您的主邮箱将被用于登陆账户以及接收相关的邮件通知（例如，账户提醒和计费收据)</p>
  </div>
    <div class="setting-block">
      <div class="email"><span>zhenglun.xu@daocloud.io</span><span>主邮箱</span></div>
    </div>
    <div class="setting-block">
      <input type="text" placeholder="输入新邮箱"><button>添加</button>
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
    border-bottom: 0;
    div.email{
      padding-left:0;
      margin: 0;
      border: 1px solid #e4e7ed;
      align-items: center;
      width: 100%;
      height: 100%;
    }
  }
</style>
