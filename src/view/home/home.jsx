import React from 'react';
import {Layout, Icon} from 'antd';
import {MenuLayout} from '../../component/menu/menu-layout';
import {BrowserRouter as Router} from "react-router-dom";
import {HomeRoute} from "../route/home.route";
import './home.css';
import {UserAdminService} from "../../service/user/user.admin.service"; // 引入样式表

// 界面控件
const {
  Header, Content, Sider,
} = Layout;

export class Home extends React.Component {
  state = {
    collapsed: false,
  };

  // todo 测试用，直接登录管路员账号
  userAdminService = new UserAdminService();
  componentDidMount() {
    // this.userAdminService.login({
    //   params: {
    //     mobile: "admin",
    //     password: "1",
    //     type: 3
    //   },
    //   success: (data) => {}
    // })
  }

  /* 展开侧边栏函数 */
  toggleSider = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        <Layout className="layout">
          <Sider
            className="layout-sider"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="sider-content">
              <div className="logo">O2O</div>
              <div className="layout-sider__menu">
                {/* 菜单项 */}
                <MenuLayout/>
              </div>
            </div>
          </Sider>
          <Layout>
            {/* 重写头部CSS样式 */}
            <Header className="layout-header" style={{background: "#fff", padding: 0}}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggleSider}
              />
            </Header>
            <Content className="layout-main">
              {/* 路由切换组件区域 */}
              <HomeRoute/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
