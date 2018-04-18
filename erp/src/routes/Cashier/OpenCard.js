import { connect } from 'dva';
// import { Cashier,BaseUI } from '../../components';
import BaseUI from '../../components/BaseUI';
import Cashier from '../../components/Cashier';

import { config, request, variable } from '../../utils';
const { api } = config;
const { isEmpty, money2Big } = variable;
const { PayCustomerDetalis, OpenCardInfo, OpenCardDiscount, OpenCardTable, PayMarket} = Cashier;
const {BaseButton} = BaseUI;
const OpenCard = ({ cashier}) => {
    console.log(cashier);
    const { openCardState } = cashier;
    return (
        <div>
            <PayCustomerDetalis />
            <OpenCardInfo/>
            <OpenCardDiscount/>
            <OpenCardTable title="赠送物品" dataSource={isEmpty(openCardState.cardRanksInfoData.goods) ? null : openCardState.cardRanksInfoData.goods}/>
            <OpenCardTable title="赠送项目" dataSource={isEmpty(openCardState.cardRanksInfoData.projects) ? null : openCardState.cardRanksInfoData.projects}/>
            <PayMarket/>
            <BaseButton okText="确认开卡"/>
        </div>
    );
};

export default connect(({ cashier }) => ({ cashier }))(OpenCard);