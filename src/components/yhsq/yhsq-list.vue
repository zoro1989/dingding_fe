<template>
  <transition name="slide">
    <div class="yhsq-list">
      <f7-navbar>
        <!--<f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">-->
        <!--</f7-nav-left>-->
        <f7-nav-title>要货申请列表</f7-nav-title>
        <f7-nav-right>
          <f7-link @click="addApply">新增</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <div class="yhsq">
        <cube-scroll @pulling-up="searchMore" :options="scrollOptions" :data="list">
          <f7-list media-list>
            <f7-list-item
              swipeout
              v-for="item in list"
              :key="item.id"
            >
              <div slot="inner-start">
                <div class="item-title-row" slot="before-title">
                  <div class="item-title">客商名称：{{item.merchantsName}}</div>
                  <div class="item-after" @click="onView(item)">
                    <span>查看</span><i class="fa fa-angle-right text-color-gray"></i>
                  </div>
                </div>
                <!--<div class="item-subtitle">产品名称：{{item.goodsName}}</div>-->
                <div class="item-subtitle">要货人名称：{{item.requireGoodsName}}</div>
                <div class="item-text">要货人分公司：{{item.requireGoodsOffice}}</div>
                <div class="item-text">要货人支公司：{{item.requireGoodsBranchOffice}}</div>
                <div class="item-text" :class="auditStatusColor(item.auditStatus)">{{auditStatusDisp(item.auditStatus)}}</div>
              </div>
              <f7-swipeout-actions right>
                <f7-swipeout-button v-if="item.auditStatus === '1' || item.auditStatus === '2'" color="orange" @click="onEdit(item)">编辑</f7-swipeout-button>
                <f7-swipeout-button color="red" v-if="item.auditStatus === '1'" @click="onDelete(item.id)">删除</f7-swipeout-button>
                <f7-swipeout-button color="blue" v-if="item.auditStatus === '1' || item.auditStatus === '2'" @click="onAudit(item, '提交')">审批</f7-swipeout-button>
                <f7-swipeout-button color="blue" v-if="item.auditStatus === '4'" @click="onAudit(item, '结束')">结束</f7-swipeout-button>
              </f7-swipeout-actions>
            </f7-list-item>
          </f7-list>
        </cube-scroll>
      </div>
      <audituser-select-list v-if="auditUsers.length > 0" :list="auditUsers" ref="auditUsers" @onSelectItem="selectAuditUser" @searchMore="searchMoreAuditUser"></audituser-select-list>
    </div>
  </transition>
</template>
<script>
  import { f7Navbar, f7NavTitle, f7Link, f7NavLeft, f7NavRight, f7Page, f7List, f7ListItem, f7SwipeoutActions, f7SwipeoutButton } from 'framework7-vue'
  import AudituserSelectList from 'base/audituser-select-list/audituser-select-list'
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
      AudituserSelectList
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
        maxCount: 0,
        auditUsers: [],
        maxAuditUsersCount: 0,
        pageNoAuditUser: 1,
        auditParam: null
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        fetch('get', api.requireGoodsInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
          this.list = res.data
          this.maxCount = res.count
        })
      },
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
          return '确认收货'
        } else if (auditStatus === '5') {
          return '结束流程'
        }
      },
      onView(item) {
        this.$router.push({
            path: `/yhsq-view/${item.id}/${item.formType}`
          }
        )
      },
      onDelete(id) {
        const app = this.$f7
        let _this = this
        app.dialog.confirm('确定要删除吗?', '提示', function () {
          let index = _this.list.findIndex((item) => {
            return item.id === id
          })
          fetch('delete', api.requireGoodsInfo + id, {}, this).then((res) => {
            _this.list.splice(index, 1)
          })
        })
      },
      onEdit(item) {
        this.$router.push({
            path: `/yhsq/${item.id}/${item.formType}`
          }
        )
      },
      addApply() {
        this.$router.push({
            path: `/yhsq/0/1`
          }
        )
      },
      selectAuditUser(item) {
        if (this.auditParam !== null) {
          this.auditParam.auditUserId = item.auditUserId
          this.auditParam.auditUserName = item.auditUserName
          const app = this.$f7
          let _this = this
          app.dialog.confirm('您下一步是否要提交到开票员' + item.auditUserName + '审批吗?', '提示', function () {
            fetch('post', api.terminalAudit, _this.auditParam, _this).then((res) => {
              _this.pageNo = 1
              _this.initData()
            })
          })
        }
      },
      searchMoreAuditUser() {
        if (this.auditUsers.length >= this.maxAuditUsersCount) {
          return
        }
        this.pageNoAuditUser++
        fetch('get', api.findNextApproveUserByOpenPage, {page: this.pageNoAuditUser, limit: this.pageSize}, this).then((res) => {
          this.auditUsers = this.auditUsers.concat(res.data)
        })
      },
      onAudit(item, txt) {
        const app = this.$f7
        let _this = this
        app.dialog.confirm('确定要' + txt + '审批吗?', '提示', function () {
          fetch('get', api.checkNextApproveUserExist, {auditStep: item.auditStep, tableId: item.id, auditType: 'requireGoods'}, this).then((res) => {
            let params = {
              tableId: item.id,
              id: item.auditStatus === '2' ? item.auditId : undefined,
              auditStep: item.auditStep,
              auditResult: '1',
              auditStatus: item.auditStatus,
              auditType: 'requireGoods'
            }
            _this.auditParam = params
            let existUser = res.data.existUser
            let trustUserId = res.data.trustUserId
            if (existUser === '2') {
              fetch('get', api.findNextApproveUserByOpenPage, {page: _this.pageNoAuditUser, limit: _this.pageSize, auditUserId: trustUserId}, _this).then((res) => {
                _this.auditUsers = res.data
                _this.maxAuditUsersCount = res.count
                if (_this.auditUsers.length > 0) {
                  _this.$nextTick(() => {
                    _this.$refs.auditUsers.show()
                  })
                } else {
                  let toast = _this.$f7.toast.create({
                    text: '没有检索到下级审批人数据！',
                    position: 'center',
                    closeTimeout: 2000
                  })
                  toast.open()
                }
              })
            } else {
              fetch('post', api.terminalAudit, params, _this).then((res) => {
                _this.pageNo = 1
                _this.initData()
              })
            }
          })
        })
      },
      goBack() {
        this.$router.go(-1)
      },
      searchMore() {
        if (this.list.length >= this.maxCount) {
          return
        }
        this.pageNo++
        fetch('get', api.requireGoodsInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
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
  .yhsq-list
    background: #fff!important
    position: absolute
    z-index: 2
    top: 0
    left: 0
    right: 0
    bottom: 0
    .yhsq
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
