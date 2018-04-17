import { connect } from 'dva';
import { Row, Col,Table } from 'antd';
import {config,request,variable} from '../../utils';
import { Link } from 'dva/router';
import BaseBox from '../BaseBox';
import React from 'react';

const columnsGoods  = [{
    title: '物品编号',
    dataIndex: 'orderno',
    key: 'orderno',
  }, {
    title: '物品名称',
    dataIndex: 'sonaccountName',
    key: 'sonaccountName',
  }, {
    title: '赠送数量',
    dataIndex: 'money',
    key: 'money',
  }
];

const columnsItem  = [{
    title: '项目编号',
    dataIndex: 'orderno',
    key: 'orderno',
  }, {
    title: '项目名称',
    dataIndex: 'sonaccountName',
    key: 'sonaccountName',
  }, {
    title: '赠送数量',
    dataIndex: 'money',
    key: 'money',
  }
];
class OpenCardTable extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        const columns = this.props.title=="赠送物品"?columnsGoods:columnsItem;
        return (
            <BaseBox title={this.props.title?this.props.title:"模块"}>
                 <Table bordered dataSource={null} size="small" columns={columns} pagination={false} />
            </BaseBox>

        )
    }
}

export default connect()(OpenCardTable);
