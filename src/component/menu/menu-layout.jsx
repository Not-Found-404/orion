import React from 'react';
import { Link } from "react-router-dom";
import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;

export class MenuLayout extends React.Component {
  render() {
    return (
      <Menu className="layout-sider__menu"
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
      >
        {/* 菜单项 */}
        <SubMenu key="sub1" title={<span><Icon type="user" />用户</span>}>
          <Menu.Item key="1">
            {/* 路由链接 */}
            <Link to="/userManage/">用户管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="shop" />店铺</span>}>
          <Menu.Item key="2">创建店铺</Menu.Item>
          <Menu.Item key="3">店铺标签</Menu.Item>
          <Menu.Item key="4">店铺管理</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="pay-circle" />交易</span>}>
          <Menu.Item key="9">订单管理</Menu.Item>
          <Menu.Item key="10">评价管理</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
