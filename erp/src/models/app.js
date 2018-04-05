import request from '../utils/request';
import {
  getCustomerList,
  getCustomerById
} from '../services/cashier'

const App = {
  namespace: "app",

  state: {
    menu: [
      {
        id: 1,
        name: '收银',
        router: '/cashier',
        grade:1
      },
      {
        id: 2,
        name: '到店服务',
        router: '/storeService',
        grade:2
      },
      {
        
      }
    ],
  },
  reducers: {
    
  },
  effects: {
    
  },
  subscriptions: {
    
  }
};

export default App;
