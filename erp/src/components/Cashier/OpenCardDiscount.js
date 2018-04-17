import { connect } from 'dva';
import { Row, Col, Form, Input } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import * as styles from "./OpenCardDiscount.less";
import React from "react";
import BaseBox from '../BaseBox';
const FormItem = Form.Item;

const {isEmpty} = variable;
class OpenCardDiscount extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Row>
                <Col span={10}>
                    <BaseBox title="折扣（%）">
                        <Row type="flex" justify="space-between">
                            <Col span={5}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            80
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            物品
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={5} className={styles.borderLine2}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            80
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            物品
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={5} className={styles.borderLine2}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            80
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            物品
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={5} className={styles.borderLine2}>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.num}>
                                            80
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <div className={styles.title}>
                                            物品
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>    
                    </BaseBox>
                </Col>
                <Col span={14}>
                    <div className={styles.money}>
                        <BaseBox title="赠送金额（元）">
                            <Row type="flex" justify="space-between">
                                <Col span={3}>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.num}>
                                                2000
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.title}>
                                                生美
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={3} className={styles.borderLine}>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.num}>
                                                2000
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.title}>
                                                医美
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={3} className={styles.borderLine}>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.num}>
                                                2000
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.title}>
                                                物品
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={3} className={styles.borderLine}>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.num}>
                                                2000
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.title}>
                                                项目
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={3} className={styles.borderLine}>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.num}>
                                                2000
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.title}>
                                                疗程
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col span={3} className={styles.borderLine}>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.num}>
                                                2000
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <div className={styles.title}>
                                                方案
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </BaseBox>
                    </div>
                    
                </Col>
            </Row>
        )
    }
};

export default connect(({cashier}) => (cashier))(OpenCardDiscount);
