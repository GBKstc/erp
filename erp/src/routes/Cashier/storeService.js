import { connect } from 'dva';
import {Cashier} from '../../components';

const {CustomerList,CustomerDetalis} = Cashier;

const StoreService = ({}) => {
    return (
        <div>
            <CustomerList/>
            <CustomerDetalis/>
        </div>
    );
};

export default connect()(StoreService);