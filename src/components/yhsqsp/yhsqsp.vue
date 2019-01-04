<template>
  <transition name="slide">
    <div class="yhsqsp">
      <div class="apply-form">
        <div class="page-content">
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
                    <div class="item-title item-label">要货人姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsName" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人分公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsOffice" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">要货人支公司</div>
                    <div class="item-input-wrap">
                      <input type="text" name="requireGoodsBranchOffice" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <div class="card" v-for="(item, index) in details" :key="index">
                <div class="card-header">产品{{index + 1}}</div>
                <div class="card-content card-content-padding">
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品名称</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.goodsName" placeholder="无" readonly>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品规格</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.goodsSpecifications" placeholder="无" readonly>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品数量</div>
                        <div class="item-input-wrap">
                          <input type="text" name="goodsNumber" v-model="item.goodsNumber" placeholder="无" :disabled="!((auditStatus === '待审核' || auditStatus === 'wait') && (auditStep === '3' || auditStep === '4'))" required validate>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li v-if="auditStep === '3' || auditStep === '4' || auditStep === '5'">
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">实发商品数量</div>
                        <div class="item-input-wrap">
                          <input type="text" name="realGoodsNum" v-model="item.realGoodsNum" :disabled="auditStep === '5'" placeholder="无" required validate>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">产品批号</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.goodsBatchNumber" placeholder="无" readonly>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">开票价格</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.invoicePrice" placeholder="无" readonly>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="item-content item-input">
                      <div class="item-inner">
                        <div class="item-title item-label">零售价格</div>
                        <div class="item-input-wrap">
                          <input type="text" v-model="item.retailPrice" placeholder="无" readonly>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div class="card" v-if="!formType || formType === '1'">
                    <div class="card-header">政策后实际采购扣率（按零售价计算）</div>
                    <div class="card-content card-content-padding">
                      <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">比例</div>
                            <div class="item-input-wrap">
                              <input type="text" v-model="item.scale" placeholder="无" readonly>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">形式</div>
                            <div class="item-input-wrap">
                              <input type="text" v-model="item.shape" placeholder="无" readonly>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div class="item-content item-input">
                          <div class="item-inner">
                            <div class="item-title item-label">备注</div>
                            <div class="item-input-wrap">
                              <input type="text" v-model="item.remark" placeholder="无" readonly>
                            </div>
                          </div>
                        </div>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
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
                <li class="item-content item-input" v-if="((existUser === '1' && auditStep === '3') || existUser === '2') || !(formType === '1' || (formType === '2' && auditStep === '1'))">
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
                <li class="item-content item-input" v-if="((existUser === '1' && auditStep === '3') || existUser === '2') || !(formType === '1' || (formType === '2' && auditStep === '1'))">
                  <div class="item-inner">
                    <div class="item-title item-label">审批意见</div>
                    <div class="item-input-wrap">
                      <textarea placeholder="请填写审批意见" name="auditOpinion"></textarea>
                    </div>
                  </div>
                </li>
                <li class="item-content item-input" v-if="isPass && ((existUser === '1' && auditStep === '3') || existUser === '2')">
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
              <f7-button fill color="orange" v-if="formType === '1' || (formType === '2' && auditStep === '1')" class="col btn-save" @click="onEdit">编辑</f7-button>
              <f7-button fill class="col btn-save" v-if="formType === '1' || (formType === '2' && auditStep === '1')" @click="onAudit('审批')">提交审批</f7-button>
              <f7-button fill class="col btn-save" v-if="!(formType === '1' || (formType === '2' && auditStep === '1'))" @click="onSave">提交</f7-button>
              <f7-button outline class="col btn-cancel" @click="onCancel">取消</f7-button>
            </div>
            <div class="row" v-if="formType === '3'">
              <f7-button fill class="col btn-save" @click="onAudit('收货')">确认收货</f7-button>
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
  import $ from 'dom7'
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
        formType: this.$route.params.formType || '',
        existUser: '',
        details: []
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.tableId && this.tableId !== '0') {
        fetch('get', api.requireGoodsInfoGetDetail + this.tableId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
          this.details = res.data.details
        })
        fetch('get', api.requireGoodsAuditInfo + this.tableId, {}, this).then((res) => {
          this.timelines = res.data
        })
      }
      fetch('get', api.checkNextApproveUserExist, {auditStep: this.auditStep, tableId: this.tableId, auditType: 'requireGoods'}, this).then((res) => {
        this.existUser = res.data.existUser
        let trustUserId = res.data.trustUserId
        if (this.auditStep === '3') {
          trustUserId = ''
        }
        fetch('get', api.findNextApproveUserByOpenPage, {page: this.pageNoAuditUser, limit: this.pageSize, auditUserId: trustUserId}, this).then((res) => {
          this.auditUsers = res.data
          this.maxAuditUsersCount = res.count
        })
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
        app.input.validateInputs('#apply-form')
        this.$nextTick(() => {
          if (document.querySelectorAll('#apply-form .item-input-invalid').length > 0) {
            app.input.scrollIntoView($('#apply-form .item-input-invalid').parent(), 500, false, true)
            return
          }
          if (this.tableId && this.auditId && this.auditStep) {
            if (this.existUser === '0') {
              let toast = this.$f7.toast.create({
                text: '未找到下一步审批人！',
                position: 'center',
                closeTimeout: 2000
              })
              toast.open()
              return
            }
            if ((this.auditStatus === '待审核' || this.auditStatus === 'wait') && !(this.formType === '1' || (this.formType === '2' && this.auditStep === '1'))) {
              if (this.isPass && ((this.auditStep === '3' && this.existUser === '1') || this.existUser === '2') && (!this.auditUserId || !this.auditUserName)) {
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
            formData['details'] = this.details
            formData['tableId'] = this.tableId
            formData['id'] = this.auditId
            formData['auditStep'] = this.auditStep
            formData['auditResult'] = this.isPass ? '1' : '0'
            formData['auditType'] = 'requireGoods'
            fetch('post', api.terminalAuditForm, formData, this, false).then((res) => {
              this.$router.replace('/yhsqsp-list')
            })
          }
        })
      },
      onAudit(txt) {
        const app = this.$f7
        app.input.validateInputs('#apply-form')
        this.$nextTick(() => {
          if (document.querySelectorAll('#apply-form .item-input-invalid').length > 0) {
            app.input.scrollIntoView($('#apply-form .item-input-invalid').parent(), 500, false, true)
            return
          }
          let _this = this
          let params = {
            tableId: this.tableId,
            id: this.auditId,
            auditStep: this.auditStep,
            auditResult: '1',
//          auditStatus: this.auditStatus,
            auditType: 'requireGoods'
          }
          if ((this.auditStatus === '待审核' || this.auditStatus === 'wait') && ((this.existUser === '1' && this.auditStep === '3') || this.existUser === '2')) {
            if (this.isPass) {
              if (!this.auditUserId || !this.auditUserName) {
                let toast = this.$f7.toast.create({
                  text: '请选择开票人！',
                  position: 'center',
                  closeTimeout: 2000
                })
                toast.open()
                return
              } else {
                params.auditUserId = this.auditUserId
                params.auditUserName = this.auditUserName
//              params.auditStatus = '2'
              }
            }
          }
//        if (this.formType === '3') {
//          params.auditStatus = '4'
//        }
          app.dialog.confirm('确定要' + txt + '吗?', '提示', function () {
            fetch('post', api.terminalAuditForm, params, _this, false).then((res) => {
              let toast = app.toast.create({
                text: '已完成' + txt + '！',
                position: 'center',
                closeTimeout: 2000
              })
              toast.open()
              _this.$router.replace('/yhsqsp-list')
            })
          })
        })
      },
      onEdit() {
        this.$router.push({
            path: `/yhsq/${this.tableId}/${this.formType}`
          }
        )
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
  .yhsqsp
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
