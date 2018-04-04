import { connect } from 'dva';
import {Cashier} from '../../components';

const { PayCustomerDetalis, PayTable, PayForm, PayMarket, PayButton, PayModal} = Cashier;

const Pay = (aaaa) => {
    console.log(aaaa);
    return (
        <div>
            <PayCustomerDetalis/>
            <PayTable/>
            <PayForm/>
            <PayMarket />
            <PayButton />
            <PayModal />
        </div>
    );
};

export default connect(({cashier})=>({cashier}))(Pay);