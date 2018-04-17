import { connect } from 'dva';
// import { Cashier,BaseUI } from '../../components';
import BaseUI from '../../components/BaseUI';
import Cashier from '../../components/Cashier';
console.log(BaseUI,Cashier);
const { PayCustomerDetalis, OpenCardInfo, OpenCardDiscount, OpenCardTable, PayMarket} = Cashier;
const {BaseButton} = BaseUI;
const OpenCard = (aaaa) => {
    //console.log(aaaa);
    return (
        <div>
            <PayCustomerDetalis />
            <OpenCardInfo/>
            <OpenCardDiscount/>
            <OpenCardTable title="赠送物品"/>
            <OpenCardTable title="赠送项目"/>
            <PayMarket/>
            <BaseButton okText="确认开卡"/>
        </div>
    );
};

export default connect(({ cashier }) => ({ cashier }))(OpenCard);