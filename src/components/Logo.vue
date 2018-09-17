<template>
  <div id="logo">
    <img :src="logoUrl" alt="Logo">
  </div>
</template>

<script>
export default {
  data: () => ({
    logoUrl: 'https://dashboard.daocloud.io/assets/images/logo_dcs.svg'
  })
}
</script>

<style lang="scss" scoped>
#logo{
  height:60px;
  background-color:#25282d;
  line-height: 60px;
  img{
    width:160px;
    margin:0 auto;
    vertical-align:middle;
    border:0;
  }
}
</style>
