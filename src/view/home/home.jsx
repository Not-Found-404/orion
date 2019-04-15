import React from 'react';
import { Layout } from 'antd';
import { UserPaging } from '../../component/user/user.paging';
import { MenuLayout } from '../../component/menu/menu-layout';
import { Route} from "react-router-dom";
import './home.css'; // 引入样式表

// 界面控件
const {
    Header, Content, Sider,
} = Layout;

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
                            <MenuLayout />
                        </Sider>

                        {/* 内容呈现区域 */}
                        <Content className="content-container">
                            {/* 在此切换组件 */}
                            <Route path="/userManage" component={UserPaging} />
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
}