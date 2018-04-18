import { connect } from 'dva';
import { Row, Col, Form, Input, Button } from 'antd';
import { variable } from '../../utils';


const { isEmpty } = variable;

class BaseButton extends React.Component{
    constructor(props){
        super(props);
    }

    handleOk = (key) => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render(){
        const { onCancel, okText, onClick } = this.props;
        return (
            <Row style={{ marginTop: 30 }} justify="center" type="flex">
                <Col>
                    <Button type="primary" onClick={this.handleOk} >{okText ? okText : '确定'}</Button>
                </Col>
                <Col span={1}>
                </Col>
                <Col>
                    <Button>{onCancel ? onCancel : '取消'}</Button>
                </Col>
            </Row>
        )
    }
}

export default connect()(BaseButton);