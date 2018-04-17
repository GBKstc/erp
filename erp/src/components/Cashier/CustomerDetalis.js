import { connect } from 'dva';
import { Row, Col, Modal } from 'antd';
import styles from './CustomerList.less';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import React from "react";



const {isEmpty} = variable;

class CustomerDetalis extends React.Component/* = ({customerDetalis,dispatch}) => */{
    // console.log(match);
    constructor(props){
        super(props);
        this.startServe = this.startServe.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state={
            visible:false
        }
    }

    startServe(){
        this.openModal();
    }

    openModal(){
        this.setState({
            visible: true,
        });
    }
    closeModal(){
        this.setState({
            visible: false,
        });
    }

    render(){
        const {customerDetalis} = this.props;
        const isShow = isEmpty(customerDetalis);
        return (
            <Row type="flex" align="middle" style={isShow ? { display: 'none' } : { backgroundColor: "rgb(245,245,245)" }}>
                <Col span={24} style={{ backgroundColor: "rgb(255,255,255)" }} className={styles.details}>
                    <Row type="flex" align="middle">
                        <Col span={4}>
                            <Row>{customerDetalis.servicecode}</Row>
                            <Row>房间号: {customerDetalis.roomname}</Row>
                            <Row>{customerDetalis.servicestatus == 0 ? "服务中" : "服务完成"}</Row>
                        </Col>
                        <Col span={20}>
                            <Row>
                                <Col span={8}>
                                    <Row>
                                        <Col span={12}>顾客姓名:</Col>
                                        <Col span={12}>{customerDetalis.customername}</Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={12}>手机号:</Col>
                                        <Col span={12}>{customerDetalis.customermobile}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Row>
                                        <Col span={12}>卡号:</Col>
                                        <Col span={12}>{customerDetalis.cardno}</Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={12}>卡等级:</Col>
                                        <Col span={12}>{customerDetalis.cardrankname}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={8}>
                                    <Row>
                                        <Col span={12}>下单方式:</Col>
                                        <Col span={12}>后台排班</Col>
                                    </Row>
                                </Col>
                                <Col span={8}>
                                    <Row>
                                        <Col span={12}>服务部门:</Col>
                                        <Col span={12}>{customerDetalis.departname}</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={2}></Col>
                                <Col span={2}><a onClick={this.startServe}>开始服务</a></Col>
                                <Col span={2}><Link to='/cashier/pay'>充值</Link></Col>
                                <Col span={2}><Link to='/cashier/repairPay'>补充值</Link></Col>
                                <Col span={2}>取货</Col>
                                <Col span={2}>退货</Col>
                                <Col span={2}><Link to='/cashier/buy'>购买</Link></Col>
                                <Col span={2}>消费</Col>
                                <Col span={2}>转账</Col>
                                <Col span={2}>优惠码</Col>
                                <Col span={2}>作废</Col>
                                <Col span={2}>结账</Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Modal
                    title="开始服务"
                    visible={this.state.visible}
                    onOk={this.closeModal}
                    okText="确定"
                    onCancel={this.closeModal}
                    cancelText="取消"
                >
                    <p><Link to='/cashier/openCard'>开卡</Link></p>
                   {/*  <p><Link to='/cashier/pay'>激活</Link></p> */}
                
                </Modal>
            </Row>

        );
    }
    
    
};

export default connect(({cashier}) => (cashier))(CustomerDetalis);