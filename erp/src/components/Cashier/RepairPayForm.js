import { connect } from 'dva';
import { Row, Col, Form, Input, Button  } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';


const {isEmpty} = variable;

const FormItem = Form.Item;

const RepairPayForm = ({customerDetalis}) => {
   const isShow = isEmpty(customerDetalis);
    return (
        <BaseBox >
            <Row>
                <Form layout='vertical' style={{width:'100%'}}>
                    <Col span={6}>
                        <FormItem
                            label="充值账户:"
                        >
                            <Input style={{color:'rgb(128,128,128)'}} disabled={true} placeholder="input placeholder" value={customerDetalis.customername}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="充值金额:"
                        >
                            <Input disabled={true} placeholder="input placeholder" value={customerDetalis.cardrankname}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="支付方式:"
                        >
                            <Input disabled={true} placeholder="input placeholder" value={customerDetalis.cardno}/>
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
                            <Input style={{ color: 'rgb(128,128,128)' }} disabled={true} placeholder="input placeholder" value={customerDetalis.customername} />
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="POS机终端号:"
                        >
                            <Input style={{color:'rgb(128,128,128)'}} disabled={true} placeholder="input placeholder" value={customerDetalis.customername}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="支付订单号:"
                        >
                            <Input disabled={true} placeholder="input placeholder" value={customerDetalis.cardrankname}/>
                        </FormItem>
                    </Col>
                 </Form>
            </Row>
            <Row>
                <Form layout='vertical' style={{ width: '100%' }}>
                    <Col span={18}>
                        <FormItem
                            label="商户号:"
                        >
                            <Input style={{ color: 'rgb(128,128,128)' }} disabled={true} placeholder="input placeholder" value={customerDetalis.customername} />
                            <Button type="primary">重新扫描</Button>
                        </FormItem>
                    </Col>
                    
                </Form>
            </Row>
            
        </BaseBox>
               
    );
};

export default connect(({ cashier }) => (cashier))(RepairPayForm);