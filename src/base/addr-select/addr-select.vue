<template>
  <transition name="slide">
    <div class="addr-select" v-show="isShow">
      <div class="navbar">
        <div class="navbar-inner">
          <div class="left">
            <a href="#" class="link external map-btn-cancel" @click="modalCancel">取消</a>
          </div>
          <div class="title">选择药店地址</div>
          <div class="right">
            <a href="#" class="link external map-btn-confirm" @click="modalConfirm">确定</a>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="address-text card-content card-content-padding">
          <input type="text" name="shopName" placeholder="药店地址" v-model="mapAddr" style="width: 100%">
        </div>
      </div>
      <f7-searchbar
        placeholder="搜索药店"
        disable-button-text="取消"
        @change="doSearch"
      ></f7-searchbar>
      <div id="allmap" style="width: 100%; height: calc(100% - 44px);"></div>
      <div class="scroll-addr">
        <cube-scroll :data="addressList">
          <f7-list media-list>
            <f7-list-item @click="addrItemClick(item)" v-for="item in addressList" :key="item.uid" :title="item.title" :subtitle="item.address">
              <i slot="media" class="fa fa-location-arrow text-color-red" />
            </f7-list-item>
          </f7-list>
        </cube-scroll>
      </div>
    </div>
  </transition>
</template>
<script>
  import { f7Page, f7List, f7ListItem, f7Searchbar } from 'framework7-vue'
  import BMap from 'BMap'
  export default {
    components: {
      f7Page,
      f7List,
      f7ListItem,
      f7Searchbar
    },
    data() {
      return {
        markersArray: [],
        mapAddr: '',
        longitude: '',
        latitude: '',
        addressList: [],
        isMapClick: false,
        isShow: false
      }
    },
    mounted() {
      const self = this

      this.map = new BMap.Map('allmap')
      this.geoc = new BMap.Geocoder()
      let geolocation = new BMap.Geolocation()
      let point = new BMap.Point(116.404412, 39.914714)
      this.map.centerAndZoom(point, 14)
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() === 0) {
          self.addMarker(r.point)
          self.map.panTo(r.point)
          self.map.enableScrollWheelZoom(true)
        } else {
          alert('failed' + this.getStatus())
        }
      }, {enableHighAccuracy: true})
      this.map.addEventListener('click', this.showInfo)
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      },
      modalCancel() {
        this.hide()
      },
      modalConfirm() {
        this.$emit('addrchange', {addr: this.mapAddr, lng: this.longitude, lat: this.latitude})
        this.hide()
      },
      // 清除标识
      clearOverlays() {
        if (this.markersArray) {
          for (let i in this.markersArray) {
            this.map.removeOverlay(this.markersArray[i])
          }
        }
      },
      // 地图上标注
      addMarker(point) {
        let marker = new BMap.Marker(point)
        this.markersArray.push(marker)
        this.clearOverlays()
        this.map.addOverlay(marker)
      },
      // 点击地图时间处理
      showInfo(e) {
        this.isMapClick = true
        this.geoc.getLocation(e.point, (rs) => {
          let addComp = rs.addressComponents
          let address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber
//          var lng = e.point.lng
//          var lat =  e.point.lat
          this.mapAddr = address
          this.longitude = e.point.lng
          this.latitude = e.point.lat
        })
        this.addMarker(e.point)
      },
      doSearch(e) {
        this.addressList = []
        const local = new BMap.LocalSearch(this.map, {renderOptions: { map: this.map, autoViewport: true }})
        local.search(e.target.value)
        let _this = this
        local.setSearchCompleteCallback(function(results) {
          // 判断状态是否正确
          if (local.getStatus() === 0) {
            for (let i = 0; i < results.getCurrentNumPois(); i++) {
              let poi = results.getPoi(i)
              _this.addressList.push({
                address: poi.address,
                lng: poi.lng,
                lat: poi.lat
              })
            }
          }
        })
        console.log(this.addressList)
      },
      addrItemClick(item) {
        let point = new BMap.Point(item.lng, item.lat)
        this.addMarker(point)
        this.mapAddr = item.address
        this.longitude = item.lng
        this.latitude = item.lat
      }
    }
  }
</script>
<style scoped lang="stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(0, 100%, 0)
  .addr-select
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: #fff
    z-index: 2
    .card
      z-index: 500
      background: #fff!important
      margin: 0!important
      padding: 10px
    .scroll-addr
      position: absolute
      z-index: 1
      bottom: 0
      left: 0
      width: 100%
      height: 100px
      transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
      .cube-scroll-wrapper
        overflow: visible
      .fa
        font-size: 20px
        padding-top: 8px
      .item-content
        align-items: center!important
</style>
