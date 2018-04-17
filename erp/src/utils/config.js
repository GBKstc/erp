
module.exports = {

  api: {
    login: '/customer/service/unfinish',//登录

    logininfo:'/cashier/user/logininfo', //获取登录者信息

    get_customer_list: '/cashier/customer/service/unfinish', //获取客户列表
    get_customerById: '/cashier/customer/service/get',  //获取客户详细信息 通过serviceid
    getRechargerecord: '/cashier/service/card/rechargerecord',//获取客户本次充值记录 通过serviceid
    payTypeList: '/cashier/company/payTypeList',//获取支付方式
    cardInfo: '/cashier/card/info',//获取卡详细信息
    ticketCodeQuery: '/cashier/ticketCode/query',//获取支付码金额
    findDepStroe:'/erp-set/user/findDepStroe',//获取门店列表
    findDepStroeStaff:'/erp-set/user/findUser',//获取门店店员
    recharge:'/cashier/service/card/recharge',//支付接口
    paystatusCheck:'/cashier/service/recharge/paystatus/check',//支付状态验证接口


    chargemoneyBycer:'/cashier/service/supplement/chargemoney/bycer',//补充值验证接口
    supplementRecharge:'/cashier/service/supplementrecharge',//补充值接口
  },
}
