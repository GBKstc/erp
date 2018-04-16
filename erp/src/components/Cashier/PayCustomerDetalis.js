import { connect } from 'dva';
import { Row, Col, Form, Input } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';

const FormItem = Form.Item;

const {isEmpty} = variable;
const PayCustomerDetalis = ({customerDetalis,pay}) => {
   //const isShow = isEmpty(customerDetalis);
    if(isEmpty(customerDetalis)){
      customerDetalis = JSON.parse(localStorage.getItem("customerDetalis"));
    }
    return (
        <Row type="flex" align="middle" >
            <Col span={24} style={{backgroundColor:"rgb(255,255,255)"}}>
                <Row type="flex" align="middle" gutter={16}>
                 <Form layout='vertical' style={{width:'100%'}}>
                    <Col span={6}>
                        <FormItem
                            label="顾客姓名:"
                        >
                            <Input style={{color:'rgb(128,128,128)'}} disabled={true} placeholder="input placeholder" value={customerDetalis.customername}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="卡等级:"
                        >
                            <Input disabled={true} placeholder="input placeholder" value={customerDetalis.cardrankname}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="卡号:"
                        >
                            <Input disabled={true} placeholder="input placeholder" value={customerDetalis.cardno}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="手机号:"
                        >
                            <Input disabled={true} placeholder="input placeholder"  value={customerDetalis.customermobile}/>
                        </FormItem>
                    </Col>
                 </Form>

                </Row>
            </Col>
        </Row>

    );
};

export default connect(({cashier}) => (cashier))(PayCustomerDetalis);
