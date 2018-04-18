import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Select,InputNumber,message  } from 'antd';
import {config,request,variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import React from 'react';
import * as styles from './OpenCardInfo.less';

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

class OpenCardInfo extends React.Component{
    constructor(props){
        super(props);
       
        this.getPayTypeList = this.getPayTypeList.bind(this);
        this.onChange = this.onChange.bind(this);
        this.setNewChange = this.setNewChange.bind(this);
        this.getCardRanks = this.getCardRanks.bind(this);
        this.selectCardRank = this.selectCardRank.bind(this);
        this.getCardRankInfoByCardId = this.getCardRankInfoByCardId.bind(this);
        const { openCardState} = this.props;
        const {
            cardRanksInfoData,
            selectCardRankId
        } = openCardState;
        console.log(openCardState);
        this.state={
            payTypeList:[],
            cardRanksList:[],
            cardRanksInfoData,
        }
    }

    componentWillMount(){
        this.getPayTypeList();
        this.getCardRanks();
    }

    getPayTypeList() {

        const object = {
            url: api.payTypeList,
            method: 'post',
            data:{
                showtype:3,
            }
        };
        request(object)
            .then(({ data }) => {
                this.setState({
                    payTypeList: data
                })
            })
    }

    getCardRanks() {

        const object = {
            url: api.opencardRanks,
            method: 'post',
        };
        request(object)
            .then(({ data }) => {
                console.log(data);
                
                this.setState({
                    cardRanksList: data
                })
            })
    }

    onChange(key,value){
        let {...State} = this.state;
        let newData = {};
        switch(key)
        {
            //选择卡等级
            case "changeCardRank":
                newData = this.selectCardRank(value);
            break;
            //改充值金额
        case "payamount":
            //newData = this.changeMoney(value);
            break;
            //改支付方式
        case "type":
           // newData = this.selectPay(value);
            break;
            //更改支付凭证
        case "voucher":
            //newData = this.changeVoucher(value);
            break;
        }

        this.setNewChange(newData);

    }

    selectCardRank(value){
        //console.log(value);
        this.getCardRankInfoByCardId(value);
    }

    getCardRankInfoByCardId(id){
        request({
            url: api.carDrankGetById,
            data:{
                id: id
            }
        }).then(({data})=>{
            this.props.dispatch({
                    type: 'cashier/saveCardRanksInfo',
                    payload: {
                        data:data
                    }
                });
            //console.log(data);
        })
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

    render(){
        const { payTypeList, cardRanksList, cardRanksInfoData} = this.state;
        let payTypeListOption = null;
        let cardRanksListOption = null;
        if (!isEmpty(payTypeList)) {
            payTypeListOption = payTypeList.map((item, index) => (
                <Option key={item.code} value={item.code}>{item.name}</Option>
            ));
        }
        if (!isEmpty(cardRanksList)) {
            cardRanksListOption = cardRanksList.map((item, index) => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
            ));
        }

        return (
            <BaseBox title="开卡信息">
                <Form layout='vertical' style={{width:'100%'}}>
                    <Row type="flex" justify="space-between">
                        <Col span={5}>
                            <FormItem
                                label="卡等级:"
                            >
                                <Select placeholder="请选择" showSearch value={cardRanksInfoData && cardRanksInfoData.card ? cardRanksInfoData.card.id : ""} optionFilterProp="children" onChange={this.onChange.bind(this,"changeCardRank")}>
                                    <Option key={44} value={44}>{44}</Option>
                                    {cardRanksListOption}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem
                                label="卡号:"
                            >
                                <Input placeholder="请输入卡面上的卡号"/>
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem
                                label="支付方式:"
                            >
                                <Select placeholder="请选择" >
                                    {payTypeListOption}
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span={5}>
                            <FormItem
                                label="支付凭证:"
                            >
                                <Input placeholder="请输入支付凭证" />
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Row type="flex" justify="space-between">
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                <div className={styles.title}>
                                    应支付金额(元)：
                                </div>
                            </Col>
                        </Row>
                        <Row>
                             <div className={styles.num}>
                                {isEmpty(cardRanksInfoData.card) ? "0":cardRanksInfoData.card.buy_min_value}
                            </div>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                <div className={styles.title}>
                                    生美充值金额：
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className={styles.num}>
                                    {isEmpty(cardRanksInfoData.card) ? "0" : cardRanksInfoData.card.sm_recharge_amount}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={5}>
                        <Row>
                            <Col span={24}>
                                <div className={styles.title}>
                                    医美充值金额：
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className={styles.num}>
                                    {isEmpty(cardRanksInfoData.card) ? "0" : cardRanksInfoData.card.em_recharge_amount}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={5}>
                        
                    </Col>
                </Row>

            </BaseBox>

        )
    }
}

export default connect(({cashier}) => (cashier))(OpenCardInfo);
