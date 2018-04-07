import { connect } from 'dva';
import { Row, Col, Table,Modal,Button  } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import QRCode from 'qrcode.react';

const {
  isEmpty,
  } = variable;




const PayModal = ({ visibleModal, dispatch}) => {
  console.log(visibleModal);
  const key = "PayModal";
  const handleOk = (key) => {
    console.log(key);
    dispatch({
      type: 'cashier/openModal',
      payload: {
        key
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
        title="Basic Modal"
        visible={visibleModal.PayModal}
        onOk={handleOk.bind(this, key)}
        okText="支付成功"
        onCancel={handleCancel.bind(this, key)}
        cancelText="支付失败"
      >
        <Row type="flex" justify="center">

          <QRCode value="http://baidu.com" />

        </Row>

      </Modal>

    );
};

export default connect(({ cashier }) => (cashier))(PayModal);
