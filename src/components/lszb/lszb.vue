<template>
  <transition name="slide">
    <div class="lszb">
      <div class="apply-form">
        <div class="page-content">
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">连锁店名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopName" placeholder="请输入连锁店名称" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">连锁店性质</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopType" :value="shopType" placeholder="请输入连锁店性质" :disabled="isReadonly" readonly @click="onClickSelectShopType">
                      <invalid-msg :value="shopType" ref="validShopType"></invalid-msg>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店地址</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopAddr" :value="shopAddr" id="shopAddr" placeholder="请输入药店地址" @click="onClickAddr" :disabled="isReadonly" readonly>
                      <invalid-msg :value="shopAddr" ref="validShopAddr"></invalid-msg>
                      <input name="longitude" type="hidden" :value="longitude"/>
                      <input name="latitude" type="hidden" :value="latitude"/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">合作时间</div>
                    <div class="item-input-wrap">
                      <input type="text" name="cooperationTime" placeholder="请选择合作时间" id="cooperationTime" :disabled="isReadonly" readonly/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">董事长姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="chairmanName" placeholder="请输入董事长姓名" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">董事长性别</div>
                    <div class="item-input-wrap">
                      <input type="text" name="chairmanSex" :value="chairmanSex" placeholder="请输入董事长性别" :disabled="isReadonly" readonly @click="onClickSelectChairmanSex">
                      <invalid-msg :value="chairmanSex" ref="validChairmanSex"></invalid-msg>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">董事长出生日期</div>
                    <div class="item-input-wrap">
                      <input type="text" placeholder="请选择董事长出生日期" name="chairmanBirthday" id="chairmanBirthday" :disabled="isReadonly" readonly/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">董事长电话</div>
                    <div class="item-input-wrap">
                      <input type="text" name="chairmanPhone" placeholder="请输入董事长电话" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">连锁门店数量</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopTotal" placeholder="请输入连锁门店数量" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">直营店数量</div>
                    <div class="item-input-wrap">
                      <input type="text" name="directlyTotal" placeholder="请输入直营店数量" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">加盟店数量</div>
                    <div class="item-input-wrap">
                      <input type="text" name="joinTotal" placeholder="请输入加盟店数量" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">库管员</div>
                    <div class="item-input-wrap">
                      <input type="text" name="houseKeeper" placeholder="请输入库管员" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">连锁总部地址</div>
                    <div class="item-input-wrap">
                      <input type="text" name="mainShopAddr" placeholder="请输入连锁总部地址" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">连锁仓库地址</div>
                    <div class="item-input-wrap">
                      <input type="text" name="chainWarehous" placeholder="请输入连锁仓库地址" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">上年度销售额</div>
                    <div class="item-input-wrap">
                      <input type="text" name="generates" placeholder="请输入上年度销售额" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">本年度是否与万通签订销售协议</div>
                    <div class="item-input-wrap">
                      <input type="text" name="isSigned" :value="isSigned" placeholder="请选择本年度是否与万通签订销售协议" :disabled="isReadonly" readonly @click="onClickSelectIsSigned">
                      <invalid-msg :value="isSigned" ref="validIsSigned"></invalid-msg>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">统一社会信用代码</div>
                    <div class="item-input-wrap">
                      <input type="text" name="licenseCode" placeholder="请输入统一社会信用代码" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">省份</div>
                    <div class="item-input-wrap">
                      <cube-select
                        @change="changePro"
                        placeholder="请输入省份"
                        :disabled="isReadonly"
                        v-model="licensePro"
                        :options="provinces">
                      </cube-select>
                      <invalid-msg :value="licensePro" ref="validLicensePro"></invalid-msg>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">地市</div>
                    <div class="item-input-wrap">
                      <cube-select
                        placeholder="请输入地市"
                        :disabled="isReadonly"
                        v-model="licenseCity"
                        :options="citys">
                      </cube-select>
                      <invalid-msg :value="licenseCity" ref="validLicenseCity"></invalid-msg>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">详细地址</div>
                    <div class="item-input-wrap">
                      <input type="text" name="licenseAddr" placeholder="请输入营业执照详细地址" :disabled="isReadonly" required validate>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
          <div style="text-align: center; margin-top: 10px">
            <f7-button v-if="!isReadonly" fill style="margin: 0 15px" @click="onPutLicense">上传营业执照</f7-button>
            <img :src="licensePath" style="margin: 20px 0" width="90" @click="showBigImage">
            <invalid-msg :value="licensePath" ref="validImg"></invalid-msg>
          </div>
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
      <addr-select ref="addrSelect" @addrchange="addrChange" v-if="!isReadonly"></addr-select>
      <auto-select-list v-if="shopTypeSelectList.length > 0" :list="shopTypeSelectList" ref="shopTypeSelectList" @selectedItem="selectedShopTypeItem" title="连锁店性质"></auto-select-list>
      <auto-select-list v-if="chairmanSexSelectList.length > 0" :list="chairmanSexSelectList" ref="chairmanSexSelectList" @selectedItem="selectedChairmanSexItem" title="董事长性别"></auto-select-list>
      <auto-select-list v-if="isSignedSelectList.length > 0" :list="isSignedSelectList" ref="isSignedSelectList" @selectedItem="selectedIsSignedItem" title="是否签约"></auto-select-list>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Button, f7Searchbar } from 'framework7-vue'
  import AddrSelect from 'base/addr-select/addr-select'
  import AutoSelectList from 'base/auto-select-list/auto-select-list'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  import * as dd from 'dingtalk-jsapi'
  import InvalidMsg from 'base/invalid-msg/invalid-msg'
  import $ from 'dom7'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Button,
      AddrSelect,
      AutoSelectList,
      f7Searchbar,
      InvalidMsg
    },
    data() {
      return {
        listId: this.$route.params.id || '',
        shopAddr: '',
        longitude: '',
        latitude: '',
        shopTypeSelectList: ['国有', '股份', '个体'],
        shopType: '',
        chairmanSexSelectList: ['男', '女'],
        chairmanSex: '',
        isSignedSelectList: ['签订', '未签订'],
        isSigned: '',
        timelines: [],
        licensePath: '',
        provinces: [],
        citys: [],
        licensePro: '',
        licenseCity: ''
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.listId && this.listId !== '0') {
        fetch('get', api.chaintotalInfoGetDetail + this.listId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
          this.shopType = res.data.shopType
          this.chairmanSex = res.data.chairmanSex
          if (res.data.isSigned === '1') {
            this.isSigned = '未签订'
          } else if (res.data.isSigned === '0') {
            this.isSigned = '签订'
          }
          this.shopAddr = res.data.shopAddr
          this.licensePath = res.data.licensePath
        })
        fetch('get', api.chainTotalAuditInfo + this.listId, {}, this).then((res) => {
          this.timelines = res.data
        })
      }
      fetch('get', api.getLinceseProvinceDict, {}, this).then((res) => {
        this.provinces = res.data.map((item) => {
          item.value = item.id + ''
          item.text = item.name + ''
          return item
        })
      })
      if (this.$route.name === 'lszb-view') {
        return
      }
      let today = new Date()
      self.cooperationTimeDatePiker = app.picker.create({
        inputEl: '#cooperationTime',
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
      self.chairmanBirthdayDatePiker = app.picker.create({
        inputEl: '#chairmanBirthday',
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
    },
    destroyed() {
      this.cooperationTimeDatePiker && this.cooperationTimeDatePiker.destroy()
      this.chairmanBirthdayDatePiker && this.chairmanBirthdayDatePiker.destroy()
    },
    computed: {
      isReadonly () {
        return this.$route.name === 'lszb-view'
      }
    },
    methods: {
      onPutLicense() {
        fetch('get', api.authConfig, {url: window.location.href.split('#')[0]}, this).then((res) => {
          let config = res.data
          config.jsApiList = []
          config.jsApiList.push('biz.util.uploadImage')
          console.log(config)
          dd.config(config)
          dd.error(function(err) {
            alert('dd error: ' + JSON.stringify(err))
          })
          let _this = this
          dd.ready(function() {
            dd.biz.util.uploadImage({
              compression: true, // (是否压缩，默认为true压缩)
              multiple: false, // 是否多选，默认false
              max: 3, // 最多可选个数
              quality: 50, // 图片压缩质量,
              resize: 50, // 图片缩放率
              onSuccess: function(result) {
                // onSuccess将在图片上传成功之后调用
                /*
                 [
                 'http://gtms03.alicdn.com/tps/i3/TB1VF6uGFXXXXalaXXXmh5R_VXX-237-236.png'
                 ]
                 */
                if (result.length > 0) {
                  _this.licensePath = result[0]
                }
              },
              onFail: function (err) { console.log(err) }
            })
          })
        })
      },
      showBigImage() {
        fetch('get', api.authConfig, {url: window.location.href.split('#')[0]}, this).then((res) => {
          let config = res.data
          config.jsApiList = []
          config.jsApiList.push('biz.util.previewImage')
          console.log(config)
          dd.config(config)
          dd.error(function(err) {
            alert('dd error: ' + JSON.stringify(err))
          })
          let _this = this
          dd.ready(function() {
            dd.biz.util.previewImage({
              urls: [_this.licensePath],
              current: _this.licensePath,
              onSuccess: function(result) {
                /**/
              },
              onFail: function(err) { console.log(err) }
            })
          })
        })
      },
      onClickAddr() {
        this.$refs.addrSelect.show()
      },
      onClickSelectShopType() {
        this.$refs.shopTypeSelectList.show()
      },
      selectedShopTypeItem(item) {
        this.shopType = item
      },
      onClickSelectChairmanSex() {
        this.$refs.chairmanSexSelectList.show()
      },
      selectedChairmanSexItem(item) {
        this.chairmanSex = item
      },
      onClickSelectIsSigned() {
        this.$refs.isSignedSelectList.show()
      },
      selectedIsSignedItem(item) {
        this.isSigned = item
      },
      onSave() {
        const app = this.$f7
        app.input.validateInputs('#apply-form')
        this.$refs.validShopType.valid()
        this.$refs.validShopAddr.valid()
        this.$refs.validChairmanSex.valid()
        this.$refs.validIsSigned.valid()
        this.$refs.validImg.valid()
        this.$refs.validLicensePro.valid()
        this.$refs.validLicenseCity.valid()
        this.$nextTick(() => {
          if (document.querySelectorAll('#apply-form .item-input-invalid').length > 0) {
            app.input.scrollIntoView($('#apply-form .item-input-invalid').parent(), 500, false, true)
            return
          }
          let formData = app.form.convertToData('#apply-form')
          formData['licensePath'] = this.licensePath
          if (formData['isSigned'] === '签订') {
            formData['isSigned'] = '0'
          } else if (formData['isSigned'] === '未签订') {
            formData['isSigned'] = '1'
          }
          formData['licensePro'] = this.licensePro
          formData['licenseCity'] = this.licenseCity
          if (this.listId && this.listId !== '0') {
            fetch('put', api.chaintotalInfo + this.listId, formData, this).then((res) => {
              this.$router.replace('/lszb-list')
            })
          } else {
            fetch('post', api.chaintotalInfoSave, formData, this).then((res) => {
              this.$router.replace('/lszb-list')
            })
          }
        })
      },
      onCancel() {
        this.$router.go(-1)
      },
      addrChange(addrObj) {
        this.shopAddr = addrObj.addr
        this.longitude = addrObj.lng
        this.latitude = addrObj.lat
      },
      changePro(value) {
        fetch('get', api.getLinceseCityDict, {provinceId: value}, this).then((res) => {
          this.citys = res.data.map((item) => {
            item.value = item.id + ''
            item.text = item.name + ''
            return item
          })
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, -100%, 0)
  .lszb
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
