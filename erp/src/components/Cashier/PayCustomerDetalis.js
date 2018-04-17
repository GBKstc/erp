import { connect } from 'dva';
import { Row, Col, Form, Input } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import * as styles from "./PayCustomerDetalis.less";

const FormItem = Form.Item;

const {isEmpty} = variable;
const PayCustomerDetalis = ({customerDetalis,pay}) => {
   //const isShow = isEmpty(customerDetalis);
    if(isEmpty(customerDetalis)){
      customerDetalis = JSON.parse(localStorage.getItem("customerDetalis"));
    }
    return (
      <div className={styles.box}>
        <div className={styles.borBox}></div>
        <Row type="flex" align="middle">
          <Col span={24} style={{backgroundColor:"rgb(255,255,255)"}}>
            <Row type="flex" align="middle" gutter={16}>
              <Col span={6}>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerTitle}>{"顾客姓名"}</div>
                  </Col>
                </Row>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerName}>{customerDetalis.customername}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerTitle}>{"卡等级"}</div>
                  </Col>
                </Row>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerName}>{customerDetalis.cardrankname}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerTitle}>{"卡号"}</div>
                  </Col>
                </Row>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerName}>{customerDetalis.cardno}</div>
                  </Col>
                </Row>
              </Col>
              <Col span={6}>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerTitle}>{"手机号"}</div>
                  </Col>
                </Row>
                <Row type="flex" align="middle">
                  <Col span={24}>
                    <div className={styles.customerName}>{customerDetalis.customermobile}</div>
                  </Col>
                </Row>
              </Col>


            </Row>
          </Col>
        </Row>
      </div>

    );
};

export default connect(({cashier}) => (cashier))(PayCustomerDetalis);
