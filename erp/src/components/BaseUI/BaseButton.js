import { connect } from 'dva';
import { Row, Col, Form, Input, Button } from 'antd';
import { variable } from '../../utils';
import { Link } from 'dva/router';


const { isEmpty } = variable;


const BaseButton = ({ onCancel, okText, onClick  }) => {

    const handleOk = (key) => {
        if(onClick){
            onClick();
        }
    }

    return (

        <Row style={{ marginTop: 30 }} justify="center" type="flex">
            <Col>
                <Button type="primary" onClick={handleOk}>{okText?okText:'确定'}</Button>
            </Col>
            <Col span={1}>
            </Col>
            <Col>
                <Button>{onCancel?onCancel:'取消'}</Button>
            </Col>
        </Row>


    );
};

export default connect(({ cashier }) => (cashier))(BaseButton);