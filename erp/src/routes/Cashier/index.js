import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { Link, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import { connect } from 'dva';
const basePath = "../../"

const Cashier = ({
    app,children,match,dispatch
})=>{
    //到店服务
    const StoreService = dynamic({
        app,
        component: () => import('./StoreService'),
    });
    //充值
    const Pay = dynamic({
        app,
        component: () => import('./Pay'),
    });
    return (
        <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item key="1"><Link to={`${match.url}/storeService`}><Icon type="home" />到店服务</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={`${match.url}/users`}><Icon type="home" />非护理服务</Link></Menu.Item>
                    <Menu.Item key="3"><Link to={`${match.url}/users`}><Icon type="exception" />订单查询</Link></Menu.Item>

                </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb style={{ margin: '8px 0' }}>
                    <Breadcrumb.Item>{match.url}</Breadcrumb.Item>
                </Breadcrumb>
                <Content style={{ background: 'rgb(245,245,245)', margin: 0, minHeight: 560 }}>
                <Switch>
                    <Route exact path={match.url+"/storeService"} component={StoreService} />
                    <Route exact path={match.url+"/pay"} component={Pay} />
                </Switch>
                </Content>
            </Layout>
        </Layout>       
        
    )
}

export default connect(({cashier,app})=>({cashier,app}))(Cashier);