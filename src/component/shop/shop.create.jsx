import React from 'react';
import './shop.create.css';
import { Card } from 'antd';

export class ShopCreate extends React.Component {

  // 渲染函数
  render() {

    return (
      <div className="shop-create-layout">
        <Card
          className="shop-create"
          title="创建店铺"
        >
        创建店铺界面
        </Card>
      </div>
    )

  }
}


