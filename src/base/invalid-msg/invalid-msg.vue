<template>
  <div class="item-input-invalid" v-if="show">
    <div class="item-input-error-message">{{show}}</div>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      msg: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        show: ''
      }
    },
    watch: {
      value(newValue) {
        if (!newValue) {
          this.show = this.msg || '请填写此字段。'
        } else {
          this.show = ''
        }
      }
    },
    methods: {
      valid() {
        if (!this.value) {
          this.show = this.msg || '请填写此字段。'
        } else {
          this.show = ''
        }
      }
    }
  }
</script>
