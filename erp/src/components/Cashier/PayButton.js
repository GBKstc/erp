import { connect } from 'dva';
import { Row, Col, Form, Input, Button } from 'antd';
import { variable } from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';


const { isEmpty } = variable;

const FormItem = Form.Item;

const PayButton = ({ customerDetalis,dispatch,onClick }) => {
    
    const handleOk = (key) => {
        console.log(key);

        if(onClick){
            onClick();
        }
    }

    return (
        
        <Row style={{ marginTop: 30 }} justify="center" type="flex">
                <Col>
                    <Button type="primary" onClick={handleOk.bind(this,"PayModal")}>确认充值</Button>
                </Col> 
                <Col span={6}>
                </Col> 
                <Col>
                    <Button type="primary">取消</Button>
                </Col>  
            </Row>
        

    );
};

export default connect(({ cashier }) => (cashier))(PayButton);