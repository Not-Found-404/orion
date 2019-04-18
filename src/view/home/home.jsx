import React from 'react';
import { Layout, Icon } from 'antd';
import { UserPaging } from '../../component/user/user.paging';
import { MenuLayout } from '../../component/menu/menu-layout';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './home.css';
import { CommentPaging } from "../../component/order/comment.paging";
import { ShopPaging } from "../../component/shop/shop.paging";
import { TagPaging } from "../../component/shop/tag.paging"; // 引入样式表

// 界面控件
const {
  Header, Content, Sider,
} = Layout;

export class Home extends React.Component {
  state = {
    collapsed: false,
  };

  /* 展开侧边栏函数 */
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

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
                <MenuLayout />
              </div>
            </div>

          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff',
            }}
            >
              {/* 路由切换组件区域 */}
              <Route path="/userManage" exact component={UserPaging} />
              <Route path="/tagManage" exact component={TagPaging} />
              <Route path="/shopManage" exact component={ShopPaging} />
              <Route path="/commentManage" exact component={CommentPaging} />
          </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
