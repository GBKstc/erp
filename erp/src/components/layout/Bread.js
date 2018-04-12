import React from 'react'
import { Breadcrumb, Icon } from 'antd'
import { Link } from 'dva/router';
import { connect } from 'dva';

import styles from './Layout.less'

const Bread = ({location}) => {
  // 匹配当前路由
  //console.log(location);
  let pathname = location.pathname;
  let pathList = pathname.substr(0,1)=='/'?location.pathname.substr(1).split("/"):location.pathname.split("/");
  const Path = [
    {
      id: 1,
      name: '收银',
      router: '/cashier',
    },{
      id: 2,
      name: '到店服务',
      router: '/cashier/storeService',
      parentId:1,
    },{
      id: 3,
      name: '非护理服务',
      router: '/cashier/storeService',
      parentId:1,
    },{
      id: 4,
      name: '订单查询',
      router: '/cashier/storeService',
      parentId:1,
    },{
      id: 5,
      name: '充值',
      router: '/cashier/pay',
      parentId:2,
    },{
      id: 6,
      name: '补充值',
      router: '/cashier/repairPay',
      parentId:2,
    },{
      id: 7,
      name: '购买',
      router: '/cashier/buy',
      parentId:2,
    },
    
  ]

 

  // 递归查找父级
  
  const createBread = function (pathName,pathList = []){
    let path = Path.find((item)=>item.router===pathName);
    pathList.unshift(<Breadcrumb.Item key={path.id}><Link to={path.router}>{path.name}</Link></Breadcrumb.Item>)
    if(!path){
      return null;
    }else if(!path.parentId){
      return pathList
    } else {
      return createBread(Path.find((item)=>item.id===path.parentId).router,pathList)
    };
  }
  const breads = createBread(pathname);
  return (
    <div className={styles.bread}>
      <Breadcrumb>
        {breads}
      </Breadcrumb>
    </div>
  )
}


export default connect()(Bread);
