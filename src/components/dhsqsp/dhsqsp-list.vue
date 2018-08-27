<template>
  <transition name="slide">
    <div class="dhsqsp-list">
      <f7-navbar>
        <!--<f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">-->
        <!--</f7-nav-left>-->
        <f7-nav-title>调货审批列表</f7-nav-title>
      </f7-navbar>
      <scroll class="dhsqsp" @scrollToEnd="searchMore" :pullup="pullup" :data="list">
        <f7-list media-list>
          <f7-list-item
            v-for="item in list"
            :key="item.id"
            @click="onAudit(item)"
          >
            <div slot="inner-start">
              <div class="item-title-row" slot="before-title">
                <div class="item-title">客商名称：{{item.merchants_name}}</div>
                <div class="item-after">
                  <span>查看</span><i class="fa fa-angle-right text-color-gray"></i>
                </div>
              </div>
              <div class="item-subtitle">门店名称：{{item.store_name}}</div>
              <div class="item-text">调货人名称：{{item.arrange_goods_name}}</div>
              <div class="item-text">调货人分公司：{{item.arrange_goods_office}}</div>
              <div class="item-text">调货人支公司：{{item.arrange_goods_branch_office}}</div>
              <div class="item-text">产品名称：{{item.goods_name}}</div>
              <div class="item-text" :class="auditStatusColor(item.audit_status)">{{item.audit_status}}</div>
            </div>
          </f7-list-item>
          <loading v-show="showLoading" title=""></loading>
        </f7-list>
      </scroll>
    </div>
  </transition>
</template>
<script>
  import { f7Navbar, f7NavTitle, f7Link, f7NavLeft, f7NavRight, f7Page, f7List, f7ListItem } from 'framework7-vue'
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
      fetch('get', api.arrangeGoodsInfoApprove, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
        console.log(res)
        this.list = res.data
        this.maxCount = res.count
        this.showLoading = false
      })
    },
    methods: {
      auditStatusColor(auditStatus) {
        if (auditStatus === '待审核') {
          return 'text-color-blue'
        } else if (auditStatus === '审核通过') {
          return 'text-color-green'
        } else if (auditStatus === '审核不通过') {
          return 'text-color-red'
        }
      },
      onAudit(item) {
        this.$router.push({
            path: `/dhsqsp/${item.id}/${item.audit_id}/${item.audit_step}/${item.audit_status}`
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
        if (this.list.length >= this.maxCount) {
          this.showLoading = false
          return
        }
        this.pageNo = this.pageNo + 1
        console.log(this.pageNo)
        fetch('get', api.arrangeGoodsInfoApprove, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
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
  .dhsqsp-list
    background: #fff!important
    position: fixed
    z-index: 2
    top: 0
    left: 0
    right: 0
    bottom: 0
    .dhsqsp
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
