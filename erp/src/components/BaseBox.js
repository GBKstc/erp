import { Row, Col,  } from 'antd';
import { connect } from 'dva';

import styles from './BaseBox.less';
import {variable} from '../utils'
const { isEmpty} = variable;

const BaseBox = ({children,title})=>{
    const hasTitle = isEmpty(title);
    return (
        <Row className={styles.baseBox}>
            <Col span={24} className={hasTitle?styles.dispalyNone:styles.title}>{title}</Col>
            <Col span={24}>{children}</Col>
        </Row>
    )
}

export default connect()(BaseBox);