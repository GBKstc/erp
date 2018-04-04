import { connect } from 'dva';
import { Row, Col, Form, Input, Button } from 'antd';
import { variable } from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';


const { isEmpty } = variable;

const FormItem = Form.Item;

const BuyButton = ({ customerDetalis, dispatch }) => {

    const handleOk = (key) => {
        console.log(key);
        // dispatch({
        //     type: 'cashier/openModal',
        //     payload: {
        //         key
        //     }
        // })

    }

    return (

        <Row style={{ marginTop: 30 }} justify="center" type="flex">
            <Col>
                <Button type="primary" onClick={handleOk.bind(this, "PayModal")}>提交</Button>
            </Col>
            <Col span={6}>
            </Col>
            <Col>
                <Button type="primary">取消</Button>
            </Col>
        </Row>


    );
};

export default connect(({ cashier }) => (cashier))(BuyButton);