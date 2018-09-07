<template>
  <transition name="slide">
    <div class="thsq">
      <div class="apply-form">
        <div>
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">客商名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="merchantsName" :value="merchantsName" placeholder="请选择客商名称" :disabled="isReadonly" @click="onClickMerchant">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">门店名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="storeName" placeholder="请输入门店名称" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货人姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="returnGoodsName" placeholder="请输入退货人姓名" :value="autoData.userName" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货人分公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="returnGoodsOffice" placeholder="请输入退货人分公司" :value="autoData.officeName" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货人支公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="returnGoodsBranchOffice" placeholder="请输入退货人支公司" :value="autoData.branchOfficeName" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货产品名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsName" :value="goodsName" placeholder="请选择产品名称" :disabled="isReadonly" @click="onClickGood">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货产品规格</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsSpecifications" :value="goodsSpecifications" placeholder="请输入退货产品规格" disabled>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货产品数量</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsNumber" placeholder="请输入退货产品数量" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货产品批号</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsBatchNumber" placeholder="请输入退货产品批号" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">退货原因</div>
                    <div class="item-input-wrap">
                      <input type="text" name="returnRemarks" placeholder="请输入退货原因" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
          <div class="timeline">
            <div class="timeline-item" v-for="item in timelines" :key="item.audit_date">
              <div class="timeline-item-date">{{item.audit_date}}</div>
              <div class="timeline-item-divider"></div>
              <div class="timeline-item-content">
                <div class="timeline-item-inner">
                  <div class="timeline-item-title">{{item.roleName}}：{{item.audit_user_name}}</div>
                  <div class="timeline-item-subtitle">{{item.audioRes}}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="block" v-if="!isReadonly">
            <div class="row">
              <f7-button fill class="col btn-save" @click="onSave">保存</f7-button>
              <f7-button outline class="col btn-cancel" @click="onCancel">取消</f7-button>
            </div>
          </div>
        </div>
      </div>
      <merchant-select-list v-if="merchants.length > 0" :list="merchants" ref="merchants" @selectMerchants="selectMerchants" @searchMore="searchMoreMerchant"></merchant-select-list>
      <goods-select-list v-if="goods.length > 0" :list="goods" ref="goods" @selectGoods="selectGoods" @searchMore="searchMoreGoods"></goods-select-list>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Button, f7Searchbar } from 'framework7-vue'
  import MerchantSelectList from 'base/merchants-select-list/merchants-select-list'
  import GoodsSelectList from 'base/goods-select-list/goods-select-list'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Button,
      f7Searchbar,
      MerchantSelectList,
      GoodsSelectList
    },
    data() {
      return {
        listId: this.$route.params.id || '',
        mapAddr: '',
        longitude: '',
        latitude: '',
        pageNoGoods: 1,
        pageNoMerchants: 1,
        maxMerchantsCount: 0,
        maxGoodsCount: 0,
        pageSize: 10,
        goods: [],
        merchants: [],
        data: {},
        autoData: {},
        merchantsName: '',
        goodsName: '',
        goodsSpecifications: '',
        timelines: []
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.listId && this.listId !== '0') {
        fetch('get', api.returnGoodsInfoGetDetail + this.listId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
          this.merchantsName = res.data.merchantsName
          this.goodsName = res.data.goodsName
          this.goodsSpecifications = res.data.goodsSpecifications
        })
        fetch('get', api.returnGoodsAuditInfo + this.listId, {}, this).then((res) => {
          this.timelines = res.data
        })
      }
      fetch('get', api.findMerchants, {page: this.pageNoMerchants, limit: this.pageSize}, this).then((res) => {
        this.merchants = res.data
        this.maxMerchantsCount = res.count
      })
      fetch('get', api.goodsAutoFindInfo, {page: this.pageNoGoods, limit: this.pageSize}, this).then((res) => {
        this.goods = res.data
        this.maxGoodsCount = res.count
      })
      fetch('get', api.findRequireGoodsUserBaseInfo, {}, this).then((res) => {
        this.autoData = res.data
      })
    },
    computed: {
      isReadonly () {
        return this.$route.name === 'thsq-view'
      }
    },
    methods: {
      onClickMerchant() {
        if (this.merchants.length > 0) {
          this.$refs.merchants.show()
        } else {
          let toast = this.$f7.toast.create({
            text: '没有检索到客商数据！',
            position: 'center',
            closeTimeout: 2000
          })
          toast.open()
        }
      },
      selectMerchants(value) {
        this.merchantsName = value
      },
      searchMoreMerchant() {
        if (this.merchants.length >= this.maxMerchantsCount) {
          return
        }
        this.pageNoMerchants++
        fetch('get', api.findMerchants, {page: this.pageNoMerchants, limit: this.pageSize}, this).then((res) => {
          this.merchants = this.merchants.concat(res.data)
        })
      },
      onClickGood() {
        if (this.goods.length > 0) {
          this.$refs.goods.show()
        } else {
          let toast = this.$f7.toast.create({
            text: '没有检索到商品数据！',
            position: 'center',
            closeTimeout: 2000
          })
          toast.open()
        }
      },
      selectGoods(good) {
        this.goodsName = good.goods_name
        this.goodsSpecifications = good.goods_spec
      },
      searchMoreGoods() {
        if (this.goods.length >= this.maxGoodsCount) {
          return
        }
        this.pageNoGoods++
        fetch('get', api.goodsAutoFindInfo, {page: this.pageNoGoods, limit: this.pageSize}, this).then((res) => {
          this.goods = this.goods.concat(res.data)
        })
      },
      onSave() {
        const app = this.$f7
        let formData = app.form.convertToData('#apply-form')
        if (this.listId && this.listId !== '0') {
          fetch('put', api.returnGoodsInfo + this.listId, formData, this).then((res) => {
            this.$router.replace('/thsq-list')
          })
        } else {
          fetch('post', api.returnGoodsInfoSave, formData, this).then((res) => {
            this.$router.replace('/thsq-list')
          })
        }
      },
      onCancel() {
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, -100%, 0)
  .thsq
    .apply-form
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: #fff
      z-index: 1
      overflow: scroll
      -webkit-overflow-scrolling: touch
</style>
