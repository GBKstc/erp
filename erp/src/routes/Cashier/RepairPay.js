import { connect } from 'dva';
import {Cashier} from '../../components';
import React from 'react';
import {message} from "antd";
import {config,request,variable} from '../../utils';

const {isEmpty} = variable;
const {api} = config;

const { PayCustomerDetalis, PayTable, RepairPayForm, PayMarket, PayButton, PayModal} = Cashier;

class RepairPay extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.onChange = this.onChange.bind(this);
    this.setNewChange = this.setNewChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.repairPayRequest = this.repairPayRequest.bind(this);

      //repairPay 数据
    this.oldState = this.props.repairPayState;
      //payMarket模块数据
    this.oldMarketState = this.props.marketInfo;

  }

  onChange(key,newState){
    console.log(key,newState);
    switch (key) {
      case "payMarket":
        this.oldMarketState = Object.assign({},this.oldState,newState);
      case "repairPayForm":
        this.oldState = Object.assign({},this.oldState,newState);

    }
    //this.setNewChange();
  }



  setNewChange(){
    console.log(this.oldState,this.oldMarketState);
    this.props.dispatch({
      type: 'cashier/saveData',
      payload: {
        data:Object.assign({},this.oldState),
        key:"repairPayState"
      }
    });
    this.props.dispatch({
      type: 'cashier/saveData',
      payload: {
        data:Object.assign({},this.oldMarketState),
        key:"marketInfo"
      }
    });
  }

  onClick(){
    this.setNewChange();
    if(this.formVerify()){
      this.repairPayRequest();
    }
  }

  formVerify(){

    if(isEmpty(this.oldState.amount)||this.oldState.paystatus!="03"){
      message.error("该订单支付未成功，无法补充值");
      return false;
    }else if(isEmpty(this.oldMarketState.saleAdInfo)) {
      message.error("未选中销售顾问");
      return false;
    }else if(this.oldMarketState.saleAdInfo.help!=="") {
      message.error(this.oldMarketState.saleAdInfo.help);
      return false;
    }else if(isEmpty(this.oldMarketState.saleBeautyInfo)){
      message.error("未选中销售美容师");
      return false;
    }else if(this.oldMarketState.saleBeautyInfo.help!==""){
      message.error(this.oldMarketState.saleBeautyInfo.help);
      return false;
    }
    else{

    }
    return true;
  }

  repairPayRequest(){
    let { customerDetalis } = this.props;
    let {depart_info} = this.oldMarketState;
    if( isEmpty(depart_info.introduce) ){
      delete depart_info.introduce;
      delete depart_info.introduce_proportion;
    }
    /**
     * {
            "serviceid": "服务id",
            "posorderno": "小票上的订单号",
            "sonaccountid": "选择的补充值子账户",
            "cardid": "",
            "posmerchantno": "POS商户号",
            "postermno": "POS终端号",
            "remark",
            "depart_info": {
              "sale_proportion": "销售部门提成比例",
              "introduce_proportion": "介绍部门提成比例"
            }，
            "sale_beauty_info": {
              "sale": "销售美容师id",
              "sale_proportion": "比例"
            },
            "sale_ad_info": {
              "introduce": "介绍顾问id",
              "introduce_proportion": "比例"
            },
            "introduce_beauty_info": {
              "introduce": "介绍美容师id",
              "introduce_proportion": "比例"
            },
            "introduce_ad_info": {
              "sale": "销售顾问ID",
              "sale_proportion": "比例"
            }
          }
     */

    let reqData = {
      //卡ID
      "cardid":customerDetalis.cardid,
      "serviceid":customerDetalis.serviceid,
      "posorderno": this.oldState.posorderno,
      //选择的补充值子账户
      "sonaccountid": this.oldState.rechargeRccount,
      "posmerchantno": this.oldState.posmerchantno,
      "postermno": this.oldState.postermno,
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
      //payMethod:'offline'
    };
    request({
      url:api.supplementRecharge,
      data:reqData
    }).then(({data,status,msg})=>{
      if(isEmpty(data)&&status!=200){
        message.error(msg);
      }else{
        message.success("充值成功！")
      }
    })
  }

  render(){
    return (
      <div>
        <PayCustomerDetalis/>
        <PayTable/>
        <RepairPayForm onChange={this.onChange.bind(this,"repairPayForm")}/>
        <PayMarket onChange={this.onChange.bind(this,"payMarket")}/>
        <PayButton onClick={this.onClick}/>
        <PayModal />
      </div>
    );
  }
};

export default connect(({cashier})=>(cashier))(RepairPay);
