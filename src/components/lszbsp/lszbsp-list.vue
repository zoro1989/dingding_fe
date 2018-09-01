<template>
  <transition name="slide">
    <div class="zdylsp-list">
      <f7-navbar>
        <!--<f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">-->
        <!--</f7-nav-left>-->
        <f7-nav-title>连锁总部审批列表</f7-nav-title>
      </f7-navbar>
      <div class="zdylsp">
        <cube-scroll @pulling-up="searchMore" :options="scrollOptions" :data="list">
          <f7-list media-list>
            <f7-list-item
              v-for="item in list"
              :key="item.id"
              @click="onAudit(item)"
            >
              <div slot="inner-start">
                <div class="item-title-row" slot="before-title">
                  <div class="item-title">{{item.shopName}}</div>
                  <div class="item-subtitle margin-left text-color-gray">{{item.shopType}}</div>
                  <div class="item-after">
                    <span>查看</span><i class="fa fa-angle-right text-color-gray"></i>
                  </div>
                </div>
                <div class="item-subtitle">药店地址：{{item.shopAddr}}</div>
                <div class="item-text">董事长：{{item.chairmanName}}</div>
                <div class="item-text">合作时间：{{item.cooperationTime}}</div>
                <div class="item-text">连锁门店数量：{{item.shopTotal}}</div>
                <div class="item-text">直营店数量：{{item.directlyTotal}}</div>
                <div class="item-text">加盟店数量：{{item.joinTotal}}</div>
                <div class="item-text">连锁总部：{{item.mainShopAddr}}</div>
                <div class="item-text">连锁仓库：{{item.chainWarehous}}</div>
                <div class="item-text" :class="auditStatusColor(item.audit_status)">{{item.audit_status}}</div>
              </div>
            </f7-list-item>
          </f7-list>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>
<script>
  import { f7Navbar, f7NavTitle, f7Link, f7NavLeft, f7NavRight, f7Page, f7List, f7ListItem, f7SwipeoutActions, f7SwipeoutButton } from 'framework7-vue'
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
      f7SwipeoutButton
    },
    data() {
      return {
        list: [],
        pageNo: 1,
        pageSize: 10,
        maxItems: 200,
        scrollOptions: {
          pullUpLoad: {
            threshold: 0,
            txt: ''
          }
        },
        maxCount: 0
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        this.pageNo = 1
        fetch('get', api.chaintotalInfoApprove, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
          this.list = res.data
          this.maxCount = res.count
        })
      },
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
            path: `/lszbsp/${item.id}/${item.audit_id}/${item.audit_step}/${item.audit_status}`
          }
        )
      },
      goBack() {
        this.$router.go(-1)
      },
      searchMore() {
        if (this.list.length >= this.maxCount) {
          return
        }
        this.pageNo++
        fetch('get', api.chaintotalInfoApprove, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
          this.list = this.list.concat(res.data)
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
  .zdylsp-list
    background: #fff!important
    position: absolute
    z-index: 2
    top: 0
    left: 0
    right: 0
    bottom: 0
    .zdylsp
      height: 100%
      width: 100%
      transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
      position: absolute
      top: 44px
      bottom: 0
      overflow: hidden
      .list
        .item-after
          .fa
            padding-left: 5px
            font-size: 22px
            padding-bottom: 2px
</style>
