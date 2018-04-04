import { connect } from 'dva';
import { Row, Col, Table, Modal, Button, Form, Input, Select} from 'antd';
import { variable } from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';


const { isEmpty } = variable;
const FormItem = Form.Item;




const BuySelectModal = ({ visibleModal, dispatch, modalTitle }) => {
    const formItemLayout =  {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };
    const key = "BuySelectModal";
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

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };


    const handleOk = (key, ModalTitle) => {
        console.log(key);
        dispatch({
            type: 'cashier/openModal',
            payload: {
                key,
            }
        })

    }
    const handleCancel = (key) => {
        dispatch({
            type: 'cashier/closeModal',
            payload: {
                key
            }
        })
    }

    return (
        <Modal
            title={modalTitle}
            visible={visibleModal.BuySelectModal}
            onOk={handleOk.bind(this, key)}
            okText="确认新增"
            onCancel={handleCancel.bind(this, key)}
            cancelText="取消"
            width={1200}
        >
            <Row>
                <Col span={24}>
                    <Row>
                        <Col span={12}>
                            <Form layout='horizontal' style={{ width: '100%' }}>
                                <FormItem
                                    label="物品编号："
                                    {...formItemLayout}
                                >
                                    <Input style={{ color: 'rgb(128,128,128)' }} disabled={true} placeholder="input placeholder" value={"customerDetalis.customername"} />
                                </FormItem>
                                <FormItem
                                    label="物品名称："
                                    {...formItemLayout}
                                >
                                    <Input disabled={true} placeholder="input placeholder" value={"customerDetalis.cardrankname"} />
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={12}>
                            <Form layout='horizontal' style={{ width: '100%' }}>
                                <FormItem
                                    label="是否打折："
                                    {...formItemLayout}
                                >
                                    <Select
                                        value={"rmb"}
                                       
                                    >
                                        <Option value="rmb">RMB</Option>
                                        <Option value="dollar">Dollar</Option>
                                    </Select>
                                </FormItem>
                                <FormItem
                                    label="是否可用余额购买："
                                    {...formItemLayout}
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
                    <Row>
                        <Table rowSelection={rowSelection} bordered size='small' dataSource={dataSource} columns={columns} pagination={false} />
                    </Row>
                </Col>
            </Row>
        </Modal>

    );
};

export default connect(({ cashier }) => (cashier))(BuySelectModal);