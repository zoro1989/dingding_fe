<template>
  <transition name="slide">
    <div class="lsmd">
      <scroll class="apply-form">
        <div>
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">门店名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopName" placeholder="请输入门店名称" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">门店类别</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopType" id="shopType" placeholder="请输入门店类别" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">连锁门店地址</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopAddr" :value="mapAddr" id="shopAddr" placeholder="请输入连锁门店地址" readonly @click="onClickAddr" :disabled="isReadonly">
                      <input name="longitude" type="hidden" :value="longitude"/>
                      <input name="latitude" type="hidden" :value="latitude"/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">店长姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopUser" placeholder="请输入店长姓名" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">店长性别</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopUserSex" id="shopUserSex" placeholder="请输入店长性别" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">店长出生日期</div>
                    <div class="item-input-wrap">
                      <input type="text" placeholder="请选择店长出生日期" name="shopUserBirth" readonly="readonly" id="shopUserBirth" :disabled="isReadonly"/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">店长电话</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopUserPhone" placeholder="请输入店长电话" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">店员数量</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopMemberNum" placeholder="请输入店员数量" :disabled="isReadonly">
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">上年销售额</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopSale" placeholder="请输入上年销售额" :disabled="isReadonly">
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
      <addr-select ref="addrSelect" @addrchange="addrChange" v-if="!isReadonly"></addr-select>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Button, f7Searchbar } from 'framework7-vue'
  import AddrSelect from 'base/addr-select/addr-select'
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
      AddrSelect,
      f7Searchbar
    },
    data() {
      return {
        listId: this.$route.params.id || '',
        mapAddr: '',
        longitude: '',
        latitude: ' '
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.listId && this.listId !== '0') {
        fetch('get', api.chainCustomInfoGetDetail + this.listId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
        })
      }
      if (this.$route.name === 'lsmd-view') {
        return
      }
      let today = new Date()
      self.shopUserBirthDatePiker = app.picker.create({
        inputEl: '#shopUserBirth',
        toolbar: true,
        rotateEffect: true,
        routableModals: false,
        value: [
          today.getMonth(),
          today.getDate(),
          today.getFullYear()
        ],
        formatValue: function (values, displayValues) {
          return values[2] + '/' + (values[0] * 1 + 1) + '/' + values[1]
        },
        cols: [
          // Months
          {
            values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
            displayValues: ('一月 二月 三月 四月 五月 六月 七月 八月 九月 十月 十一月 十二月').split(' '),
            textAlign: 'left'
          },
          // Days
          {
            values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          },
          // Years
          {
            values: (function () {
              let arr = []
              for (let i = 1950; i <= 2030; i++) { arr.push(i) }
              return arr
            })()
          }
        ],
        on: {
          change: function (picker, values, displayValues) {
            let daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate()
            if (values[1] > daysInMonth) {
              picker.cols[1].setValue(daysInMonth)
            }
          }
        }
      })
      self.shopTypePiker = app.autocomplete.create({
        inputEl: '#shopType',
        openIn: 'dropdown',
        routableModals: false,
        source: function (query, render) {
          let results = []
          let types = ['直营', '加盟']
          for (let i = 0; i < types.length; i++) {
            if (types[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(types[i])
          }
          // Render items by passing array with result items
          render(results)
        }
      })
      self.shopUserSexPiker = app.autocomplete.create({
        inputEl: '#shopUserSex',
        openIn: 'dropdown',
        routableModals: false,
        source: function (query, render) {
          let results = []
          let types = ['男', '女']
          for (let i = 0; i < types.length; i++) {
            if (types[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(types[i])
          }
          // Render items by passing array with result items
          render(results)
        }
      })
    },
    destroyed() {
      this.shopUserBirthDatePiker && this.shopUserBirthDatePiker.destroy()
      this.shopTypePiker && this.shopTypePiker.destroy()
      this.shopUserSexPiker && this.shopUserSexPiker.destroy()
    },
    computed: {
      isReadonly () {
        return this.$route.name === 'lsmd-view'
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
          fetch('put', api.chainCustomInfo + this.listId, formData, this).then((res) => {
            this.$router.replace('/lsmd-list')
          })
        } else {
          fetch('post', api.chainCustomInfoSave, formData, this).then((res) => {
            this.$router.replace('/lsmd-list')
          })
        }
      },
      onCancel() {
        this.$router.go(-1)
      },
      addrChange(addrObj) {
        this.mapAddr = addrObj.addr
        this.longitude = addrObj.lng
        this.latitude = addrObj.lat
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, -100%, 0)
  .lsmd
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
</style>
