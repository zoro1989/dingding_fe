<template>
  <transition name="slide">
    <f7-page v-if="isShow" class="goods-select">
      <f7-navbar>
        <f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">
        </f7-nav-left>
        <f7-nav-title>{{title}}</f7-nav-title>
        <f7-nav-right>
          <f7-link ></f7-link>
        </f7-nav-right>
        <f7-subnavbar :inner="false">
          <f7-searchbar
            placeholder="请输入"
            disable-button-text="取消"
            search-container=".search-list"
            search-in=".item-title"
          ></f7-searchbar>
        </f7-subnavbar>
      </f7-navbar>
      <f7-list class="searchbar-not-found">
        <f7-list-item title="未找到数据"></f7-list-item>
      </f7-list>
      <f7-list media-list class="search-list searchbar-found">
        <f7-list-item @click="onSelectGoods(item)"
                      v-for="(item, index) in list" :key="index" :title="item">
        </f7-list-item>
      </f7-list>
    </f7-page>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Searchbar, f7Navbar, f7NavRight, f7NavLeft, f7NavTitle, f7Link, f7Subnavbar } from 'framework7-vue'
  import Scroll from 'base/scroll/scroll'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      Scroll,
      f7Searchbar,
      f7Navbar,
      f7Subnavbar,
      f7NavRight,
      f7NavLeft,
      f7NavTitle,
      f7Link
    },
    props: {
      title: {
        type: String,
        default: '列表检索'
      },
      list: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    mounted() {
    },
    methods: {
      onSelectGoods(item) {
        this.$emit('selectedItem', item)
        this.hide()
      },
      goBack() {
        this.hide()
      },
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, 100%, 0)
  .goods-select
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 2
</style>
