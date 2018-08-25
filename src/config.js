// let apiPath = '/api/';
// let apiPath = 'http://47.95.14.172:8088/web/';
// let apiPath = 'http://rancode.jymenu.com/';
let apiPath = '/'
const api = {
  terminalInfo: apiPath + 'merchants/terminal/info/',
  authLogin: apiPath + 'dingtalk/auth/login',
  dingtalkAuth: apiPath + 'dingtalk/auth',
  terminalInfoSave: apiPath + 'merchants/terminal/info/save',
  terminalInfoGetDetail: apiPath + 'merchants/terminal/info/getDetail/'
}

const apiDict = {

}

const apiStatus = {
  success: 0
}

export { api, apiDict, apiStatus }
