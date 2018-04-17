import { connect } from 'dva';
import { Row, Col, Form, Input, Button ,Select,message } from 'antd';
import {variable,request,config} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import React from 'react';

const {isEmpty} = variable;
const {api} = config;
const Option = Select.Option;
const FormItem = Form.Item;

class RepairPayForm extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    const {
      repairPayState
    } = this.props;

    const {
      QCcode,
      posmerchantno,
      posorderno,
      postermno,
      amount,
      paystatus,
      rechargeRccount,
    } = repairPayState;

    this.onPressEnter = this.onPressEnter.bind(this);
    this.setNewChange = this.setNewChange.bind(this);
    this.confirmOrder = this.confirmOrder.bind(this);
    this.clearQCcode = this.clearQCcode.bind(this);
    this.QCcodeChange = this.QCcodeChange.bind(this);
    this.selectRechargeRccount = this.selectRechargeRccount.bind(this);
    this.state = {
      // //订单号
      // orderno: "",
      //二维码码
      QCcode,
      //POS商户号
      posmerchantno,
      //pos小票上的订单号
      posorderno,
      //POS终端号
      postermno,
      //单子ID
      //serviceid: "",
      //支付金额
      amount,
      //支付状态
      paystatus,
      rechargeRccount,

    }
  }
  onPressEnter(e){
    console.log(e.target.value);
    let codeList = e.target.value.split("，");
    let posmerchantno = codeList[0];
    let postermno = codeList[1];
    let posorderno = codeList[2];
    const newState = {
      posmerchantno,
      postermno,
      posorderno,
    };
    this.setNewChange(newState);
    if(!(isEmpty(posmerchantno)||isEmpty(postermno)||isEmpty(posorderno))){
      let reqData = {
        posmerchantno,
        postermno,
        posorderno,
        serviceid:this.props.customerDetalis.serviceid,
      };
      this.confirmOrder(reqData);
    }else{
      message.error("数据格式不对，请重新扫码");
    }
  }

  confirmOrder(reqData){
    // const {posmerchantno,postermno,posorderno} = this.state;
    // let reqData = {
    //   posmerchantno,
    //   postermno,
    //   posorderno,
    //   serviceid:this.props.customerDetalis.serviceid,
    // };
    let {amount,paystatus} = this.state;
    request({
      url:api.chargemoneyBycer,
      data:reqData
    }).then(({data})=>{
      data = {
        amount:100,paystatus:"03"
      };
      if(isEmpty(data)||data.amount==0){
        message.info("该支付订单不存在！请重试重新扫描");
      }else{
        amount = data.amount;
        paystatus = data.paystatus;
        this.setNewChange({amount,paystatus});
        message.success("获取数据成功！");
      }
    })
  }

  setNewChange(newData){
    let { ...State } = this.state;
    let newState = Object.assign({}, State, newData);
    this.setState({
      ...newState
    });
    if (this.props.onChange) {
      this.props.onChange(newState);
    }

  }

  clearQCcode(){
    let newState = {
      // //订单号
      // orderno: "",
      //二维码码
      QCcode:"",
      //POS商户号
      posmerchantno: "",
      //pos小票上的订单号
      posorderno: "",
      //POS终端号
      postermno: "",
      //单子ID
      //serviceid: "",
      //支付金额
      amount:"",
      //支付状态
      paystatus:"",

    };

    this.setNewChange({...newState});
  }

  QCcodeChange(e){
    let {QCcode} = this.state;
    QCcode = e.target.value;
    this.setNewChange({QCcode});
  }

  selectRechargeRccount(value){
    this.setNewChange({rechargeRccount:value});
  }
  render(){

    return (
      <BaseBox >
        <Row>
          <Form layout='vertical' style={{width:'100%'}}>
            <Col span={6}>
              <FormItem
                label="充值账户:"
              >
                <Select placeholder="请选择" defaultValue="emei" value={this.state.rechargeRccount} onChange={this.selectRechargeRccount.bind(this)}>
                  <Option key="1">生美充值余额</Option>
                  <Option key="4">医美充值余额</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="充值金额:"
              >
                <Input disabled={true} value={this.state.amount} placeholder="输入订单号后自动显示" />
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="支付方式:"
              >
                <Input disabled={true} value={this.state.paystatus}  placeholder="输入订单号后自动显示" />
              </FormItem>
            </Col>
          </Form>
        </Row>
        <Row>
          <Form layout='vertical' style={{width:'100%'}}>
            <Col span={6}>
              <FormItem
                label="商户号:"
              >
                <Input style={{ color: 'rgb(128,128,128)' }}  placeholder="请输入小票上的商户号" value={this.state.posmerchantno}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="POS机终端号:"
              >
                <Input style={{color:'rgb(128,128,128)'}}  placeholder="请输入小票上的终端号" value={this.state.postermno}/>
              </FormItem>
            </Col>
            <Col span={6}>
              <FormItem
                label="支付订单号:"
              >
                <Input  placeholder="请输入小票上的订单号" value={this.state.posorderno}/>
              </FormItem>
            </Col>
          </Form>
        </Row>
        <Row>
          <Form layout='vertical' style={{ width: '100%' }}>
            <Col span={18}>
              <FormItem
                label="扫描枪:"
              >
                <Input style={{ color: 'rgb(128,128,128)' }} onPressEnter={this.onPressEnter} type="password" placeholder="扫描成功后自动显示/输入" onChange={this.QCcodeChange}  value={this.state.QCcode}/>
                <Button type="primary" onClick={this.clearQCcode}>重新扫描</Button>
              </FormItem>
            </Col>

          </Form>
        </Row>

      </BaseBox>
    )
  }
}
// const RepairPayForm = ({customerDetalis}) => {
//    const isShow = isEmpty(customerDetalis);
//     return (
//
//
//     );
// };

export default connect(({ cashier }) => (cashier))(RepairPayForm);
