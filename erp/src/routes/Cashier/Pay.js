import React from 'react';
import { connect } from 'dva';
import {Cashier} from '../../components';
import {message} from 'antd';

import {config,request,variable} from '../../utils';
const {isEmpty}  = variable;
const { PayCustomerDetalis, PayTable, PayForm, PayMarket, PayButton, PayModal} = Cashier;

class Pay extends React.Component{
    constructor(props){
        super(props);
        //console.log(props);
        // this.payFormChange = this.payFormChange.bind(this);
        // this.payMarketChange = this.payMarketChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.state = {
            // "payMethod": null,
            // "remark": null,
            // "cardid": null,
            // "serviceid": null,
            // "depart_info": null,
            // "sale_beauty_info": null,
            // "sale_ad_info": null,
            // "introduce_beauty_info": null,
            // "introduce_ad_info": null,
            // "recharge_info": null,
            // "pay": null
        };
        this.oldState = {};
    }

    onChange(newState){

        let data = Object.assign({},this.oldState,newState);
        this.oldState = data;
        console.log(data);


    }



    onClick(){
        const data = this.oldState;
        const key = "PayModal";
        if(this.formValidation(data)){
            this.props.dispatch({
                type: 'cashier/saveData',
                payload: {
                    data,
                    key:"payState"
                }
            });
            this.props.dispatch({
                type: 'cashier/openModal',
                payload: {
                    key
                }
            })
        }else {
            message.info("请正确填写内容");
        }

    }

    formValidation(data){
        console.log(data);
        const {verifyInfo,depart_info,showIntroduce} = data;

        if(isEmpty(data)) {
            return false;
        }
        //payForm没提醒
        if(verifyInfo.money!==""||verifyInfo.voucher!==""){
            return false;
        }
        //有推荐部门
        if(showIntroduce){
            if(isEmpty(depart_info.sale)||((depart_info.introduce_proportion+depart_info.sale_proportion)!==100)){
                return false;
            }
        }else{
            if(depart_info.sale_proportion!=100){
                return false;
            }
        }
        return false;
    }
    
    render(){
        return (
            <div>
                <PayCustomerDetalis/>
                <PayTable/>
                <PayForm onChange={this.onChange}/>
                <PayMarket onChange={this.onChange}/>
                <PayButton onClick={this.onClick} />
                <PayModal />
            </div>
        )
    }
}

export default connect(({cashier})=>({cashier}))(Pay);