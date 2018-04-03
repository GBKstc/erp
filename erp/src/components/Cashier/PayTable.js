import { connect } from 'dva';
import { Row, Col, Table  } from 'antd';
import {variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';


const {isEmpty} = variable;

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

const columns = [{
  title: '充值单号',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '充值账户',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '充值金额',
  dataIndex: 'addres',
  key: 'addres',
}, {
  title: '支付方式',
  dataIndex: 'addre',
  key: 'addre',
}, {
  title: '状态',
  dataIndex: 'address',
  key: 'address',
}];


const PayTable = ({}) => {
   
    return (
        <BaseBox title="本次订单充值记录">
            <Table bordered dataSource={dataSource} columns={columns} pagination={false}/>
        </BaseBox>
               
    );
};

export default connect(({cashier}) => (cashier))(PayTable);