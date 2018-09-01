<template>
  <div class="home">
    <f7-navbar title="万通营销" class="header-bar"></f7-navbar>
    <div class="wrapper">
      <div class="list-group-title">消息公告</div>
      <div class="block">
        <div class="row">
          <div class="link-box">
            <f7-button fill color="orange" class="button-link" @click="OnClick('tzgg-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>通知公告</span>
          </div>
          <div class="link-box">
            <f7-button fill color="pink" class="button-link" @click="OnClick('wdxx-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>我的消息</span>
          </div>
        </div>
      </div>
      <div class="list-group-title" v-if="isHasKsgl">客商管理</div>
      <div class="block" v-if="isHasKsgl">
        <div class="row">
          <div class="link-box" v-if="isHasZdylsq">
            <f7-button fill class="button-link" @click="OnClick('apply-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>终端医疗申请</span>
          </div>
          <div class="link-box" v-if="isHasLszbsq">
            <f7-button fill class="button-link" @click="OnClick('lszb-list')">
              <i class="fa fa-institution"></i>
            </f7-button>
            <span>连锁总部申请</span>
          </div>
          <div class="link-box" v-if="isHasLsmdsq">
            <f7-button fill class="button-link" @click="OnClick('lsmd-list')">
              <i class="fa fa-object-group"></i>
            </f7-button>
            <span>连锁门店申请</span>
          </div>
          <div class="link-box" v-if="isHasZdylsp">
            <f7-button color="green" fill class="button-link" @click="OnClick('zdylsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>终端医疗审批</span>
          </div>
          <div class="link-box" v-if="isHasLszbsp">
            <f7-button color="green" fill class="button-link" @click="OnClick('lszbsp-list')">
              <i class="fa fa-share-alt"></i>
            </f7-button>
            <span>连锁总部审批</span>
          </div>
          <div class="link-box" v-if="isHasLsmdsp">
            <f7-button color="green" fill class="button-link" @click="OnClick('lsmdsp-list')">
              <i class="fa fa-gift"></i>
            </f7-button>
            <span>连锁门店审批</span>
          </div>
        </div>
      </div>
      <div class="list-group-title" v-if="isHasYhgl">要货管理</div>
      <div class="block" v-if="isHasYhgl">
        <div class="row">
          <div class="link-box" v-if="isHasYhsq">
            <f7-button fill class="button-link" @click="OnClick('yhsq-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>要货申请</span>
          </div>
          <div class="link-box"  v-if="isHasYhsp">
            <f7-button color="green" fill class="button-link" @click="OnClick('yhsqsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>要货审批</span>
          </div>
        </div>
      </div>
      <div class="list-group-title" v-if="isHasDhgl">调货管理</div>
      <div class="block" v-if="isHasDhgl">
        <div class="row">
          <div class="link-box" v-if="isHasDhsq">
            <f7-button fill class="button-link" @click="OnClick('dhsq-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>调货申请</span>
          </div>
          <div class="link-box" v-if="isHasDhsp">
            <f7-button color="green" fill class="button-link" @click="OnClick('dhsqsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>调货审批</span>
          </div>
        </div>
      </div>
      <div class="list-group-title" v-if="isHasThgl">退货管理</div>
      <div class="block" v-if="isHasThgl">
        <div class="row">
          <div class="link-box" v-if="isHasThsq">
            <f7-button fill class="button-link" @click="OnClick('thsq-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>退货申请</span>
          </div>
          <div class="link-box" v-if="isHasThsp">
            <f7-button color="green" fill class="button-link" @click="OnClick('thsqsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>退货审批</span>
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
  import { f7Navbar, f7BlockTitle, f7Button, f7Page } from 'framework7-vue'
  import EventBus from 'common/js/event-bus'
  export default {
    components: {
      f7Navbar,
      f7BlockTitle,
      f7Button,
      f7Page
    },
    computed: {
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
        authData: []
      }
    },
    created() {
      if (!EventBus.isNeedLogin) {
        fetch('get', api.selfFunc, {}, this).then((res) => {
          console.log(res.data)
          this.authData = res.data
        })
        return
      }
      let _this = this
        dd.ready(function() {
          dd.runtime.permission.requestAuthCode({
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
    },
    methods: {
      OnClick(link) {
        this.$router.push(link)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .home
    height: 100%
    .header-bar
      position: absolute!important
      right: 0!important
      left: 0!important
      -webkit-backface-visibility: hidden!important
      backface-visibility: hidden!important
    .wrapper
      position: absolute
      top: 44px
      left: 0
      right: 0
      bottom: 0
      overflow: scroll
      -webkit-overflow-scrolling: touch
    .fa
      font-size: 20px
    .link-box
      display: flex
      width: 25%
      flex-direction: column
      align-items: center
      margin: 0 10px
    .button-link
      width: 50px!important
      height: 50px!important
      line-height: 50px!important
      margin: 10px!important
</style>
