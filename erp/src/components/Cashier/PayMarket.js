import { connect } from 'dva';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { variable } from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';


const { isEmpty } = variable;

const FormItem = Form.Item;

const PayMarket = ({ customerDetalis }) => {
    const isShow = isEmpty(customerDetalis);
    return (
        <BaseBox >
            <Row>
                <Form layout='vertical' style={{ width: '100%' }}>
                    <Col span={6}>
                        <FormItem
                            label="销售部门:"
                        >
                            <Input
                                type="text"

                                value={"aaa"}
                                style={{ width: '65%', marginRight: '3%' }}
                            />
                            <Select
                                value={"1%"}
                                style={{ width: '32%' }}

                            >
                                <Option value="1%">1%</Option>
                                <Option value="2%">2%</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="销售部门:"
                        >
                            <Input
                                type="text"

                                value={"aaa"}
                                style={{ width: '65%', marginRight: '3%' }}
                            />
                            <Select
                                value={"1%"}
                                style={{ width: '32%' }}

                            >
                                <Option value="1%">1%</Option>
                                <Option value="2%">2%</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="销售美容师:"
                        >
                            <Input
                                type="text"
                                
                                value={"aaa"}
                                style={{ width: '65%', marginRight: '3%' }}
                            />
                            <Select
                                value={"1%"}
                                style={{ width: '32%' }}
                                
                            >
                                <Option value="1%">1%</Option>
                                <Option value="2%">2%</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Form>
            </Row>
            <Row>
                <Col offset={1}>
                    <Button type="primary">添加介绍部门</Button>
                </Col>
            </Row>
            <Row>
                <Form layout='vertical' style={{ width: '100%' }}>
                    <Col span={6}>
                        <FormItem
                            label="介绍部门:"
                        >
                            <Input
                                type="text"

                                value={"aaa"}
                                style={{ width: '65%', marginRight: '3%' }}
                            />
                            <Select
                                value={"1%"}
                                style={{ width: '32%' }}

                            >
                                <Option value="1%">1%</Option>
                                <Option value="2%">2%</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="介绍顾问:"
                        >
                            <Input
                                type="text"

                                value={"aaa"}
                                style={{ width: '65%', marginRight: '3%' }}
                            />
                            <Select
                                value={"1%"}
                                style={{ width: '32%' }}

                            >
                                <Option value="1%">1%</Option>
                                <Option value="2%">2%</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem
                            label="介绍美容师:"
                        >
                            <Input
                                type="text"

                                value={"aaa"}
                                style={{ width: '65%', marginRight: '3%' }}
                            />
                            <Select
                                value={"1%"}
                                style={{ width: '32%' }}

                            >
                                <Option value="1%">1%</Option>
                                <Option value="2%">2%</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Form>
            </Row>

        </BaseBox>

    );
};

export default connect(({ cashier }) => (cashier))(PayMarket);