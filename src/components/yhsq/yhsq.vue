<template>
  <transition name="slide">
    <div class="yhsq">
      <div class="apply-form">
        <div class="page-content">
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">客商名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="merchantsName" :value="merchantsName" placeholder="请选择客商名称" :disabled="isReadonly" readonly @click="onClickMerchant">
                      <invalid-msg :value="merchantsName" ref="validMerchantsName"></invalid-msg>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsName" placeholder="请输入要货人姓名" :value="autoData.userName" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人分公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsOffice" placeholder="请输入要货人分公司" :value="autoData.officeName" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人支公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsBranchOffice" placeholder="请输入要货人支公司" :value="autoData.branchOfficeName" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <div class="card" v-for="(item, index) in details" :key="index">
                <div class="card-header">产品{{index + 1}}<i v-if="!isReadonly" @click="deleteGood(index)" class="fa fa-trash" style="color: red; font-size: 24px; position: absolute; right: 15px; z-index: 2"></i></div>
                <div class="card-content card-content-padding">
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品名称</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.goodsName" placeholder="请选择产品名称" :disabled="isReadonly" readonly @click="onClickGood(index)">
                          <invalid-msg :value="item.goodsName" ref="validGoodsName"></invalid-msg>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品规格</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.goodsSpecifications" placeholder="请输入退货产品规格" disabled>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品批号</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.goodsBatchNumber" placeholder="请输入产品批号" disabled>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品数量</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.goodsNumber" placeholder="请输入产品数量" :disabled="isReadonly" required validate>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li v-if="isReadonly">
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">实发商品数量</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.realGoodsNum" :disabled="isReadonly" placeholder="请输入实发商品数量" required validate>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">开票价格</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.invoicePrice" placeholder="请输入开票价格" :disabled="isReadonly" required validate>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">零售价格</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.retailPrice" placeholder="请输入零售价格" :disabled="isReadonly" required validate>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div class="card" v-if="!formType || formType === '1'">
                    <div class="card-header">政策后实际采购扣率(按零售价计算)</div>
                    <div class="card-content card-content-padding">
                      <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">比例(%)</div>
                            <div class="item-input-wrap">
                              <input type="text" v-model="item.scale" placeholder="请输入比例" :disabled="isReadonly" required validate>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">形式</div>
                            <div class="item-input-wrap">
                              <input type="text" v-model="item.shape" placeholder="请选择形式" :disabled="isReadonly" readonly @click="onClickSelect(index)">
                              <invalid-msg :value="item.shape" ref="validShape"></invalid-msg>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">备注</div>
                            <div class="item-input-wrap">
                              <input type="text" v-model="item.remark" placeholder="请输入备注" :disabled="isReadonly" required validate>
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
              <f7-button v-if="!isReadonly" outline class="col" style="margin: 0 20px" @click="addGood">添加商品</f7-button>
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
      <auto-select-list v-if="selectList.length > 0" :list="selectList" ref="selectList" @selectedItem="selectedItem" title="选择形式"></auto-select-list>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Button, f7Searchbar } from 'framework7-vue'
  import MerchantSelectList from 'base/merchants-select-list/merchants-select-list'
  import GoodsSelectList from 'base/goods-select-list/goods-select-list'
  import AutoSelectList from 'base/auto-select-list/auto-select-list'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import InvalidMsg from 'base/invalid-msg/invalid-msg'
  import $ from 'dom7'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Button,
      MerchantSelectList,
      GoodsSelectList,
      AutoSelectList,
      f7Searchbar,
      InvalidMsg
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
        goodsBatchNumber: '',
        selectList: ['买赠', '礼品赠送', '抽奖', '圆桌会议', '分销活动', '检测活动'],
        shape: '',
        timelines: [],
        formType: this.$route.params.formType || '',
        details: [],
        selectGoodIndex: -1,
        selectShapeIndex: -1
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.listId && this.listId !== '0') {
        fetch('get', api.requireGoodsInfoGetDetail + this.listId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
          this.merchantsName = res.data.merchantsName
          this.goodsName = res.data.goodsName
          this.goodsSpecifications = res.data.goodsSpecifications
          this.goodsBatchNumber = res.data.goodsBatchNumber
          this.shape = res.data.shape
          this.details = res.data.details
        })
        fetch('get', api.requireGoodsAuditInfo + this.listId, {}, this).then((res) => {
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
        return this.$route.name === 'yhsq-view'
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
      onClickGood(index) {
        if (this.goods.length > 0) {
          this.selectGoodIndex = index
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
        this.details[this.selectGoodIndex].goodsName = good.goods_name
        this.details[this.selectGoodIndex].goodsSpecifications = good.goods_spec
        this.details[this.selectGoodIndex].goodsBatchNumber = good.wenhao
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
      onClickSelect(index) {
        this.selectShapeIndex = index
        this.$refs.selectList.show()
      },
      selectedItem(item) {
        this.details[this.selectShapeIndex].shape = item
      },
      onSave() {
        const app = this.$f7
        app.input.validateInputs('#apply-form')
        this.$refs.validMerchantsName.valid()
        this.$refs.validGoodsName && this.$refs.validGoodsName.forEach((item) => {
          item.valid()
        })
        this.$refs.validShape && this.$refs.validShape.forEach((item) => {
          item.valid()
        })
        this.$nextTick(() => {
          if (document.querySelectorAll('#apply-form .item-input-invalid').length > 0) {
            app.input.scrollIntoView($('#apply-form .item-input-invalid').parent(), 500, false, true)
            return
          }
          let formData = app.form.convertToData('#apply-form')
          formData.details = this.details
          if (this.listId && this.listId !== '0') {
            formData.id = this.listId
          }
          fetch('post', api.requireGoodsSaveDetail, formData, this, false).then((res) => {
            this.$router.replace('/yhsq-list')
          })
        })
      },
      onCancel() {
        this.$router.go(-1)
      },
      addGood() {
        this.details.push({
          goodsName: '',
          goodsSpecifications: '',
          goodsBatchNumber: '',
          goodsNumber: '',
          invoicePrice: '',
          retailPrice: '',
          scale: '',
          shape: '',
          remark: ''
        })
      },
      deleteGood(index) {
        this.details.splice(index, 1)
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, -100%, 0)
  .yhsq
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
