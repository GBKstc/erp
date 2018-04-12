import { connect } from 'dva';
import { Row, Col, Table  } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import React from "react";
import { config,request} from '../../utils'

const {api} = config;
const payStatus = {
  "02":"待支付",
  "03":"已支付",
  "04":"支付失败",
  "05":"退款"
}
const payType = {
  "01":"现金",
  "00":"银联/微信/支付宝",
  "100":"大众点评",
  "101":"美团",
  "102":"大众点评霸王餐",
  "103":"口碑",
  "105":"庙街",
  "107":"新氧",
  "108":"H5核销",
}
const columns = [{
    title: '充值单号',
    dataIndex: 'orderno',
    key: 'orderno',
  }, {
    title: '充值账户',
    dataIndex: 'sonaccountName',
    key: 'sonaccountName',
  }, {
    title: '充值金额',
    dataIndex: 'money',
    key: 'money',
  }, {
    title: '支付方式',
    dataIndex: 'paytype',
    key: 'paytype',
    reder:(code)=>{
      return payType[code]
    }
  }, {
    title: '支付凭证',
    dataIndex: 'paycer',
    key: 'paycer',
  },{
    title: '支付状态',
    dataIndex: 'paystatus',
    key: 'paystatus',
    render:(code) =>{
      return payStatus[code]
    }
    //'支付状态:状态状态(02 待支付 03已支付 04 支付失败 05 退款)
  }
  //支付状态
];
class PayTable extends React.Component{
  constructor(props){
      super(props);
      this.getRechargerecord = this.getRechargerecord.bind(this);
      let {
        dataSource
      } = props;
      this.state = {
        dataSource
      }
  }
  componentWillMount(){
    this.getRechargerecord();
  } 

  //获取充值记录
  getRechargerecord(){
    const object = {
      url:api.getRechargerecord,
      method:'post',
      data:{
        serviceid:"63324"
      }
    }
    request(object)
    .then(({data})=>{
      this.setState({
        dataSource:data
      })
    })

  }

  
  



  render(){
    return (
      <BaseBox title="本次订单充值记录">
        <Table bordered dataSource={this.state.dataSource} size="small" columns={columns} pagination={false} />
      </BaseBox>
    )
  }
}
// const PayTable = ({}) => {
   
//     return (
//         <BaseBox title="本次订单充值记录">
//             <Table bordered dataSource={dataSource} size="small" columns={columns} pagination={false}/>
//         </BaseBox>
               
//     );
// };

export default connect()(PayTable);