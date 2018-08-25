<template>
  <f7-app id="app">
    <router-view></router-view>
  </f7-app>
</template>

<script>
  import { f7App } from 'framework7-vue'
  export default {
    components: {
      f7App
    }
  }
</script>

<style lang="stylus">
  #app
    .row
      justify-content: flex-start
    .list
      margin: 0!important
    .navbar
      z-index: 2!important
    .item-content
      padding: 0 15px!important
    .item-title-row
      align-items: center
    .btn-save
      margin-right: 5px!important
    .btn-cancel
      margin-left: 5px!important
    .address-text
      height: 10px!important
      line-height: 10px!important
      overflow: hidden!important
      text-overflow: ellipsis!important
</style>
