<template>
  <transition name="slide">
    <div class="dhsqsp">
      <div class="apply-form">
        <div>
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">客商名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="merchantsName" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">门店名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="storeName" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货人姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="arrangeGoodsName" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货人分公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="arrangeGoodsOffice" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货人支公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="arrangeGoodsBranchOffice" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货产品名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsName" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货产品规格</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsSpecifications" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货产品数量</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsNumber" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货产品批号</div>
                    <div class="item-input-wrap">
                      <input type="text" name="goodsBatchNumber" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">调货原因</div>
                    <div class="item-input-wrap">
                      <input type="text" name="arrangeRemarks" placeholder="无" readonly>
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
          <div v-if="auditStatus === '待审核' || auditStatus === 'wait'">
            <form class="list" id="audit-form">
              <ul>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">审核是否通过</div>
                    <div class="item-input-wrap">
                      <label class="toggle toggle-init color-blue">
                        <input type="checkbox" name="auditResult" v-model="isPass">
                        <span class="toggle-icon"></span>
                      </label>
                      {{isPass ? '通过' : '不通过'}}
                    </div>
                  </div>
                </li>
                <li class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">审批意见</div>
                    <div class="item-input-wrap">
                      <textarea placeholder="请填写审批意见" name="auditOpinion"></textarea>
                    </div>
                  </div>
                </li>
                <li class="item-content item-input" v-if="auditStep === '3'">
                  <div class="item-inner">
                    <div class="item-title item-label">开票员</div>
                    <div class="item-input-wrap">
                      <input type="text" name="auditUserName" v-model="auditUserName" placeholder="请选择下级审批人" readonly @click="onclickAuditUser">
                      <input type="hidden" name="auditUserId" v-model="auditUserId">
                    </div>
                  </div>
                </li>
              </ul>
            </form>
          </div>
          <div class="block" v-if="auditStatus === '待审核' || auditStatus === 'wait'">
            <div class="row" v-if="formType !== '3'">
              <f7-button fill class="col btn-save" @click="onSave">保存</f7-button>
              <f7-button outline class="col btn-cancel" @click="onCancel">取消</f7-button>
            </div>
            <div class="row" v-if="formType === '3'">
              <f7-button fill class="col btn-save" @click="onAudit">确认收货</f7-button>
              <f7-button outline class="col btn-cancel" @click="onCancel">取消</f7-button>
            </div>
          </div>
        </div>
      </div>
      <audituser-select-list v-if="auditUsers.length > 0" :list="auditUsers" ref="auditUsers" @onSelectItem="selectAuditUser" @searchMore="searchMoreAuditUser"></audituser-select-list>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Button, f7Searchbar } from 'framework7-vue'
  import AudituserSelectList from 'base/audituser-select-list/audituser-select-list'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Button,
      f7Searchbar,
      AudituserSelectList
    },
    data() {
      return {
        tableId: this.$route.params.id || '',
        auditId: this.$route.params.auditId || '',
        auditStep: this.$route.params.auditStep || '',
        auditStatus: this.$route.params.auditStatus || '',
        timelines: [],
        isPass: true,
        auditUsers: [],
        maxAuditUsersCount: 0,
        pageNoAuditUser: 1,
        pageSize: 10,
        auditUserId: '',
        auditUserName: '',
        formType: this.$route.params.formType || ''
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.tableId && this.tableId !== '0') {
        fetch('get', api.arrangeGoodsInfoGetDetail + this.tableId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
        })
        fetch('get', api.arrangeGoodsAuditInfo + this.tableId, {}, this).then((res) => {
          this.timelines = res.data
        })
      }

      fetch('get', api.findNextApproveUserByOpenPage, {page: this.pageNoAuditUser, limit: this.pageSize}, this).then((res) => {
        this.auditUsers = res.data
        this.maxAuditUsersCount = res.count
      })
    },
    methods: {
      onclickAuditUser() {
        if (this.auditUsers.length > 0) {
          this.$refs.auditUsers.show()
        } else {
          let toast = this.$f7.toast.create({
            text: '没有检索到下级审批人数据！',
            position: 'center',
            closeTimeout: 2000
          })
          toast.open()
        }
      },
      selectAuditUser(item) {
        this.auditUserId = item.auditUserId
        this.auditUserName = item.auditUserName
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
      onSave() {
        const app = this.$f7
        if (this.tableId && this.auditId && this.auditStep) {
          if (this.auditStatus === '待审核' || this.auditStatus === 'wait') {
            if (this.isPass && this.auditStep === '3' && (!this.auditUserId || !this.auditUserName)) {
              let toast = this.$f7.toast.create({
                text: '请选择开票人！',
                position: 'center',
                closeTimeout: 2000
              })
              toast.open()
              return
            }
          }
          let formData = app.form.convertToData('#audit-form')
          formData['tableId'] = this.tableId
          formData['id'] = this.auditId
          formData['auditStep'] = this.auditStep
          formData['auditResult'] = this.isPass ? '1' : '0'
          formData['auditType'] = 'arrangeGoods'
          fetch('post', api.terminalAuditForm, formData, this, false).then((res) => {
            this.$router.replace('/dhsqsp-list')
          })
        }
      },
      onAudit(item, txt) {
        const app = this.$f7
        let _this = this
        app.dialog.confirm('确定要收货吗?', '提示', function () {
          let params = {
            tableId: this.tableId,
            auditStep: this.auditStep,
            auditResult: '1',
            auditStatus: '4',
            auditType: 'arrangeGoods'
          }
          fetch('post', api.terminalAudit, params, _this).then((res) => {
            let toast = app.toast.create({
              text: '已确认收货！',
              position: 'center',
              closeTimeout: 2000
            })
            toast.open()
            this.$router.replace('/dhsqsp-list')
          })
        })
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
  .dhsqsp
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
  .toggle
    margin: 10px!important
  .block
    padding-bottom: 35px
</style>
