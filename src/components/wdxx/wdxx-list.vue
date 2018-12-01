<template>
  <transition name="slide">
    <div class="zdylsp-list">
      <f7-navbar>
        <!--<f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">-->
        <!--</f7-nav-left>-->
        <f7-nav-title>我的消息列表</f7-nav-title>
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
                  <div class="item-title">{{item.title || item.content}}</div>
                  <div class="item-after" v-if="item.type !== '生日提醒'">
                    <span>查看</span><i class="fa fa-angle-right text-color-gray"></i>
                  </div>
                </div>
                <div class="item-subtitle">{{item.type}}</div>
                <div class="item-subtitle">{{item.name}}</div>
                <div class="item-text">{{item.auditDate}}</div>
                <div class="item-text" :class="auditStatusColor(item.audit_status)">{{auditStatusDisp(item.audit_status)}}</div>
              </div>
            </f7-list-item>
          </f7-list>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>
<script>
  import { f7Navbar, f7NavTitle, f7Link, f7NavLeft, f7NavRight, f7Page, f7List, f7ListItem } from 'framework7-vue'
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
      f7ListItem
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
      fetch('get', api.msgList, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
        this.list = res.data
        this.maxCount = res.count
      })
    },
    methods: {
      auditStatusColor(auditStatus) {
        if (auditStatus === 'no') {
          return 'text-color-red'
        } else if (auditStatus === 'yes') {
          return 'text-color-green'
        } else if (auditStatus === 'wait') {
          return 'text-color-blue'
        }
      },
      auditStatusDisp(auditStatus) {
        if (auditStatus === 'no') {
          return '审核不通过'
        } else if (auditStatus === 'yes') {
          return '审核通过'
        } else if (auditStatus === 'wait') {
          return '待审核'
        }
      },
      onAudit(item) {
        if (item.type !== '生日提醒') {
          switch (item.auditType) {
            case 'merchantTerminal':
              this.$router.push({
                  path: `/zdylsp/${item.tableId}/${item.audit_id}/${item.audit_step}/${item.audit_status}`
                }
              )
              break
            case 'chainTotal':
              this.$router.push({
                  path: `/lszbsp/${item.tableId}/${item.audit_id}/${item.audit_step}/${item.audit_status}`
                }
              )
              break
            case 'chainCustom':
              this.$router.push({
                  path: `/lsmdsp/${item.tableId}/${item.audit_id}/${item.audit_step}/${item.audit_status}`
                }
              )
              break
            case 'requireGoods':
              this.$router.push({
                  path: `/yhsqsp/${item.tableId}/${item.audit_id}/${item.audit_step}/${item.audit_status}/${item.formType}`
                }
              )
              break
            case 'arrangeGoods':
              this.$router.push({
                  path: `/dhsqsp/${item.tableId}/${item.audit_id}/${item.audit_step}/${item.audit_status}/${item.formType}`
                }
              )
              break
            case 'returnGoods':
              this.$router.push({
                  path: `/thsqsp/${item.tableId}/${item.audit_id}/${item.audit_step}/${item.audit_status}/${item.formType}`
                }
              )
              break
          }
        }
      },
      goBack() {
        this.$router.go(-1)
      },
      searchMore() {
        if (this.list.length >= this.maxCount) {
          return
        }
        this.pageNo++
        fetch('get', api.msgList, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
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
