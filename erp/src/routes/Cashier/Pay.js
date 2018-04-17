import React from 'react';
import { connect } from 'dva';
import Cashier from '../../components/Cashier';
import {message} from 'antd';
import {config,request,variable} from '../../utils';
const {isEmpty,removeEmpty}  = variable;
const { PayCustomerDetalis, PayTable, PayForm, PayMarket, PayButton, PayModal} = Cashier;
const {api} = config;
class Pay extends React.Component{
    constructor(props){
        super(props);
        // this.payFormChange = this.payFormChange.bind(this);
        // this.payMarketChange = this.payMarketChange.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.formValidation = this.formValidation.bind(this);
        this.payRequest = this.payRequest.bind(this);
        this.state = {};
        //pay页面别的模块数据
        this.oldState = this.props.cashier.payState;
        //payMarket模块数据
        this.oldMarketState = this.props.cashier.marketInfo;
    }

    onChange(key,newState){
        switch (key) {
          case "payMarket":
            this.oldMarketState = Object.assign({},this.oldState,newState);
          case "payForm":
            this.oldState = Object.assign({},this.oldState,newState);
        }
    }

    onClick(){
        const data = Object.assign({},this.oldState,this.oldMarketState);
        if(this.formValidation(data)){

            if(this.oldState.isButton){
              this.oldState.isButton = false;
              this.props.dispatch({
                type: 'cashier/saveData',
                payload: {
                  data:Object.assign({},{...this.oldState}),
                  key:"payState"
                }
              });
              this.props.dispatch({
                type: 'cashier/saveData',
                payload: {
                  data:Object.assign({},{...this.oldMarketState}),
                  key:"marketInfo"
                }
              });
              this.payRequest();
            }


        }else {
            message.info("请正确填写内容");
        }
      this.props.dispatch({
        type: 'cashier/saveData',
        payload: {
          data:Object.assign({},{...this.oldState}),
          key:"payState"
        }
      });
      this.props.dispatch({
        type: 'cashier/saveData',
        payload: {
          data:Object.assign({},{...this.oldMarketState}),
          key:"marketInfo"
        }
      });

    }

    formValidation(data){
        console.log(data);
        const {verifyInfo,depart_info,showIntroduce} = data;

        if(isEmpty(data)) {
            return false;
        }
        //payForm没提醒
        if(isEmpty(verifyInfo)||verifyInfo.money!==""||verifyInfo.voucher!==""){
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
        return true;
    }

    payRequest(){
      let { cashier } = this.state;
      let { customerDetalis } = this.props.cashier;
      let {pay} = this.oldState;
      let {depart_info} = this.oldMarketState;
      if( isEmpty(depart_info.introduce) ){
        delete depart_info.introduce;
        delete depart_info.introduce_proportion;
      }
      for(let key in pay){
        if(isEmpty(pay[key])){
          delete pay[key];
        }
      }
      let reqData = {
        //卡ID
        "cardid":customerDetalis.cardid,
        "serviceid":customerDetalis.serviceid,
        "depart_info":depart_info,
        "sale_beauty_info":this.oldMarketState.sale_beauty_info,
        // "introduce_beauty_info":[
        //   {
        //     "introduce":"介绍美容师ID",
        //     "introduce_proportion":"介绍美容师提成比例"
        //   }
        // ],
        "sale_ad_info":this.oldMarketState.sale_ad_info,
        // "introduce_ad_info":[
        //   {
        //     "introduce":"介绍顾问ID",
        //     "introduce_proportion":"介绍顾问提成比例"
        //   }
        // ],
        "recharge_info":this.oldState.recharge_info,
        "pay":this.oldState.pay,
        //payMethod:'offline'
      };
      request({
        url:api.recharge,
        data:reqData
      }).then(({data})=>{
        if(isEmpty(data)){
          message.info("网络错误,请重试");
        }else if(this.oldState.pay.type=="00"){
          //支付宝微信银联支付
          const key = "PayModal";
          this.oldState.ordernoId = data.orderno;
          this.props.dispatch(
            {
              type:'cashier/saveData',
              payload:{
                payload: {
                  data:Object.assign({},{...this.oldState}),
                  key:"payState"
                }
              }
            }
          );
          this.props.dispatch(
            {
              type:'cashier/saveData',
              payload:{
                payload: {
                  data:Object.assign({},{...this.oldMarketState}),
                  key:"marketInfo"
                }
              }
            }
          );
          this.props.dispatch({
            type: 'cashier/openModal',
            payload: {
              key
            }
          });

        }else {
          message.success("充值成功！");
          this.oldState.isButton = true;
          this.props.dispatch({
            type: 'cashier/saveData',
            payload: {
              data:Object.assign({},{...this.oldState}),
              key:"payState"
            }
          });
          this.props.dispatch(
            {
              type:'cashier/saveData',
              payload:{
                payload: {
                  data:Object.assign({},{...this.oldMarketState}),
                  key:"marketInfo"
                }
              }
            }
          );
        }
        console.log(data);
      })
    }

    render(){
        return (
            <div>
                <PayCustomerDetalis/>
                <PayTable/>
                <PayForm onChange={this.onChange.bind(this,"payForm")}/>
                <PayMarket onChange={this.onChange.bind(this,"payMarket")}/>
                <PayButton onClick={this.onClick} />
                {/* <BaseButton onClick={this.onClick}/> */}
            </div>
        )
    }
}

export default connect(({cashier})=>({cashier}))(Pay);
