import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Select,InputNumber,message  } from 'antd';
import {config,request,variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import React from 'react';

const {api} = config;
const Option = Select.Option;
const {isEmpty,money2Big} = variable;
const FormItem = Form.Item;

//是否支持手动输入
const invertCharge = {
  "00":false,
  "01":false,
  //大众点评
  "100":true,
  //美团
  "101":true,
  //大众点评霸王餐
  "102":true,
  //口碑
  "103":true,
  "105":false,
  "107":false,
  "108":false,
};

class PayForm extends React.Component{
    constructor(props){
        super(props);
      console.log(this);
        const {} = this.props;
        this.getPayTypeList = this.getPayTypeList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.selectRechargeRccount = this.selectRechargeRccount.bind(this);
        this.selectPay = this.selectPay.bind(this);
        this.changeVoucher = this.changeVoucher.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.setNewChange = this.setNewChange.bind(this);
        const {payState} = this.props;
        const {
            payTypeList,
            bigNum,
            verifyInfo,
            selectPayType,
            rechargeRccount,
            recharge_info,
            pay,
        } = payState;
        console.log(payState);
        this.state={
            payTypeList:payTypeList,
            bigNum:bigNum,
            //验证提示
            verifyInfo:verifyInfo,
            //customerDetalis,
            //选择的支付方式
            selectPayType:selectPayType,
            //充值账户
            rechargeRccount:rechargeRccount,
            recharge_info:recharge_info,
            pay:pay
        }
    }

    componentWillMount(){
        this.getPayTypeList();
    }

    onChange(key,value){
        let {...State} = this.state;
        let newData = {};
        switch(key)
        {
            //选择账户
        case "rechargeRccount":
            newData = this.selectRechargeRccount(value);
            break;
            //改充值金额
        case "payamount":
            newData = this.changeMoney(value);
            break;
            //改支付方式
        case "type":
            newData = this.selectPay(value);
            break;
            //更改支付凭证
        case "voucher":
            newData = this.changeVoucher(value);
            break;
        }

        this.setNewChange(newData);
        // let newState = Object.assign({},State,newData);
        // this.setState({
        //     ...newState
        // })

        // if(this.props.onChange){
        //     this.props.onChange(newState);
        // }


    }

    setNewChange(newData){
        let { ...State } = this.state;
        let newState = Object.assign({}, State, newData);
        this.setState({
            ...newState
        })
        if (this.props.onChange) {
            this.props.onChange(newState);
        }

    }

    selectRechargeRccount(value){

        return {rechargeRccount:value};


    }

    changeMoney(value){

        let { pay, rechargeRccount, recharge_info, bigNum,verifyInfo} = this.state;
        let {customerDetalis} = this.props;
        if(value<(customerDetalis.minrecharge-0)){
            bigNum = "数额小于最低充值金额";
            verifyInfo.money = "数额小于最低充值金额";
        }else{
            verifyInfo.money = "";
            bigNum = money2Big(value);
        }
        pay.payamount = value;
        recharge_info[rechargeRccount] = value;

        return {
            pay:pay,
            recharge_info,
            bigNum,
            verifyInfo
        }

    }

    selectPay(value){

        const { payTypeList} = this.state;
        const verifyInfo = {
            voucher: null,
            money: null,
        };
        let bigNum = "";
        const pay = {
            cer: null,   //凭证码
            payamount: null,  //支付金额
            type: null //支付方式
        };
          /**重置数据
         * verifyInfo:{
                voucher:null,
                money:null,
            },
            bigNum:null
            pay:{
                cer:null,   //凭证码
                payamount:null,  //支付金额
                type:null //支付方式
            }
         */


        pay.type = value;

        for(let i=0;i<payTypeList.length;i++){
            if(payTypeList[i].maxlength){
              verifyInfo.voucher = "";
            }
            if(invertCharge[value]){
              verifyInfo.money = "";
            }
            if(payTypeList[i].code == value){
                return {
                    selectPayType:payTypeList[i],
                    pay,
                    bigNum,
                    verifyInfo
                }
            }
        }
        return null;

    }

    changeVoucher(e){

        let { selectPayType, pay, verifyInfo} = this.state;
        let {customerDetalis} = this.props;
        let content = e.target.value;
        if(content.length>selectPayType.maxlength||content.length<selectPayType.minlength){
            verifyInfo.voucher=`凭证长度在`+selectPayType.minlength+"和"+selectPayType.maxlength+"之间";
        }else{
            verifyInfo.voucher="";
            // const object = {
            //     url: api.ticketCodeQuery,
            //     method: 'post',
            //     data:{
            //         payType: pay.type,
            //         serviceId: customerDetalis.serviceid,
            //         ticketCode: content
            //     }
            // };
            // request(object)
            //     .then(({ data }) => {
            //         console.log(data);
            //     })

        }
        pay.cer = content;

        return {
            pay,
            verifyInfo
        }

    }

    getPayTypeList(){

        const object = {
            url:api.payTypeList,
            method:'post',
        };
        request(object)
        .then(({data})=>{
            this.setState({
                payTypeList:data
            })
        })
    }

    onBlur(e){
        let { selectPayType, pay, verifyInfo, rechargeRccount, recharge_info, bigNum} = this.state;
        const { customerDetalis } = this.props;
        let content = e.target.value;
        if(content.length>selectPayType.maxlength||content.length<selectPayType.minlength){
            verifyInfo.voucher=`凭证长度在`+selectPayType.minlength+"和"+selectPayType.maxlength+"之间";
        }else if(invertCharge[pay.type]){
          verifyInfo.voucher="";
          const object = {
            url: api.ticketCodeQuery,
            method: 'post',
            data:{
              payType: pay.type,
              serviceId: customerDetalis.serviceid,
              ticketCode: content
            }
          };
          request(object)
            .then(({ data,msg }) => {
              // data = { price:"100" }
              if(data){
                let value = data.price-0;
                verifyInfo.money = "";
                bigNum = money2Big(value);
                pay.payamount = value;
                recharge_info[rechargeRccount] = value;
                let newData = {
                  pay: pay,
                  recharge_info,
                  bigNum,
                  verifyInfo
                };
                this.setNewChange(newData);
                // pay.payamount = data.price;
                // this.setState({
                //     pay
                // })
              }else{
                message.info("优惠码已经过期");
                verifyInfo.voucher = "优惠码已经过期";
                let newData = {
                  verifyInfo
                };
                this.setNewChange(newData);
              }

              console.log(data);

            })
        }else{
          return ;
        }
    }

    render(){

        let {payTypeList} = this.state;
        let payTypeListOption = null;
        if(!isEmpty(payTypeList)){
            payTypeListOption = payTypeList.map((item,index)=>(
                <Option key={item.code} value={item.code}>{item.name}</Option>
            ));
        }

        return (
            <BaseBox >
                <Row>
                    <Form layout='vertical' style={{width:'100%'}}>
                        <Col span={6}>
                            <FormItem
                                label="充值账户:"
                            >
                                <Select placeholder="请选择" defaultValue="emei"  value={this.state.rechargeRccount} onChange={this.onChange.bind(this,"rechargeRccount")}>
                                    <Option key="emei">生美充值余额</Option>
                                    <Option key="shengmei">医美充值余额</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="充值金额:"
                                help={this.state.bigNum}
                            >
                                <InputNumber disabled={invertCharge[this.state.pay.type]} min={0} step={0.01} placeholder="请输入" value={this.state.pay.payamount?this.state.pay.payamount:0}  onChange={this.onChange.bind(this,'payamount')} />
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="最低充值金额/元:"
                            >
                                <Input disabled={true} placeholder="input placeholder" value={this.props.customerDetalis.minrecharge?this.props.customerDetalis.minrecharge:0}/>
                            </FormItem>
                        </Col>
                    </Form>
                </Row>
                <Row>
                    <Form layout='vertical' style={{width:'100%'}}>
                        <Col span={6}>
                            <FormItem
                                label="支付方式:"
                            >
                                <Select onSelect={this.onChange.bind(this,'type')} value={this.state.pay.type}>
                                    {payTypeListOption}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem
                                label="支付凭证:"
                                help={this.state.verifyInfo.voucher}
                            >
                                <Input value={this.state.pay.cer} onBlur={this.onBlur} onChange={this.onChange.bind(this,'voucher')} disabled={!this.state.selectPayType.maxlength} placeholder={this.state.selectPayType.maxlength?`凭证长度在`+this.state.selectPayType.minlength+"和"+this.state.selectPayType.maxlength+"之间":null} />
                            </FormItem>
                        </Col>

                    </Form>
                </Row>

            </BaseBox>

        )
    }
}

export default connect(({cashier}) => (cashier))(PayForm);
