<template>
  <scroll class="scroll">
    <div class="home">
      <f7-navbar title="客商管理"></f7-navbar>
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
      <div class="item-divider"></div>
      <div class="block">
        <div>
          客商管理
        </div>
        <div class="row">
          <div class="link-box">
            <f7-button fill class="button-link" @click="OnClick('apply-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>终端医疗申请</span>
          </div>
          <div class="link-box">
            <f7-button fill class="button-link" @click="OnClick('lszb-list')">
              <i class="fa fa-institution"></i>
            </f7-button>
            <span>连锁总部申请</span>
          </div>
          <div class="link-box">
            <f7-button fill class="button-link" @click="OnClick('lsmd-list')">
              <i class="fa fa-object-group"></i>
            </f7-button>
            <span>连锁门店申请</span>
          </div>
          <div class="link-box">
            <f7-button color="green" fill class="button-link" @click="OnClick('zdylsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>终端医疗审批</span>
          </div>
          <div class="link-box">
            <f7-button color="green" fill class="button-link" @click="OnClick('lszbsp-list')">
              <i class="fa fa-share-alt"></i>
            </f7-button>
            <span>连锁总部审批</span>
          </div>
          <div class="link-box">
            <f7-button color="green" fill class="button-link" @click="OnClick('lsmdsp-list')">
              <i class="fa fa-gift"></i>
            </f7-button>
            <span>连锁门店审批</span>
          </div>
        </div>
      </div>
      <div class="item-divider"></div>
      <div class="block">
        <div>
          要货管理
        </div>
        <div class="row">
          <div class="link-box">
            <f7-button fill class="button-link" @click="OnClick('yhsq-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>要货申请</span>
          </div>
          <div class="link-box">
            <f7-button color="green" fill class="button-link" @click="OnClick('yhsqsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>要货审批</span>
          </div>
        </div>
      </div>
      <div class="item-divider"></div>
      <div class="block">
        <div>
          调货管理
        </div>
        <div class="row">
          <div class="link-box">
            <f7-button fill class="button-link" @click="OnClick('dhsq-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>调货申请</span>
          </div>
          <div class="link-box">
            <f7-button color="green" fill class="button-link" @click="OnClick('dhsqsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>调货审批</span>
          </div>
        </div>
      </div>
      <div class="item-divider"></div>
      <div class="block">
        <div>
          退货管理
        </div>
        <div class="row">
          <div class="link-box">
            <f7-button fill class="button-link" @click="OnClick('thsq-list')">
              <i class="fa fa-address-card-o"></i>
            </f7-button>
            <span>退货申请</span>
          </div>
          <div class="link-box">
            <f7-button color="green" fill class="button-link" @click="OnClick('thsqsp-list')">
              <i class="fa fa-pencil"></i>
            </f7-button>
            <span>退货审批</span>
          </div>
        </div>
      </div>
    </div>
  </scroll>
</template>
<script>
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import * as dd from 'dingtalk-jsapi'
  import { f7Navbar, f7Button } from 'framework7-vue'
  import EventBus from 'common/js/event-bus'
  import Scroll from 'base/scroll/scroll'
  export default {
    components: {
      f7Navbar,
      f7Button,
      Scroll
    },
    created() {
      if (!EventBus.isNeedLogin) {
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
  .scroll
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    .home
      padding-bottom: 40px
      .fa
        font-size: 20px
      .link-box
        display: flex
        flex-direction: column
        align-items: center
        margin: 0 10px
      .button-link
        width: 50px!important
        height: 50px!important
        line-height: 50px!important
        margin: 10px!important
</style>
