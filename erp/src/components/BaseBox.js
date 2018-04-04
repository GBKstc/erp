import { Row, Col, Button } from 'antd';
import { connect } from 'dva';

import styles from './BaseBox.less';
import {variable} from '../utils'
const { isEmpty} = variable;

const BaseBox = ({ children, title, header})=>{
    const hasTitle = isEmpty(title);
    const Header = isEmpty(header) ? null : header;
    return (
        <Row className={styles.baseBox}>
            <Col span={24} className={hasTitle?styles.dispalyNone:styles.title}>
                <Row>
                    <Col span={12}>
                        {title}
                    </Col>
                    <Col offset={11} span={1} >
                        {Header}
                    </Col>
                </Row>
                
            </Col>
            <Col span={24}>{children}</Col>
        </Row>
    )
}

export default connect()(BaseBox);