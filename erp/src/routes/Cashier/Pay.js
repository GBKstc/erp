import { connect } from 'dva';
import {Cashier} from '../../components';

const {PayCustomerDetalis,PayTable,PayForm} = Cashier;

const Pay = (aaaa) => {
    console.log(aaaa);
    return (
        <div>
           <PayCustomerDetalis/>
           <PayTable/>
           <PayForm/>
        </div>
    );
};

export default connect(({app,pay})=>({app}))(Pay);