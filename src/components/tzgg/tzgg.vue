<template>
  <transition name="slide">
    <div class="lsmdsp">
      <div class="apply-form">
        <div>
          <form class="list" id="apply-form">
            <ul>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">标题</div>
                    <div class="item-input-wrap">
                      <input type="text" name="title" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div class="item-content item-input">
                  <div class="item-inner">
                    <div class="item-title item-label">时间</div>
                    <div class="item-input-wrap">
                      <input type="text" name="createTime" placeholder="无" readonly>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </form>
        </div>
      </div>
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
        tableId: this.$route.params.id || '',
        isPass: true
      }
    },
    mounted() {
      const self = this
      const app = self.$f7
      if (this.tableId && this.tableId !== '0') {
        fetch('get', api.chainCustomInfoGetDetail + this.tableId, {}, this).then((res) => {
          app.form.fillFromData('#apply-form', res.data)
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
  .lsmdsp
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
