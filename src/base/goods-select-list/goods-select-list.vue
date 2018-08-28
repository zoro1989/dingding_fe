<template>
  <transition name="slide">
    <div v-if="isShow" class="goods-select">
      <f7-navbar>
        <f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">
        </f7-nav-left>
        <f7-nav-title>搜索商品</f7-nav-title>
        <f7-nav-right>
          <f7-link ></f7-link>
        </f7-nav-right>
      </f7-navbar>
      <f7-searchbar
        placeholder="搜索商品"
        disable-button-text="取消"
        search-container=".search-list"
        search-in=".item-title"
      ></f7-searchbar>
      <f7-list class="searchbar-not-found">
        <f7-list-item title="未找到数据"></f7-list-item>
      </f7-list>
      <div class="scroll-wrapper-box">
        <cube-scroll @pulling-up="searchMore" :options="scrollOptions" :data="list">
          <f7-list media-list class="search-list searchbar-found">
            <f7-list-item @click="onSelectGoods(item)"
                          v-for="(item, index) in list" :key="index" :title="item.goods_name" :subtitle="item.goods_spec">
            </f7-list-item>
          </f7-list>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Searchbar, f7Navbar, f7NavRight, f7NavLeft, f7NavTitle, f7Link, f7Subnavbar } from 'framework7-vue'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
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
        isShow: false,
        scrollOptions: {
          pullUpLoad: {
            threshold: 0,
            txt: ''
          }
        }
      }
    },
    mounted() {
    },
    methods: {
      onSelectGoods(item) {
        this.$emit('selectGoods', item)
        this.hide()
      },
      searchMore() {
        this.$emit('searchMore')
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
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 2
    .scroll-wrapper-box
      height: 100%
      width: 100%
      transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
      position: absolute
      top: 88px
      bottom: 0
      overflow: hidden
</style>
