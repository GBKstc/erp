import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import { withRouter } from 'dva/router';
import styles from './app.less';
const App = ({
    children, 
})=>{

    return (
        <Layout>
            <Header className={styles.header}>
                <div className={styles.logo} >
                    <img className={styles.logoImg} src= "http://ruocha.oss-cn-shanghai.aliyuncs.com/erp/ERP-head/img/logo.png"/>
                    <img className={styles.logoImg} src= "http://ruocha.oss-cn-shanghai.aliyuncs.com/erp/ERP-head/img/logo_letter.png"/>
                </div>

                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '50px',fontSize: '18px' }}
                >
                    <Menu.Item key="1">收银</Menu.Item>
                    <Menu.Item key="2">顾客</Menu.Item>
                    <Menu.Item key="3">物流</Menu.Item>
                    <Menu.Item key="4">资料</Menu.Item>
                    <Menu.Item key="5">分类</Menu.Item>
                    <Menu.Item key="6">表单</Menu.Item>
                    <Menu.Item key="7">设置</Menu.Item>
                    <Menu.Item key="8">喜报</Menu.Item>
                    <Menu.Item key="9">喜报排班</Menu.Item>
                    
                </Menu>
            </Header>
            {/* <Layout>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb style={{ margin: '8px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 560 }}>
                        {children}
                    </Content>
                </Layout>
            </Layout> */}
            {children}
        </Layout>
    )
}

export default App;