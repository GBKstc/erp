import { connect } from 'dva';
import { Row, Col, Button, Form, Input, Select, Table } from 'antd';
import { variable } from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import styles from "./BuySelectBox.less";

const { isEmpty } = variable;
const FormItem = Form.Item;



const BuySelectBox = ({ title, content, buyModalTitle, dispatch}) => {
    let ModalTitle = isEmpty(buyModalTitle) ? null : buyModalTitle;

    const dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }];

    const columns = [{
        title: '充值单号',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '充值账户',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: '充值金额',
        dataIndex: 'addres',
        key: 'addres',
    }, {
        title: '支付方式',
        dataIndex: 'addre',
        key: 'addre',
    }, {
        title: '状态',
        dataIndex: 'address',
        key: 'address',
    }];


    const openModal = function (key) {
        dispatch({
            type: 'cashier/openModal',
            payload: {
                key,
                ModalTitle
            }
        })
    }

    return (
        <BaseBox title={title} header={<Button type="primary" size="small" onClick={openModal.bind(this, "BuySelectModal", ModalTitle)}>选择</Button>}>
            <Row>
                <Col offset={1} className={styles.content} >请选择要消费的项目~</Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={24}>
                            <Table bordered size='small' dataSource={dataSource} columns={columns} pagination={false} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={16}>
                            <Row>
                                <Col span={12}>
                                    <Form layout='vertical' style={{ width: '100%' }}>
                                        <FormItem
                                            label="物品编号："
                                           
                                        >
                                            <Input style={{ color: 'rgb(128,128,128)' }} disabled={true} placeholder="input placeholder" value={"customerDetalis.customername"} />
                                        </FormItem>
                                        <FormItem
                                            label="物品名称："
                                           
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
                                    </Form>
                                </Col>
                                <Col span={12}>
                                    <Form layout='vertical' style={{ width: '100%' }}>
                                        <FormItem
                                            label="物品编号："

                                        >
                                            <Input style={{ color: 'rgb(128,128,128)' }} disabled={true} placeholder="input placeholder" value={"customerDetalis.customername"} />
                                        </FormItem>
                                        <FormItem
                                            label="物品名称："

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
                                    </Form>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8}>
                            <Form layout='vertical' style={{ width: '100%' }}>
                                <FormItem
                                    label="物品编号："

                                >
                                    <Select
                                        value={"rmb"}

                                    >
                                        <Option value="rmb">RMB</Option>
                                        <Option value="dollar">Dollar</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="物品名称："

                                >
                                    <Select
                                        value={"rmb"}

                                    >
                                        <Option value="rmb">RMB</Option>
                                        <Option value="dollar">Dollar</Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Col>
                
            </Row>
            
        </BaseBox>

    );
};

export default connect(({ cashier }) => (cashier))(BuySelectBox);