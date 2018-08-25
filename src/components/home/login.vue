<template>
  <transition name="slide">
    <f7-page no-toolbar no-navbar no-swipeback login-screen class="login">
      <f7-login-screen-title>请登录</f7-login-screen-title>
      <f7-list form>
        <f7-list-item>
          <f7-label>账号</f7-label>
          <f7-input type="text" placeholder="请输入账号" @input="username = $event.target.value"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>密码</f7-label>
          <f7-input type="password" placeholder="请输入密码" @input="password = $event.target.value"></f7-input>
        </f7-list-item>
      </f7-list>
      <f7-list>
        <f7-list-button @click="signIn">登录</f7-list-button>
        <f7-block-footer>万通钉钉营销管理平台</f7-block-footer>
      </f7-list>
    </f7-page>
  </transition>
</template>
<script>
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import EventBus from 'common/js/event-bus'
  import { f7Page, f7List, f7ListItem, f7Label, f7Input, f7ListButton, f7BlockFooter, f7LoginScreenTitle } from 'framework7-vue'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Label,
      f7Input,
      f7ListButton,
      f7BlockFooter,
      f7LoginScreenTitle
    },
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      signIn() {
        fetch('post', api.authLogin, {account: this.username, password: this.password}, this).then((res) => {
          console.log(res)
          EventBus.isNeedLogin = false
          this.$router.replace('home')
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, 100%, 0)
  .login
    z-index: 2
</style>
