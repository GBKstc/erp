import request from '../utils/request';
import { getCustomerList,getCustomerById } from '../services/cashier'

const Cashier={
    namespace:"cashier",

    state:{
        list:[],
        visibleModal:false,
        customerList: [],
        customerDetalis: {},
    },
    reducers:{
        saveUser(state,{ payload:{ data:list } }){
            return {
                ...state,
                list
            };
        },
        saveCustomer(state,{ payload:{ data:customerList } }){
            return {
                ...state,
                customerList
            };
        }
    },
    effects:{
        * queryUser({},{ call,put }){
            const { data }=yield call(request,'/api/users',{ method:'GET' });
            yield put({type:'saveUser',payload:{ data }});
        },
        * queryCustomer({},{ call,put }){
            const { data }=yield call(getCustomerList);
            yield put({type:'save',payload:{ data }});
        },
        * create({ payload:{ user } },{ call,put }){
            yield call(request,'/api/users',{ 
                body:JSON.stringify(user),
                method:'POST'
            });
            yield put({type:'query',payload:{  }});
        }
    }, 
    subscriptions:{
        setup({ dispatch,history }){

            console.log('running subscriptions ...');
            return history.listen(({ pathname,search })=>{

                console.log(`pathname: ${pathname}`);
                dispatch({ type:'queryUser'});
                dispatch({ type:'queryCustomer'});
            });
        }
    }
};

export default Cashier;