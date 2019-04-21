import React from 'react';
import './shop.create.css';
import { Card, Form } from 'antd';

export class ShopCreate extends React.Component {

  constructor(props) {
    super(props);
    console.log();
  }

  // 渲染函数
  render() {

    return (
      <div className="shop-create-layout">
        <Card
          className="shop-create"
          title="创建店铺"
        >
          <Form layout="inline" onSubmit={this.handleSubmit} >

          </Form>
        </Card>
      </div>
    )

  }
}


