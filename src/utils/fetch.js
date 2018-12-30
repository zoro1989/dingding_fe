import axios from 'axios'
import { apiStatus } from '@/config'
import EventBus from 'common/js/event-bus'

axios.defaults.withCredentials = true
let fetch = (type, url, params, vm, isFormData = true, showMessage = false) => {
  let service = axios.create({
    timeout: 20000
  })

  axios.defaults.headers.post['Content-Type'] = isFormData ? 'multipart/form-data;charset=utf-8' : 'application/json;charset=utf-8'
  service.interceptors.request.use(config => {
    // 需要token的在这里生成
    // config.headers['X-Token'] = 'tokenStr'
    return config
  }, error => {
    console.log('request error', error)
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    // 如果服务器出错，做出相应的处理，response.data后面的内容根据后端接口修改
    let res = response.data
    if (res.code !== apiStatus.success) {
      let toast = vm.$f7.toast.create({
        text: '错误：' + res.message,
        position: 'center',
        closeTimeout: 2000
      })
      toast.open()
      if (res.code === 50001 || res.code === 50002 || res.code === 50003) {
        EventBus.isNeedLogin = true
        vm.$router.replace('/login')
      } else {
        return Promise.reject(res)
      }
    } else {
      return res
    }
  }, error => {
    console.log('response error', error)
    let toast = vm.$f7.toast.create({
      text: '服务器出错：' + error,
      position: 'center',
      closeTimeout: 2000
    })
    toast.open()
    return Promise.reject(error)
  })

  let p = {
    url: url,
    method: type
  }
  if (type === 'get') {
    p.params = params
  } else {
    if (isFormData) {
      let fd = new FormData()
      for (let o in params) {
        fd.append(o, params[o])
      }
      p.data = fd
    } else {
      p.data = JSON.stringify(params)
    }
  }

  return service(p)
}

export default fetch
