<template>
  <div>
    <div class="account-container">
      <h2>登陆 DaoCloud 账号</h2>
      <hr class="header-line">
      <div class="tips">{{tips}}</div>
      <form action="">
        <div class="form-group">
          <label>邮箱/用户名</label>
          <input name="username" v-focus @keyup.enter="enter()" ref="email" type="text" id="email" v-model="email">
        </div>
        <div class="form-group">
          <label>密码<a class="pull-right" href="https://account.daocloud.io/forget-password">忘记密码?</a></label>
          <input name="password" @keyup.enter="enter()" ref="password" type="password" id="password" v-model="password">
        </div>
        <div class="form-group">
          <label>验证码</label>
          <input @keyup.enter="enter()" ref="captcha" type="text" id="captcha" class="has-captcha" v-model="captcha">
          <el-tooltip class="item" effect="dark" content="看不清？点击更换" placement="top">
            <img @click="captchaText" class="captcha" :src="'https://api.daocloud.io/captcha/image?captcha_id='+captchaId" alt="验证码">
          </el-tooltip>
        </div>
      </form>
      <button ref="signin" @click="signinJudge()" class="signin">登陆</button>

    </div>
    <!-- <a class="change-page">还没有账户?<strong>立即注册</strong></a> -->
  </div>
</template>
<script>
export default {
  data: () => ({
    email: '',
    password: '',
    captcha: '',
    captchaId: '',
    tips: ''
  }),
  created () {
    this.captchaText()
  },
  methods: {
    signinJudge () {
      if (this.email && this.password && this.captcha) {
        this.signin()
      } else if (!this.email) {
        this.$refs.email.focus()
      } else if (!this.password) {
        this.$refs.password.focus()
      } else if (!this.captcha) {
        this.$refs.captcha.focus()
      }
    },
    enter () {
      if (event.target.id === 'email') {
        this.$refs.password.focus()
      } else if (event.target.id === 'password') {
        this.$refs.captcha.focus()
      } else if (event.target.id === 'captcha') {
        this.$refs.signin.click()
      }
    },
    signin () {
      this.axios.post('https://api.daocloud.io/access-token', {
        captcha_id: this.captchaId,
        captcha_solution: this.captcha,
        email_or_mobile: this.email,
        password: this.password
      }).then((value) => {
        var user = {
          access_token: value.access_token,
          expires_in: value.expires_in,
          uid: value.uid
        }
        this.$cookies.set('token', value.data.access_token)
        alert(this.$cookies.get('token'))
        // setTimeout(alert(this.$cookies.get('token')), 1000)
        // alert(this.$cookies.get('token'))
        sessionStorage.setItem('user', JSON.stringify(user))

        this.$router.push({path: '/BuildFlowsList/buildFlows'})
      }).catch(error => {
        console.log(error)
        console.log(error.response.data.error_id)
        if (error.response.data.error_id === 'login.password_not_match') {
          this.$refs.password.focus()
          this.tips = '密码错误'
        } else if (error.response.data.error_id === 'check_captcha_fail') {
          this.$refs.password.focus()
          this.tips = '验证码错误'
          this.password = ''
          this.captcha = ''
        } else if (error.response.data.error_id === 'login.user_not_found') {
          this.$refs.email.focus()
          this.tips = '用户名错误'
        }
      })
    },
    captchaText () {
      this.axios.get('https://api.daocloud.io/captcha/generate-id').then(e => {
        this.captchaId = e.data.captcha_id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
hr.header-line{
  width: 120px;
  height: 1px;
  margin: 6px auto 14px;
  border: 0;
  background-color: #e4e7ed;
}
.form-group a.pull-right{
  float: right;
}
.form-group input.has-captcha{
  width: calc(100% - 95px);
}
.form-group .captcha{
  float: right;
}
.form-group:last-child{
  text-align: left;
  margin-bottom: 30px;
}
</style>
<style lang="scss">
.account-container{
font-size: 14px;
position: relative;
width: 310px;
margin: 0 auto;
padding: 27px 20px 30px;
border-radius: 4px;
background-color: #fff;
box-shadow: 0 15px 30px 0 rgba(0,0,1,.1);
h2{
  font-size: 17px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
  padding: 0 20px;
  text-align: center;
  color: #595f69;
}
hr{
  display:block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 1px;
}
.captcha{
  display: inline-block;
  width: 85px;
  height: 32px;
  border-radius: 2px;
  border-color: black;
}
button.signin{
  height: 30px;
  width: 100%;
  padding: 8px 18px;
  line-height: 1px;
  border-radius: 4px;
  color: #fff;
  background-color: #3890ff;
  border-color: #217ef2;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 400;
}
}
.form-group{
  margin-bottom: 14px;
  label{
    font-size: 14px;
    font-weight :400;
    line-height: 24px;
    display: block;
    margin-bottom :5px;
    color: #9ba3af;
    text-align: left;
  }
  input{
    line-height: 1;
    width:100%;
    height: 32px;
    margin: 0;
    padding: 0 10px;
    text-align: left;
    border: 1px solid #ccd1d9;
    border-radius: 2px;
    outline: 0;
    box-shadow: none;
    overflow: hidden;
  }
  input:focus{
    border:1px solid #3890ff;
    box-shadow:0 0 0 2px rgba(56,144,255,.15)
  }
}
.change-page{
font-size: 14px;
display: block;
width: 310px;
margin: 30px auto 0;
padding: 16px;
text-align: center;
color: rgba(255,255,255,.9);
border: 1px solid rgba(255,255,255,.12);
border-radius: 4px;
background-color: rgba(255,255,255,.12);
text-shadow:0 1px 4px rgba(0,0,0,.1)
}
div.tips{
  color:red;
}
</style>
