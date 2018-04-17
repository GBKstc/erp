import { connect } from 'dva';
import { Row, Col, Button } from 'antd';

const PayButton = ({dispatch,onClick }) => {
    
    const handleOk = () => {
    
        if(onClick){
            onClick();
        }
    }

    return (       
        <Row style={{ marginTop: 30 }} justify="center" type="flex">
            <Col>
                <Button type="primary" onClick={handleOk}>确认充值</Button>
            </Col> 
            <Col span={1}>
            </Col> 
            <Col>
                <Button >取消</Button>
            </Col>  
        </Row>
    );
};

export default connect()(PayButton);