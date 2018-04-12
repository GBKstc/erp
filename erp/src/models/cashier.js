import request from '../utils/request';
import {
  getCustomerList,
  getCustomerById,
  getcardInfoById,
  queryLoginInfo
} from '../services/cashier'
let customerList = [
    {
    "customerid": 88824,
    "customermobile": "13867443111",
    "customername": "钟丽菁",
    "customercode": "88824",
    "cardno": "H001794x",
    "serviceid": 63324,
    "servicestatus": 0
  }, {
    "customerid": 193475,
    "customermobile": "13868113383",
    "customername": "庞凯",
    "customercode": "193475",
    "cardno": "m001908",
    "serviceid": 63387,
    "servicestatus": 0
  }, {
    "customerid": 47557,
    "customermobile": "13758222879",
    "customername": "夏晓群",
    "customercode": "47557",
    "cardno": "g000925x",
    "serviceid": 63437,
    "servicestatus": 0
  }, {
    "customerid": 46607,
    "customermobile": "18857882556",
    "customername": "徐航",
    "customercode": "46607",
    "cardno": "g000563",
    "serviceid": 63442,
    "servicestatus": 0
  }, {
    "customerid": 47835,
    "customermobile": "13958079520",
    "customername": "A杨虹",
    "customercode": "47835",
    "cardno": "g000915X",
    "serviceid": 63448,
    "servicestatus": 0
  }, {
    "customerid": 47587,
    "customermobile": "13588826929",
    "customername": "谭洁",
    "customercode": "47587",
    "cardno": "F000864",
    "serviceid": 63536,
    "servicestatus": 0
  }, {
    "customerid": 47543,
    "customermobile": "13858010699",
    "customername": "A陆岩（备）",
    "customercode": "47543",
    "cardno": "026773",
    "serviceid": 63581,
    "servicestatus": 0
  }, {
    "customerid": 268593,
    "customermobile": "15967563906",
    "customername": "小六",
    "customercode": "gkb000037",
    "cardno": "ASB0020",
    "serviceid": 64000,
    "servicestatus": 0
  }, {
    "customerid": 10000010,
    "customermobile": "15868158503",
    "customername": "高炳快",
    "customercode": "gkb000023",
    "cardno": "G0147852",
    "serviceid": 64108,
    "servicestatus": 0
  }
];
const Cashier = {
  namespace: "cashier",
  state: {
    list: [],
    visibleModal: {
      PayModal:false,
      BuySelectModal:false,
    },
    modalTitle:"",
    customerList: [],
    customerDetalis: {},
    isSelect:[],
    logininfo:{},
    //支付页面所有数据
    payState:{
      /**
       * PayFrom页面参数
       */
      payTypeList:[],
      bigNum:null,
      //验证提示
      verifyInfo:{
        voucher:null,
        money:null,
      },
      //customerDetalis,
      //选择的支付方式
      selectPayType:{},
      //充值账户
      rechargeRccount:'emei',
      recharge_info:{
        'emei':0,
        'shengmei':0
      },
      pay:{
        cer:null,   //凭证码
        payamount:null,  //支付金额
        type:undefined //支付方式
      },
      /**
       * PayMarket页面参数
       */
      showIntroduce:false,

      //销售部门美容师和顾问选项
      saleStaffList:[],
      //介绍部门选项
      introduceList:[],
      //介绍部门美容师和顾问选项
      introduceStaffList:[],
      depart_info:{
        sale: null, //销售部门ID
        sale_proportion: 100, //销售部门提成比例
        introduce: null, //介绍部门ID
        introduce_proportion: null //介绍部门提成比例
      },
      //销售顾问
      sale_ad_info: [{
        "sale": undefined,
        "sale_proportion": null
      }],
      //销售美容师
      sale_beauty_info: [{
        "sale": undefined,
        "sale_proportion": null
      }],
      //介绍顾问
      introduce_ad_info:[{
        "introduce": undefined,
        "introduce_proportion": null
      }],
      //介绍美容师
      introduce_beauty_info:[{
        "introduce": undefined,
        "introduce_proportion": null
      }],
    },
  },
  reducers: {
    //关闭模态框
    closeModal(state,{
      payload: {
        key
      }
    }){
      const { visibleModal} = state;
      visibleModal[key] = false;
      return {
        ...state,
        visibleModal
      };
    },
    //打开模态框
    openModal(state, {
      payload: {
        key,
        ModalTitle
      }
    }) {
      let { visibleModal, modalTitle } = state;
      console.log(key, ModalTitle);
      visibleModal[key] = true;
      modalTitle = ModalTitle;
      return {
        ...state,
        visibleModal,
        modalTitle
      };
    },
    saveData(state,{
      payload: {
        data,
        key,
      }
    }){
      console.log(data,key);
      state[key] = data;
      return {
        ...state,
      }
    },
    saveCustomerList(state, {
      payload: {
        data: customerList
      }
    }) {
      return {
        ...state,
        customerList
      };
    },
    saveCustomer(state, {
      payload: {
        data: customerDetalis
      }
    }) {
      return {
        ...state,
        customerDetalis
      };
    },
    selectCustomer(state,{
      payload:{key}
    }){
      let isSelect = [];
      console.log(key);
      isSelect[key] = true;
      return {
        ...state,
        isSelect
      };
    }
  },
  effects: {
    * queryCustomer({}, {
      call,
      put
    }) {
      let { data } = yield call(getCustomerList);
      //暂时写死数据
      data = customerList;
      yield put({
        type: 'saveCustomerList',
        payload: {
          data,
        }
      });
    },
    * queryLoginInfo({ }, {
        call,
        put
      }) {
      let { data } = yield call(queryLoginInfo);
        yield put({
          type: 'saveData',
          payload: {
            data,
            key:"logininfo"
          }
        });
      },
    * getCustomerById({
      payload
    }, {
      call,
      put
    }) {
      const { data:customerDetalis } = yield call(getCustomerById, payload);
      const { data:cardInfo } = yield call(getcardInfoById,{cardid:customerDetalis.cardid});
      const data = Object.assign({}, customerDetalis, cardInfo);
      yield put({
        type: 'saveCustomer',
        payload: {
          data
        }
      });
    },
    * create({
      payload: {
        user
      }
    }, {
      call,
      put
    }) {
      yield call(request, {
        url: '/api/users',
        body: JSON.stringify(user),
        method: 'POST'
      });
      yield put({
        type: 'queryUser',
        payload: {}
      });
    }
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {

      console.log('running subscriptions ...');
      return history.listen(({
        pathname,
        search
      }) => {

        console.log(`pathname: ${pathname}`);
        if (pathname === "/cashier/storeService"){
          dispatch({
            type: 'queryCustomer'
          });
          dispatch({
            type: 'queryLoginInfo'
          });
        } 
      });
    }
  }
};

export default Cashier;
