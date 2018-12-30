<template>
  <div class="home">
    <f7-navbar>
      <f7-nav-title>万通营销</f7-nav-title>
      <!--<f7-nav-right>-->
        <!--<f7-link @click="logout">退出</f7-link>-->
      <!--</f7-nav-right>-->
    </f7-navbar>
    <div class="wrapper">
      <div class="toolbar tabbar">
        <div class="toolbar-inner">
          <a href="#tab-1" class="tab-link tab-link-active">
            <i class="fa fa-home" style="font-size: 22px"></i><span style="font-size: 12px">首页</span>
          </a>
          <a href="#tab-2" class="tab-link">
            <i class="fa fa-handshake-o" style="font-size: 22px">
              <span v-if="isTab1" class="badge color-red"></span>
            </i>
            <span style="font-size: 12px">客商管理</span>
          </a>
          <a href="#tab-3" class="tab-link">
            <i class="fa fa-dollar" style="font-size: 22px">
              <span v-if="isTab2" class="badge color-red"></span>
            </i>
            <span style="font-size: 12px">销售管理</span>
          </a>
        </div>
      </div>
      <div class="tabs-animated-wrap">
        <div class="tabs">
          <div id="tab-1" class="page-content tab tab-active">
            <div class="list-group-title">
              <span><i class="fa fa-bell" style="font-size: 14px; color: #E6A23C; padding-right: 3px;"></i>通知公告</span>
              <span @click="OnClick('tzgg-list')">more>></span>
            </div>
            <div class="no-box" v-if="list1.length === 0">
              <div>
                <img class="no-msg" width="50" :src="NoMessage">
                <div class="no-msg-text">暂无通知</div>
              </div>
            </div>
            <f7-list v-if="list1.length !== 0" media-list class="content-list">
              <f7-list-item
                v-for="item in list1"
                :key="item.id"
                @click="onAudit1(item)"
              >
                <div slot="inner-start">
                  <div class="item-title-row" slot="before-title">
                    <div class="item-title">{{item.title}}</div>
                    <div class="item-after">
                      <span>查看</span><i class="fa fa-angle-right text-color-gray"></i>
                    </div>
                  </div>
                  <div class="item-subtitle">{{item.createTime}}</div>
                </div>
              </f7-list-item>
            </f7-list>
            <div class="list-group-title">
              <span><i class="fa fa-commenting" style="font-size: 14px; color: #4cd964; padding-right: 3px;"></i>我的消息</span>
              <span @click="OnClick('wdxx-list')">more>></span>
            </div>
            <div class="no-box" v-if="list2.length === 0">
              <div>
                <img class="no-msg" width="50" :src="NoMessage">
                <div class="no-msg-text">暂无消息</div>
              </div>
            </div>
            <f7-list v-if="list2.length !== 0" media-list class="content-list">
              <f7-list-item
                v-for="item in list2"
                :key="item.id"
                @click="onAudit2(item)"
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
          </div>
          <div id="tab-2" class="page-content tab">
            <div class="list-group-title">我的申请</div>
            <div class="block">
              <div class="row">
                <div class="link-box">
                  <f7-button fill class="button-link" @click="OnClick('apply-list')">
                    <i class="fa fa-address-card-o"></i>
                  </f7-button>
                  <span>终端医疗</span>
                </div>
                <div class="link-box">
                  <f7-button fill class="button-link" @click="OnClick('lszb-list')">
                    <i class="fa fa-institution"></i>
                  </f7-button>
                  <span>连锁总部</span>
                </div>
                <div class="link-box">
                  <f7-button fill class="button-link" @click="OnClick('lsmd-list')">
                    <i class="fa fa-object-group"></i>
                  </f7-button>
                  <span>连锁门店</span>
                </div>
              </div>
            </div>
            <div class="list-group-title">我的审批</div>
            <div class="block">
              <div class="row">
                <div class="link-box">
                  <f7-button color="green" fill class="button-link" @click="OnClick('zdylsp-list')">
                    <span v-if="isHasZdylsp && merchantTerminalUnApproveCount > 0" class="badge color-red">{{merchantTerminalUnApproveCount}}</span>
                    <i class="fa fa-pencil"></i>
                  </f7-button>
                  <span>终端医疗</span>
                </div>
                <div class="link-box">
                  <f7-button color="green" fill class="button-link" @click="OnClick('lszbsp-list')">
                    <span v-if="isHasLszbsp && chainTotalUnApproveCount > 0" class="badge color-red">{{chainTotalUnApproveCount}}</span>
                    <i class="fa fa-share-alt"></i>
                  </f7-button>
                  <span>连锁总部</span>
                </div>
                <div class="link-box">
                  <f7-button color="green" fill class="button-link" @click="OnClick('lsmdsp-list')">
                    <span v-if="isHasLsmdsp && chainCustomUnApproveCount > 0" class="badge color-red">{{chainCustomUnApproveCount}}</span>
                    <i class="fa fa-gift"></i>
                  </f7-button>
                  <span>连锁门店</span>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-3" class="page-content tab">
            <div class="list-group-title">我的申请</div>
            <div class="block">
              <div class="row">
                <div class="link-box">
                  <f7-button fill class="button-link" @click="OnClick('yhsq-list')">
                    <i class="fa fa-cubes"></i>
                  </f7-button>
                  <span>要货申请</span>
                </div>
                <div class="link-box">
                  <f7-button fill class="button-link" @click="OnClick('dhsq-list')">
                    <i class="fa fa-truck"></i>
                  </f7-button>
                  <span>调货申请</span>
                </div>
                <div class="link-box">
                  <f7-button fill class="button-link" @click="OnClick('thsq-list')">
                    <i class="fa fa-trash-o"></i>
                  </f7-button>
                  <span>退货申请</span>
                </div>
              </div>
            </div>
            <div class="list-group-title">我的审批</div>
            <div class="block">
              <div class="row">
                <div class="link-box">
                  <f7-button color="green" fill class="button-link" @click="OnClick('yhsqsp-list')">
                    <span v-if="isHasYhsp && requireGoodsUnApproveCount > 0" class="badge color-red">{{requireGoodsUnApproveCount}}</span>
                    <i class="fa fa-cubes"></i>
                  </f7-button>
                  <span>要货审批</span>
                </div>
                <div class="link-box">
                  <f7-button color="green" fill class="button-link" @click="OnClick('dhsqsp-list')">
                    <span v-if="isHasDhsp && arrangeGoodsUnApproveCount > 0" class="badge color-red">{{arrangeGoodsUnApproveCount}}</span>
                    <i class="fa fa-truck"></i>
                  </f7-button>
                  <span>调货审批</span>
                </div>
                <div class="link-box">
                  <f7-button color="green" fill class="button-link" @click="OnClick('thsqsp-list')">
                    <span v-if="isHasThsp && returnGoodsUnApproveCount > 0" class="badge color-red">{{returnGoodsUnApproveCount}}</span>
                    <i class="fa fa-trash-o"></i>
                  </f7-button>
                  <span>退货审批</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import * as dd from 'dingtalk-jsapi'
  import { f7Navbar, f7BlockTitle, f7Button, f7Page, f7List, f7ListItem, f7NavRight, f7Link, f7NavTitle } from 'framework7-vue'
  import EventBus from 'common/js/event-bus'
  import NoMessage from './no-message.png'
  import Cookies from 'js-cookie'
  export default {
    components: {
      f7Navbar,
      f7BlockTitle,
      f7Button,
      f7Page,
      f7List,
      f7ListItem,
      f7NavRight,
      f7Link,
      f7NavTitle
    },
    computed: {
      isTab1() {
        let ret = 0
        if (this.isHasZdylsp) {
          ret += this.merchantTerminalUnApproveCount
        }
        if (this.isHasLszbsp) {
          ret += this.chainTotalUnApproveCount
        }
        if (this.isHasLsmdsp) {
          ret += this.chainCustomUnApproveCount
        }
        return ret > 0
      },
      isTab2() {
        let ret = 0
        if (this.isHasYhsp) {
          ret += this.requireGoodsUnApproveCount
        }
        if (this.isHasDhsp) {
          ret += this.arrangeGoodsUnApproveCount
        }
        if (this.isHasThsp) {
          ret += this.returnGoodsUnApproveCount
        }
        return ret > 0
      },
      isHasKsgl() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0ji3z9knz0000482qc50'
        })
        return index >= 0
      },
      isHasYhgl() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0ji3z96n300003zpyc2h'
        })
        return index >= 0
      },
      isHasDhgl() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jibje2w3000011a4lqs'
        })
        return index >= 0
      },
      isHasThgl() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jibc0ggf0000116frlr'
        })
        return index >= 0
      },
      isHasZdylsq() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jk7pgdqa000011pi3cv'
        })
        return index >= 0
      },
      isHasLszbsq() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jk7pm6k7000011t9q6j'
        })
        return index >= 0
      },
      isHasLsmdsq() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jk7pmt6i000021uu5t2'
        })
        return index >= 0
      },
      isHasZdylsp() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jk7pnsco000011xwbro'
        })
        return index >= 0
      },
      isHasLszbsp() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jk7prp8t000011i4c67'
        })
        return index >= 0
      },
      isHasLsmdsp() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jk7psfq300001hj9faf'
        })
        return index >= 0
      },
      isHasYhsq() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jkasigwb000011inick'
        })
        return index >= 0
      },
      isHasYhsp() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jkasj7zb000011fseg8'
        })
        return index >= 0
      },
      isHasDhsq() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jkaskf1d000011q3g7e'
        })
        return index >= 0
      },
      isHasDhsp() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jkaskrs500002bicwf7'
        })
        return index >= 0
      },
      isHasThsq() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jkaslcc90000413c4v2'
        })
        return index >= 0
      },
      isHasThsp() {
        let index = this.authData.findIndex((item) => {
          return item.id === '0jkaslny4000011g8mws'
        })
        return index >= 0
      }
    },
    data() {
      return {
        NoMessage,
        authData: [],
        list1: [],
        list2: [],
        merchantTerminalUnApproveCount: 0,
        chainTotalUnApproveCount: 0,
        chainCustomUnApproveCount: 0,
        requireGoodsUnApproveCount: 0,
        arrangeGoodsUnApproveCount: 0,
        returnGoodsUnApproveCount: 0
      }
    },
    created() {
      fetch('get', api.selfFunc, {}, this).then((res) => {
        console.log(res.data)
        this.authData = res.data
      })
      if (EventBus.isNeedLogin) {
        let _this = this
        dd.ready(function() {
          dd.runtime.permission.requestAuthCode({
            // 新
//            corpId: 'dingabd6050b5675cc3035c2f4657eb6378f',
            // 旧
            corpId: 'ding9cb5b465af827a4935c2f4657eb6378f',
            onSuccess: function(result) {
              console.log(result)
              fetch('post', api.dingtalkAuth, {code: result.code}, this).then((res) => {
                console.log(res)
              }).catch(() => {
                EventBus.isNeedLogin = true
                _this.$router.replace('/login')
              })
            },
            onFail: function (err) {
              console.log(err)
              EventBus.isNeedLogin = true
              _this.$router.replace('/login')
            }
          }).catch(() => {
            console.log('不在钉钉环境内')
            EventBus.isNeedLogin = true
            _this.$router.replace('/login')
          })
        })
      }
    },
    mounted() {
      fetch('get', api.noticeInfoList, {page: 1, limit: 10}, this).then((res) => {
        this.list1 = res.data
      })
      fetch('get', api.msgList, {page: 1, limit: 10, top: 1}, this).then((res) => {
        this.list2 = res.data
      })
      fetch('get', api.findMerchantTerminalUnApproveCount, {}, this).then((res) => {
        this.merchantTerminalUnApproveCount = res.data
      })
      fetch('get', api.findChainTotalUnApproveCount, {}, this).then((res) => {
        this.chainTotalUnApproveCount = res.data
      })
      fetch('get', api.findChainCustomUnApproveCount, {}, this).then((res) => {
        this.chainCustomUnApproveCount = res.data
      })
      fetch('get', api.findRequireGoodsUnApproveCount, {}, this).then((res) => {
        this.requireGoodsUnApproveCount = res.data
      })
      fetch('get', api.findArrangeGoodsUnApproveCount, {}, this).then((res) => {
        this.arrangeGoodsUnApproveCount = res.data
      })
      fetch('get', api.findReturnGoodsUnApproveCount, {}, this).then((res) => {
        this.returnGoodsUnApproveCount = res.data
      })
    },
    methods: {
      OnClick(link) {
        if (link === 'apply-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jk7pgdqa000011pi3cv'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'lszb-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jk7pm6k7000011t9q6j'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'lsmd-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jk7pmt6i000021uu5t2'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'zdylsp-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jk7pnsco000011xwbro'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'lszbsp-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jk7prp8t000011i4c67'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'lsmdsp-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jk7psfq300001hj9faf'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'yhsq-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jkasigwb000011inick'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'yhsqsp-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jkasj7zb000011fseg8'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'dhsq-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jkaskf1d000011q3g7e'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'dhsqsp-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jkaskrs500002bicwf7'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'thsq-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jkaslcc90000413c4v2'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        } else if (link === 'thsqsp-list') {
          let index = this.authData.findIndex((item) => {
            return item.id === '0jkaslny4000011g8mws'
          })
          if (index < 0) {
            let toast = this.$f7.toast.create({
              text: '您无权使用该功能！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            return
          }
        }
        this.$router.push(link)
      },
      onAudit1(item) {
        this.$router.push({
            path: `/tzgg/${item.id}`
          }
        )
      },
      onAudit2(item) {
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
      logout() {
        Cookies.remove('token')
        Cookies.remove('token-test')
        this.$router.replace('/login')
      }
    }
  }
</script>
<style scoped lang="stylus">
  .home
    background: #fff!important
    position: absolute
    z-index: 2
    top: 0
    left: 0
    right: 0
    bottom: 0
    .wrapper
      position: absolute
      top: 44px
      left: 0
      right: 0
      bottom: 0
      background: #fff
      z-index: 1
      overflow: scroll
      -webkit-overflow-scrolling: touch
    .no-box
      height: 200px
      text-align: center
      width: 100%
      display: flex
      align-items: center
      justify-content: center
      .no-msg-text
        font-size: 12px
        color: #7d7e80
    .toolbar
      position: absolute
      .fa
        position: relative
        .badge
          height: 10px
          padding: 0 5px
          position: absolute
          right: -15px
          top: -2px
    .content-list
      min-height: 200px
    .list-group-title
      display: flex
      justify-content: space-between
    .page-content
      padding-top: 0!important
    .fa
      font-size: 20px
    .link-box
      display: flex
      width: 25%
      flex-direction: column
      align-items: center
      margin: 0 10px
      .button-link
        overflow: inherit
        .badge
          position: absolute
          right: -8px
          top: -8px
    .button-link
      width: 50px!important
      height: 50px!important
      line-height: 50px!important
      margin: 10px!important
</style>
