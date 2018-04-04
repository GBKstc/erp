import { connect } from 'dva';
import {Cashier} from '../../components';

const { PayCustomerDetalis, PayTable, RepairPayForm, PayMarket, PayButton, PayModal} = Cashier;

const Pay = (aaaa) => {
    console.log(aaaa);
    return (
        <div>
            <PayCustomerDetalis/>
            <PayTable/>
            <RepairPayForm/>
            <PayMarket />
            <PayButton />
            <PayModal />
        </div>
    );
};

export default connect(({cashier,app,pay})=>({cashier,app,pay}))(Pay);