<template>
  <div class="container">
    <div class="bg"></div>
    <div class="logo">
      <img :src="logoImg" alt="daocloud">
    </div>
    <div>
      <signin></signin>
    </div>
    <div class="footer">footer</div>
  </div>
</template>
<script>
import signin from '@/components/signin'
export default {
  data: () => ({
    logoImg: 'https://daoweb-resource.daocloud.io/logo/daocloud-logo-gray-account.svg'
  }),
  components: {
    signin
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding:60px 0 74px 0;
  text-align: center;
  .bg{
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: url('https://cdn-daoaccount-prod.daocloud.io/static/img/blue-mountain.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    }
  .logo{
    margin-bottom: 30px;
    img{
      width: 150px;
      height: 56px;
    }
  }
  .login{

  }
  .footer{
    line-height: 1;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 44px;
    padding-bottom: 30px;
  }
}
</style>
