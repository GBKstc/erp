import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Select  } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
const Option = Select.Option;

const {isEmpty} = variable;

const FormItem = Form.Item;

const PayForm = ({customerDetalis}) => {
   const isShow = isEmpty(customerDetalis);
    return (
        <BaseBox >
            <Row>
                <Form layout='vertical' style={{width:'100%'}}>
                    <Col span={6}>
                        <FormItem
                            label="充值账户:"
                        >
                          <Select placeholder="请选择">
                            <Option key="1">生美充值金额</Option>
                            <Option key="2">医美充值金额</Option>
                          </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="充值金额:"
                            help="一百元"
                        >
                            <Input disabled={false} placeholder="请输入" value={customerDetalis.cardrankname}/>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="最低充值金额/元:"
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
                            label="支付方式:"
                        >
                            <Select>
                              <Option key="1">银联/支付宝/微信</Option>
                              <Option key="2">团购</Option>
                              <Option key="3">银行转账</Option>
                              <Option key="4">微信转账</Option>
                              <Option key="5">支付宝转账</Option>
                              <Option key="6">现金</Option>
                              <Option key="7">市民卡</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="支付凭证:"
                        >
                            <Input disabled={false} placeholder="input placeholder" value={customerDetalis.cardrankname}/>
                        </FormItem>
                    </Col>

                 </Form>
            </Row>

        </BaseBox>

    );
};

export default connect(({cashier}) => (cashier))(PayForm);
