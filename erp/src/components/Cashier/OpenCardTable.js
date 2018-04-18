import { connect } from 'dva';
import { Row, Col,Table } from 'antd';
import {config,request,variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import React from 'react';

const columnsGoods  = [{
    title: '物品编号',
    dataIndex: 'code',
    key: 'code',
  }, {
    title: '物品名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '赠送数量',
    dataIndex: 'count',
    key: 'count',
  }
];

const columnsItem  = [{
    title: '项目编号',
  dataIndex: 'code',
  key: 'code',
  }, {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '赠送数量',
    dataIndex: 'count',
    key: 'count',
  }
];
const OpenCardTable = ({ title, dataSource }) => {
// class OpenCardTable extends React.Component{
//     constructor(props){
//         super(props);
//     }


    // render(){
        const columns = title=="赠送物品"?columnsGoods:columnsItem;
        return (
            <BaseBox title={title?title:"模块"}>
            <Table bordered dataSource={dataSource} size="small" columns={columns} pagination={false} />
            </BaseBox>

        )
    // }
}

export default connect()(OpenCardTable);
