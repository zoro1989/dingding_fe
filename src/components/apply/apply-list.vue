<template>
  <transition name="slide">
    <div class="apply-list">
      <f7-navbar>
        <!--<f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">-->
        <!--</f7-nav-left>-->
        <f7-nav-title>终端医疗申请列表</f7-nav-title>
        <f7-nav-right>
          <f7-link @click="addApply">新增</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <scroll class="apply" @scrollToEnd="searchMore" :pullup="pullup" :data="list">
        <f7-list media-list>
          <f7-list-item
            swipeout
            v-for="item in list"
            :key="item.id"
          >
            <div slot="inner-start">
              <div class="item-title-row" slot="before-title">
                <div class="item-title">{{item.shopName}}</div>
                <div class="item-subtitle margin-left text-color-gray">{{item.shopType}}</div>
                <div class="item-after">查看</div>
              </div>
              <div class="item-subtitle">{{item.shopUser}}</div>
              <div class="item-text">
                <div>{{item.shopAddr}}</div>
                <div class="text-color-blue">{{item.auditStatus}}</div>
              </div>
            </div>
            <f7-swipeout-actions right>
              <f7-swipeout-button color="orange" @click="onEdit(item.id)">编辑</f7-swipeout-button>
              <f7-swipeout-button color="red" @click="onDelete(item.id)">删除</f7-swipeout-button>
              <f7-swipeout-button color="blue">审批</f7-swipeout-button>
            </f7-swipeout-actions>
          </f7-list-item>
          <loading v-show="showLoading" title=""></loading>
        </f7-list>
      </scroll>
    </div>
  </transition>
</template>
<script>
  import { f7Navbar, f7NavTitle, f7Link, f7NavLeft, f7NavRight, f7Page, f7List, f7ListItem, f7SwipeoutActions, f7SwipeoutButton } from 'framework7-vue'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  export default {
    components: {
      f7Navbar,
      f7NavTitle,
      f7Link,
      f7NavLeft,
      f7NavRight,
      f7Page,
      f7List,
      f7ListItem,
      f7SwipeoutActions,
      f7SwipeoutButton,
      Scroll,
      Loading
    },
    data() {
      return {
        list: [],
        pageNo: 1,
        pageSize: 10,
        maxItems: 200,
        pullup: true,
        showLoading: true
      }
    },
    created() {
      fetch('get', api.terminalInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
        console.log(res)
        this.list = res.data
        this.showLoading = false
      })
    },
    methods: {
      onDelete(id) {
        const app = this.$f7
        let _this = this
        app.dialog.confirm('确定要删除吗?', '提示', function () {
          let index = _this.list.findIndex((item) => {
            return item.id === id
          })
          _this.list.splice(index, 1)
          fetch('delete', api.terminalInfo + id, {}, this).then((res) => {
            console.log(res)
          })
        })
      },
      onEdit(id) {
        this.$router.push({
            path: `/apply/${id}`
          }
        )
      },
      addApply() {
        this.$router.push({
            path: `/apply/0`
          }
        )
      },
      goBack() {
        this.$router.go(-1)
      },
      searchMore() {
        if (this.showLoading) {
          return
        }
        this.showLoading = true
        this.pageNo = this.pageNo + 1
        console.log(this.pageNo)
        fetch('get', api.terminalInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
          console.log(res)
          this.list = this.list.concat(res.data)
          this.showLoading = false
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .apply-list
    background: #fff!important
    position: fixed
    z-index: 2
    top: 0
    left: 0
    right: 0
    bottom: 0
    .apply
      background: #fff!important
      position: fixed
      top: 44px
      left: 0
      right: 0
      bottom: 0
      .list
        padding-bottom: 40px
</style>
