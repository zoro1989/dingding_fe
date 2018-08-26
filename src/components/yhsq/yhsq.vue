<template>
  <transition name="slide">
    <div class="yhsq">
      <scroll class="apply-form">
        <div>
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">客商名称</div>
                    <div class="item-input-wrap">
                      <a href="#" class="item-link smart-select" data-open-in="popup"  data-searchbar="true" data-searchbar-placeholder="Search car" :disabled="isReadonly" id="merchantsName">
                        <select name="merchantsName" ref="merchantsSelect" >
                          <option v-for="item in merchants" :key="item.shop_name" :value="item.shop_name">{{item.shop_name}}</option>
                        </select>
                        <div class="item-content">
                          <div class="item-inner">
                            <div class="item-title"></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsName" placeholder="请输入要货人姓名" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人分公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsOffice" placeholder="请输入要货人分公司" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人支公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsBranchOffice" placeholder="请输入要货人支公司" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">产品名称</div>
                    <div class="item-input-wrap">
                      <a href="#" class="item-link smart-select" data-open-in="popup"  data-searchbar="true" data-searchbar-placeholder="Search car" :enable="isReadonly" id="goodsName">
                        <select name="goodsName" ref="goodsSelect" :disabled="isReadonly">
                          <option v-for="item in goods" :value="item.goods_name" :key="item.goods_name + item.goods_spec">
                            {{item.goods_name}}({{item.goods_spec}})
                          </option>
                        </select>
                        <div class="item-content">
                          <div class="item-inner">
                            <div class="item-title"></div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">产品规格</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsSpecifications" placeholder="请输入产品规格" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">产品数量</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsNumber" placeholder="请输入产品数量" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">产品批号</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsBatchNumber" placeholder="请输入产品批号" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">开票价格</div>
                    <div class="item-input-wrap">
                      <input type="text" name="invoicePrice" placeholder="请输入开票价格" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">零售价格</div>
                    <div class="item-input-wrap">
                      <input type="text" name="retailPrice" placeholder="请输入零售价格" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">比例</div>
                    <div class="item-input-wrap">
                      <input type="text" name="scale" placeholder="请输入比例" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">形式</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shape" id="shape" placeholder="请选择形式" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">备注</div>
                    <div class="item-input-wrap">
                      <input type="text" name="remark" placeholder="请输入店长姓名" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
          <div class="block" v-if="!isReadonly">
            <div class="row">
              <f7-button fill class="col btn-save" @click="onSave">保存</f7-button>
              <f7-button outline class="col btn-cancel" @click="onCancel">取消</f7-button>
            </div>
          </div>
        </div>
      </scroll>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Button, f7Searchbar } from 'framework7-vue'
  import Scroll from 'base/scroll/scroll'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Button,
      Scroll,
      f7Searchbar
    },
    data() {
      return {
        listId: this.$route.params.id || '',
        mapAddr: '',
        longitude: '',
        latitude: '',
        pageNoGoods: 1,
        pageNoMerchants: 1,
        pageSize: 10,
        goods: [],
        merchants: [],
        data: {}
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.listId && this.listId !== '0') {
        fetch('get', api.requireGoodsInfoGetDetail + this.listId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
          this.data = res.data
        })
      }
      fetch('get', api.findMerchants, {page: this.pageNoGoods, limit: this.pageSize}, this).then((res) => {
        this.merchants = res.data
        this.$nextTick(() => {
          self.merchantsNamePiker = app.smartSelect.create({
            el: '#merchantsName',
            routableModals: false,
            openIn: 'popup',
            searchbar: true,
            searchbarPlaceholder: '请输入客商名称',
            closeOnSelect: true,
            pageBackLinkText: '返回',
            popupCloseLinkText: '关闭',
            sheetCloseLinkText: '完成'
          })
          this.$refs.merchantsSelect.value = this.data.merchantsName
        })
      })
      fetch('get', api.goodsAutoFindInfo, {page: this.pageNoGoods, limit: this.pageSize}, this).then((res) => {
        this.goods = res.data
        this.$nextTick(() => {
          self.goodsNamePiker = app.smartSelect.create({
            el: '#goodsName',
            routableModals: false,
            openIn: 'popup',
            searchbar: true,
            searchbarPlaceholder: '请输入商品名称',
            closeOnSelect: true,
            pageBackLinkText: '返回',
            popupCloseLinkText: '关闭',
            sheetCloseLinkText: '完成'
          })
          this.$refs.goodsSelect.value = this.data.goodsName
        })
      })
      if (this.$route.name === 'yhsq-view') {
        return
      }
      self.shapePiker = app.autocomplete.create({
        inputEl: '#shape',
        openIn: 'dropdown',
        routableModals: false,
        source: function (query, render) {
          let results = []
          let types = ['买赠', '礼品赠送', '抽奖', '圆桌会议', '分销活动', '检测活动']
          for (let i = 0; i < types.length; i++) {
            if (types[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(types[i])
          }
          // Render items by passing array with result items
          render(results)
        }
      })
      // self.goodsNamePiker.open()
    },
    destroyed() {
      this.shapePiker && this.shapePiker.destroy()
      this.merchantsNamePiker && this.merchantsNamePiker.destroy()
      this.goodsNamePiker && this.goodsNamePiker.destroy()
    },
    computed: {
      isReadonly () {
        return this.$route.name === 'yhsq-view'
      }
    },
    methods: {
      onClickAddr() {
        this.$refs.addrSelect.show()
      },
      onSave() {
        const app = this.$f7
        let formData = app.form.convertToData('#apply-form')
        if (this.listId && this.listId !== '0') {
          fetch('put', api.requireGoodsInfo + this.listId, formData, this).then((res) => {
            this.$router.replace('/yhsq-list')
          })
        } else {
          fetch('post', api.requireGoodsInfoSave, formData, this).then((res) => {
            this.$router.replace('/yhsq-list')
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
  .yhsq
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 1
    .apply-form
      position: fixed
      top: 0
      left: 0
      right: 0
      bottom: 0
      background: #fff
      z-index: 1
      .block
        padding-bottom: 40px
</style>
