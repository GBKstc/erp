import {request,variable} from '../utils';
import {
  getCustomerList,
  getCustomerById
} from '../services/cashier'
const { SetCookie, getCookie } = variable;
const App = {
  namespace: "app",

  state: {

  },
  reducers: {
    
  },
  effects: {
    * login({ }, {
      call,
      put
    }) {
      const param = {
        account: "gaojie7183",
        pwd: "a123456",
        companyId: "1",
      };
      const {
        data
      } = yield call(request, {
        url: '/erp-set/index/login',
        method: 'post',
        data: param
      });
      let power = [];
      let arr = data.authList
      for (var i in arr) {
        power.push(arr[i].code);
      }
      // SetCookie("powerName", power);
      // SetCookie("accountName", param.account);
      console.log(data);
    },
    // * logininfo({ }, {
    //   call,
    //   put
    // }) {
      
    //   const {
    //     data
    //   } = yield call(request, {
    //       url: 'http://localhost/cashier/user/logininfo',
    //     method: 'post',
    //   });
    //   // let power = [];
    //   // let arr = data.authList
    //   // for (var i in arr) {
    //   //   power.push(arr[i].code);
    //   // }
    //   // SetCookie("powerName", power);
    //   // SetCookie("accountName", param.account);
    //   console.log(data);
    // },
  },
  subscriptions: {
    setup({
      dispatch,
      history
    }) {

      console.log('running App...');
      return history.listen(({
        pathname,
        search
      }) => {
        if (pathname === "/cashier") {
          dispatch({
            type: 'login'
          });
        }
        
      });
    }
  }
};

export default App;
