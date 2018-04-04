const APIV1 = '/cashier';
//const APIV1 = 'http://192.168.18.17/cashier';

module.exports = {
  
  api: {
    get_customer_list: `${APIV1}/customer/service/unfinish`, //获取客户列表  
    get_customerById: `${APIV1}/customer/service/get`,  //获取客户详细信息 通过serviceid
  },
}
