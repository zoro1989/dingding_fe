<template>
  <f7-app id="app" :params="f7Params">
    <router-view></router-view>
  </f7-app>
</template>

<script>
  import { f7App } from 'framework7-vue'
  export default {
    components: {
      f7App
    },
    data() {
      return {
        f7Params: {
          theme: 'ios'
        }
      }
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
      z-index: 3!important
    .searchbar-backdrop
      z-index: 2!important
    .item-content
      padding: 0 15px!important
    .item-title-row, .item-after
      align-items: center!important
    .btn-save
      margin-right: 5px!important
    .btn-cancel
      margin-left: 5px!important
    .address-text
      height: 10px!important
      line-height: 10px!important
      overflow: hidden!important
      text-overflow: ellipsis!important
    .item-text
      max-height: none!important
    .smart-select
      .item-content
        padding-left: 0!important
      .item-after
        margin-left: 0!important
        color: #000
    .smart-select-popup
      .item-title
        white-space: normal!important
    .merchant-select, .goods-select
      .page-content
        padding-top: 88px!important
</style>
