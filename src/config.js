// let apiPath = '/api/';
// let apiPath = 'http://47.95.14.172:8088/web/';
// let apiPath = 'http://rancode.jymenu.com/';
let apiPath = '/'
const api = {
  // 登录
  authLogin: apiPath + 'dingtalk/auth/login',
  dingtalkAuth: apiPath + 'dingtalk/auth/',
  selfFunc: apiPath + 'api/base/self/func',
  // 同步位置
  terminalUploadLocation: apiPath + 'merchants/terminal/info/uploadLocation/',
  chaintotalUploadLocation: apiPath + 'merchants/chaintotal/info/uploadLocation/',
  chainCustomUploadLocation: apiPath + 'merchants/chainCustom/info/uploadLocation/',
  // 终端医疗
  terminalInfo: apiPath + 'merchants/terminal/info/',
  terminalInfoSave: apiPath + 'merchants/terminal/info/save',
  terminalInfoGetDetail: apiPath + 'merchants/terminal/info/getDetail/',
  // 终端医疗审批列表
  terminalInfoApprove: apiPath + 'merchants/terminal/info/approve/',
  // 流转列表
  terminalAuditInfo: apiPath + 'merchants/auditInfo/info/form/merchantTerminal/',
  // 连锁总部
  chaintotalInfo: apiPath + 'merchants/chaintotal/info/',
  chaintotalInfoSave: apiPath + 'merchants/chaintotal/info/save',
  chaintotalInfoGetDetail: apiPath + 'merchants/chaintotal/info/getDetail/',
  // 连锁总部审批列表
  chaintotalInfoApprove: apiPath + 'merchants/chaintotal/info/approve/',
  // 流转列表
  chainTotalAuditInfo: apiPath + 'merchants/auditInfo/info/form/chainTotal/',
  // 连锁门店
  chainCustomInfo: apiPath + 'merchants/chainCustom/info/',
  chainCustomInfoSave: apiPath + 'merchants/chainCustom/info/save',
  chainCustomInfoGetDetail: apiPath + 'merchants/chainCustom/info/getDetail/',
  // 连锁门店审批列表
  chainCustomInfoApprove: apiPath + 'merchants/chainCustom/info/approve/',
  // 流转列表
  chainCustomAuditInfo: apiPath + 'merchants/auditInfo/info/form/chainCustom/',

  // 审批
  terminalAudit: apiPath + 'merchants/auditInfo/info/commitNextApproveUser',
  // 审批表单
  terminalAuditForm: apiPath + 'merchants/auditInfo/info/approveNextApproveUser',

  // 通知公告
  noticeInfoList: apiPath + 'api/notice/info/AllTop/',
  noticeInfo: apiPath + 'api/notice/info/',

  // 我的消息
  msgList: apiPath + 'api/msg/top',

  // 要货管理
  requireGoodsInfo: apiPath + 'merchants/requireGoods/info/',
  requireGoodsInfoSave: apiPath + 'merchants/requireGoods/info/save',
  requireGoodsInfoGetDetail: apiPath + 'merchants/requireGoods/info/',
  // 要货管理审批列表
  requireGoodsInfoApprove: apiPath + 'merchants/requireGoods/info/approve/',
  // 流转列表
  requireGoodsAuditInfo: apiPath + 'merchants/auditInfo/info/form/requireGoods/',

  // 调货管理
  arrangeGoodsInfo: apiPath + 'merchants/arrangeGoods/info/',
  arrangeGoodsInfoSave: apiPath + 'merchants/arrangeGoods/info/save',
  arrangeGoodsInfoGetDetail: apiPath + 'merchants/arrangeGoods/info/',
  // 调货管理审批列表
  arrangeGoodsInfoApprove: apiPath + 'merchants/arrangeGoods/info/approve/',
  // 流转列表
  arrangeGoodsAuditInfo: apiPath + 'merchants/auditInfo/info/form/arrangeGoods/',

  // 退货管理
  returnGoodsInfo: apiPath + 'merchants/returnGoods/info/',
  returnGoodsInfoSave: apiPath + 'merchants/returnGoods/info/save',
  returnGoodsInfoGetDetail: apiPath + 'merchants/returnGoods/info/',
  // 退货管理审批列表
  returnGoodsInfoApprove: apiPath + 'merchants/returnGoods/info/approve/',
  // 流转列表
  returnGoodsAuditInfo: apiPath + 'merchants/auditInfo/info/form/returnGoods/',

  // 查找货商信息
  findMerchants: apiPath + 'merchants/requireGoods/info/findMerchants',
  // 查找产品信息
  goodsAutoFindInfo: apiPath + 'merchants/requireGoods/info/goodsAutoFindInfo',
  // 获取要货人分公司支公司信息
  findRequireGoodsUserBaseInfo: apiPath + 'merchants/requireGoods/info/findRequireGoodsUserBaseInfo'
}

const apiDict = {

}

const apiStatus = {
  success: 0
}

export { api, apiDict, apiStatus }
