<template>
  <transition name="slide">
    <div class="zdylsp">
      <div class="apply-form">
        <div>
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店名称</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopName" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店类别</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopType" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店地址</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopAddr" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店负责人姓名</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopUser" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店负责人电话</div>
                    <div class="item-input-wrap">
                      <input type="text" name="shopUserPhone" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店合作时间</div>
                    <div class="item-input-wrap">
                      <input type="text" name="cooperationTime" placeholder="无" readonly/>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">上年度销售额</div>
                    <div class="item-input-wrap">
                      <input type="text" name="generates" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">营业员人数</div>
                    <div class="item-input-wrap">
                      <input type="text" name="personCount" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">药店负责人生日</div>
                    <div class="item-input-wrap">
                      <input type="text" placeholder="无" name="shopUserBirth" readonly/>
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
              </ul>
            </form>
          </div>
          <div class="block" v-if="auditStatus === '待审核' || auditStatus === 'wait'">
            <div class="row">
              <f7-button fill class="col btn-save" @click="onSave">保存</f7-button>
              <f7-button outline class="col btn-cancel" @click="onCancel">取消</f7-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Button, f7Searchbar } from 'framework7-vue'
  import { api } from '@/config'
  import fetch from 'utils/fetch'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Button,
      f7Searchbar
    },
    data() {
      return {
        tableId: this.$route.params.id || '',
        auditId: this.$route.params.auditId || '',
        auditStep: this.$route.params.auditStep || '',
        auditStatus: this.$route.params.auditStatus || '',
        timelines: [],
        isPass: true
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.tableId && this.tableId !== '0') {
        fetch('get', api.terminalInfoGetDetail + this.tableId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
        })
        fetch('get', api.terminalAuditInfo + this.tableId, {}, this).then((res) => {
          this.timelines = res.data
        })
      }
    },
    methods: {
      onSave() {
        const app = this.$f7
        if (this.tableId && this.auditId && this.auditStep) {
          let formData = app.form.convertToData('#audit-form')
          formData['tableId'] = this.tableId
          formData['id'] = this.auditId
          formData['auditStep'] = this.auditStep
          formData['auditResult'] = formData['auditResult'] ? '1' : '0'
          formData['auditType'] = 'merchantTerminal'
          fetch('post', api.terminalAuditForm, formData, this).then((res) => {
            this.$router.replace('/zdylsp-list')
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
  .zdylsp
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
