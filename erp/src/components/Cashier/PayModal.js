import { connect } from 'dva';
import { Row, Col, Table,Modal,Button,message  } from 'antd';
import {variable,request,config} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import QRCode from 'qrcode.react';

const {
  isEmpty,
  } = variable;
const {
  api
} = config;
const PayModal = ({ visibleModal, dispatch ,payState}) => {
  console.log(payState);
  const key = "PayModal";
  const handleOk = (key) => {
    console.log(key);
    let reqData = {
      'orderno':payState.ordernoId,
      'chargetype':"0",
    };
    request({
      url:api.paystatusCheck,
      data:reqData,
    }).then(({data})=>{
      if((!isEmpty(data))&&data.paystatus == "03"){
        message.success("支付成功!");
        this.handleCancel.bind(this,key)();
        return false;
      }
      message.info("还在支付中，请等待几秒后重试");
    });
    // dispatch({
    //   type: 'cashier/openModal',
    //   payload: {
    //     key
    //   }
    // })
  };

  const handleCancel = (key) => {
    payState.isButton = true;
    dispatch({
      type:'cashier/saveData',
      payload:{
        payload: {
          data:Object.assign({},{...payState}),
          key:"payState"
        }
      }
    });

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
          <QRCode value={payState.ordernoId} />
        </Row>
      </Modal>

    );
};

export default connect(({ cashier }) => (cashier))(PayModal);
