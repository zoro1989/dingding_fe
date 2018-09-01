<template>
  <transition name="slide">
    <div class="lsmd-list">
      <f7-navbar>
        <!--<f7-nav-left back-link="返回" @back-click="goBack" :sliding="false">-->
        <!--</f7-nav-left>-->
        <f7-nav-title>连锁门店申请列表</f7-nav-title>
        <f7-nav-right>
          <f7-link @click="addApply">新增</f7-link>
        </f7-nav-right>
      </f7-navbar>
      <div class="lsmd">
        <cube-scroll @pulling-up="searchMore" :options="scrollOptions" :data="list">
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
                  <div class="item-after" @click="onView(item.id)">
                    <span>查看</span><i class="fa fa-angle-right text-color-gray"></i>
                  </div>
                </div>
                <div class="item-subtitle">
                  <span>店长：{{item.shopUser}}</span>
                  <span>店长电话：{{item.shopUserPhone}}</span>
                </div>
                <div class="item-text">连锁门店：{{item.shopAddr}}</div>
                <div class="item-text">店员数量：{{item.cooperationTime}}</div>
                <div class="item-text">上年度销售额：{{item.chairmanName}}</div>
                <div class="item-text" :class="auditStatusColor(item.auditStatus)">{{auditStatusDisp(item.auditStatus)}}</div>
              </div>
              <f7-swipeout-actions right>
                <f7-swipeout-button v-if="item.auditStatus === '1' || item.auditStatus === '2'" color="orange" @click="onEdit(item.id)">编辑</f7-swipeout-button>
                <f7-swipeout-button color="red" v-if="item.auditStatus === '1'" @click="onDelete(item.id)">删除</f7-swipeout-button>
                <f7-swipeout-button color="blue" v-if="item.auditStatus === '1' || item.auditStatus === '2'" @click="onAudit(item)">审批</f7-swipeout-button>
                <f7-swipeout-button color="green" v-if="item.auditStatus === '4'">结束</f7-swipeout-button>
                <f7-swipeout-button color="blue" v-if="item.auditStatus === '5'" @click="onUploadLocation(item.id)">同步位置</f7-swipeout-button>
              </f7-swipeout-actions>
            </f7-list-item>
          </f7-list>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>
<script>
  import { f7Navbar, f7NavTitle, f7Link, f7NavLeft, f7NavRight, f7Page, f7List, f7ListItem, f7SwipeoutActions, f7SwipeoutButton } from 'framework7-vue'
  import BMap from 'BMap'
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
        fetch('get', api.chainCustomInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
          console.log(res)
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
          return '确认结束流程'
        } else if (auditStatus === '5') {
          return '结束流程'
        }
      },
      onView(id) {
        this.$router.push({
            path: `/lsmd-view/${id}`
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
          fetch('delete', api.chainCustomInfo + id, {}, this).then((res) => {
            _this.list.splice(index, 1)
          })
        })
      },
      onEdit(id) {
        this.$router.push({
            path: `/lsmd/${id}`
          }
        )
      },
      addApply() {
        this.$router.push({
            path: `/lsmd/0`
          }
        )
      },
      onAudit(item) {
        const app = this.$f7
        let _this = this
        app.dialog.confirm('确定要审批吗?', '提示', function () {
          let params = {
            tableId: item.id,
            id: item.auditStatus === '2' ? item.auditId : undefined,
            auditStep: item.auditStep,
            auditResult: '1',
            auditStatus: item.auditStatus,
            auditType: 'chainCustom'
          }
          fetch('post', api.terminalAudit, params, _this).then((res) => {
            _this.pageNo = 1
            _this.initData()
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
        fetch('get', api.chainCustomInfo, {page: this.pageNo, limit: this.pageSize}, this).then((res) => {
          this.list = this.list.concat(res.data)
        })
      },

      onUploadLocation(id) {
        let _this = this
        let geolocation = new BMap.Geolocation()
        geolocation.getCurrentPosition(function(r) {
          if (this.getStatus() === 0) {
            // 以指定的经度与纬度创建一个坐标点
            let pt = new BMap.Point(r.point.lng, r.point.lat)
            // 创建一个地理位置解析器
            let geoc = new BMap.Geocoder()
            geoc.getLocation(pt, function(rs) {
              // 解析格式：城市，区县，街道
              let addComp = rs.addressComponents
              let shopAddr = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
              fetch('post', api.chainCustomUploadLocation + id, {shopAddr: shopAddr, longitude: pt.lng, latitude: pt.lat}, this).then((res) => {
                let toast = _this.$f7.toast.create({
                  text: '同步位置成功，地址：' + shopAddr,
                  position: 'center',
                  closeTimeout: 2000
                })
                toast.open()
                _this.pageNo = 1
                _this.initData()
              })
            })
          } else {
            let toast = this.$f7.toast.create({
              text: '定位失败',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
          }
        }, {enableHighAccuracy: true})
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .lsmd-list
    background: #fff!important
    position: absolute
    z-index: 2
    top: 0
    left: 0
    right: 0
    bottom: 0
    .lsmd
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
