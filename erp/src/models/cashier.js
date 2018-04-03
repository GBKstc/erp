import request from '../utils/request';
import {
  getCustomerList,
  getCustomerById
} from '../services/cashier'

const Cashier = {
  namespace: "cashier",

  state: {
    list: [],
    visibleModal: false,
    customerList: [],
    customerDetalis: {},
    isSelect:[],
  },
  reducers: {
    saveUser(state, {
      payload: {
        data: list
      }
    }) {
      return {
        ...state,
        list
      };
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
    * queryUser({}, {
      call,
      put
    }) {
      const {
        data
      } = yield call(request, {
        url: '/api/users',
        method: 'GET'
      });
      yield put({
        type: 'saveUser',
        payload: {
          data
        }
      });
    },
    * queryCustomer({}, {
      call,
      put
    }) {
      const {
        data
      } = yield call(getCustomerList);
      yield put({
        type: 'saveCustomerList',
        payload: {
          data
        }
      });
    },
    * getCustomerById({
      payload
    }, {
      call,
      put
    }) {
      const {
        data
      } = yield call(getCustomerById, payload);
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
        dispatch({
          type: 'queryUser'
        });
        dispatch({
          type: 'queryCustomer'
        });
      });
    }
  }
};

export default Cashier;
