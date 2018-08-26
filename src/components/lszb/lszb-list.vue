<template>
  <transition name="slide">
    <div class="lszb-list">
      <f7-navbar>
        <!--<f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">-->
        <!--</f7-nav-left>-->
        <f7-nav-title>连锁总部申请列表</f7-nav-title>
        <f7-nav-right>
          <f7-link @click="addApply">新增</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <scroll class="lszb" @scrollToEnd="searchMore" :pullup="pullup" :data="list">
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
                <div class="item-after" >
                  <span>查看</span><i class="fa fa-angle-right text-color-gray"></i>
                </div>
              </div>
              <div class="item-subtitle">董事长：{{item.shopUser}}</div>
              <div class="item-text">
                <div>药店地址：{{item.shopAddr}}</div>
                <div>合作时间：{{item.cooperationTime}}</div>
                <div>连锁门店数量：{{item.shopTotal}}</div>
                <div>直营店数量：{{item.directlyTotal}}</div>
                <div>加盟店数量：{{item.joinTotal}}</div>
                <div>连锁总部：{{item.mainShopAddr}}</div>
                <div>连锁仓库：{{item.chainWarehous}}</div>
                <div :class="auditStatusColor(item.auditStatus)">{{auditStatusDisp(item.auditStatus)}}</div>
              </div>
            </div>
            <f7-swipeout-actions right>
              <f7-swipeout-button v-if="item.auditStatus === '1' || item.auditStatus === '2'" color="orange" @click="onEdit(item.id)">编辑</f7-swipeout-button>
              <f7-swipeout-button color="red" v-if="item.auditStatus === '1'" @click="onDelete(item.id)">删除</f7-swipeout-button>
              <f7-swipeout-button color="blue" v-if="item.auditStatus === '1' || item.auditStatus === '2'">审批</f7-swipeout-button>
              <f7-swipeout-button color="blue" v-if="item.auditStatus === '4'">结束</f7-swipeout-button>
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
        showLoading: true,
        maxCount: 0
      }
    },
    created() {
      fetch('get', api.chaintotalInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
        console.log(res)
        this.list = res.data
        this.maxCount = res.count
        this.showLoading = false
      })
    },
    methods: {
      auditStatusColor(auditStatus) {
        if (auditStatus === '1') {
          return 'text-color-blue'
        } else if (auditStatus === '2') {
          return 'text-color-orange'
        } else if (auditStatus === '3') {
          return 'text-color-green'
        } else if (auditStatus === '4') {
          return 'text-color-yellow'
        } else if (auditStatus === '5') {
          return 'text-color-red'
        }
      },
      auditStatusDisp(auditStatus) {
        if (auditStatus === '1') {
          return '发起未提交'
        } else if (auditStatus === '2') {
          return '待审批(退回)'
        } else if (auditStatus === '3') {
          return '审核中'
        } else if (auditStatus === '4') {
          return '确认结束流程'
        } else if (auditStatus === '5') {
          return '结束流程'
        }
      },
      onDelete(id) {
        const app = this.$f7
        let _this = this
        app.dialog.confirm('确定要删除吗?', '提示', function () {
          let index = _this.list.findIndex((item) => {
            return item.id === id
          })
          _this.list.splice(index, 1)
          fetch('delete', api.chaintotalInfo + id, {}, this).then((res) => {
            console.log(res)
          })
        })
      },
      onEdit(id) {
        this.$router.push({
            path: `/lszb/${id}`
          }
        )
      },
      addApply() {
        this.$router.push({
            path: `/lszb/0`
          }
        )
      },
      onAudit(item) {
        const app = this.$f7
        let _this = this
        app.dialog.confirm('确定要审批吗?', '提示', function () {
          let params = {
            tableId: item.id,
            id: item.auditStatus === '2' ? item.auditId : '',
            auditStep: item.auditStep,
            auditResult: '1',
            auditType: 'chainTotal'
          }
          fetch('post', api.terminalAudit, params, _this).then((res) => {
            console.log(res)
          })
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      searchMore() {
        if (this.showLoading) {
          return
        }
        this.showLoading = true
        if (this.list.length >= this.maxCount) {
          this.showLoading = false
          return
        }
        this.pageNo = this.pageNo + 1
        console.log(this.pageNo)
        fetch('get', api.chaintotalInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
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
  .lszb-list
    background: #fff!important
    position: fixed
    z-index: 2
    top: 0
    left: 0
    right: 0
    bottom: 0
    .lszb
      background: #fff!important
      position: fixed
      top: 44px
      left: 0
      right: 0
      bottom: 0
      .list
        padding-bottom: 40px
        .item-after
          .fa
            padding-left: 5px
            font-size: 22px
            padding-bottom: 2px
</style>
