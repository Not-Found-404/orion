import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { UserPaging } from '../../component/user/user.paging';
import './home.css'; // 引入样式表

// 界面控件
const {
    Header, Content, Sider,
} = Layout;
const { SubMenu } = Menu;

export class Home extends React.Component {
    render() {
        return (
            <Layout className="layout">
                {/* 页面头 */}
                <Header className="layout-header" style={{ backgroundColor: "#007bff", }}>
                    <div className="logo" >LOGO</div>
                </Header>
                {/* 页面主体 */}
                <Content className="layout-main">
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        {/* 侧边栏 */}
                        <Sider className="layout-sider">
                            {/* 菜单 */}
                            <Menu className="layout-sider__menu"
                              mode="inline"
                              defaultSelectedKeys={['1']}
                              defaultOpenKeys={['sub1']}
                            >
                                {/* 菜单项 */}
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

                        {/* 内容呈现区域 */}
                        <Content className="content-container">
                            {/* 在此切换组件 */}
                            <UserPaging />
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}