import { connect } from 'dva';
import { Cashier } from '../../components';

const { PayCustomerDetalis, BuySelectBox, BuySelectModal, BuyButton } = Cashier;

const Buy = (aaaa) => {
    console.log(aaaa);
    return (
        <div>
            <PayCustomerDetalis />
            <BuySelectBox title="购买物品" content="请选择要购买的物品~" buyModalTitle="新增购买物品"/>
            <BuySelectBox title="购买项目" content="请选择要购买的项目~" buyModalTitle="新增购买项目"/>
            <BuySelectBox title="购买疗程" content="请选择要购买的疗程~" buyModalTitle="新增购买疗程"/>
            <BuySelectBox title="购买促销方案" content="请选择要购买的促销方案~" buyModalTitle="新增购买促销方案"/>
            <BuyButton/>
            <BuySelectModal/>
        </div>
    );
};

export default connect(({ cashier }) => ({ cashier }))(Buy);