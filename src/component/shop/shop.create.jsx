import React from 'react';
import './shop.create.css';
import {Card, Form, Input, Button, Select, Row, Col, message} from 'antd';
import {ShopAdminService} from '../../service/shop/shop.admin.service';
import {TagAdminService} from "../../service/tag/tag.admin.service";

const Option = Select.Option;

export class ShopCreate extends React.Component {
  // 注入服务
  shopAdminService = new ShopAdminService();
  tagAdminService = new TagAdminService();

  // 构造函数
  constructor(props) {
    super(props);
    // 初始化 tag 标记组
    this.state = {
      tagData: []
    };
    // 绑定 `this`
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // 装载数据商品标签数据
    this.tagAdminService.list({
      params: null,
      success: (data) => {
        this.setState({
          tagData: data.tagThinResponse
        })
      }
    })
  }

  /**
   * 表单提交函数
   * @param event {event} - 事件
   * @author BillowsTao
   */
  handleSubmit(event) {
    // 阻止表单默认行为
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 验证通过
        let createParam = { // 传输 DTO
          userId: values.sellerId,
          name: values.shopName,
          address: values.shopAddress,
          email: values.shopEmail,
          imageUrl: '', // 图片地址先置为空
          mobile: values.shopPhoneNumber,
          tagIds: values.shopTag
        };
        console.log('表单的数据: ', values, 'DTO:', createParam);
        this.shopAdminService.shopCreate(
          {
            params: createParam, // 传递数据
            success: (data) => { // 成功回调函数
              message.success('成功添加店铺!');
            },
            final: () => {
              // 重置表单状态
              this.props.form.resetFields();
            }
          }
        );
      }
    });
  }

  getOption() {
    const optionList = [];
    let optionData = this.state.tagData;
    for (let i = 0; i < optionData.length; i++) {
      optionList.push(
        <Option key={optionData[i].tagId} value={optionData[i].tagId}>{optionData[i].name}</Option>
      )
    }
    return optionList;
  }

  // 渲染函数
  render() {
    // 获取表单属性组件-解构
    const {
      getFieldDecorator
    } = this.props.form;

    return (
      <div className="shop-create-layout">
        <Card
          className="shop-create"
          title="创建店铺"
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Card title={"卖家信息"}>
              <Row gutter={{xs: 8, sm: 16, md: 24}}>
                <Col lg={6} md={12}>
                  <Form.Item
                    label="卖家ID"
                  >
                    {/* 注册组件 */}
                    {getFieldDecorator('sellerId', {
                      rules: [{required: true, message: '请输入卖家ID'}],
                    })(
                      <Input placeholder="卖家ID"/>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={6} md={12}>
                  <Form.Item label="电话">
                    {getFieldDecorator('shopPhoneNumber')(
                      <Input placeholder="电话"/>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12}>
                  <Form.Item label="邮箱">
                    {getFieldDecorator('shopEmail')(
                      <Input placeholder="邮箱"/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <br/>
            <Card title={"店铺信息"}>
              <Row gutter={{xs: 8, sm: 16, md: 24}}>
                <Col lg={6} md={12}>
                  <Form.Item label="店铺标签">
                    {getFieldDecorator('shopTag',
                      {
                        valuePropName: 'checked' // 定义子节点的值的属性
                      })(
                      <Select
                        mode="multiple"
                        style={{width: '100%'}}
                        placeholder="店铺标签"
                        onChange={() => {
                        }}
                      >
                        {this.getOption()}
                      </Select>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={6} md={12}>
                  <Form.Item
                    label="店铺名"
                  >
                    {getFieldDecorator('shopName', {
                      rules: [{required: true, message: '请输入店铺名'}],
                    })(
                      <Input placeholder="店铺名"/>
                    )}
                  </Form.Item>
                </Col>
                <Col lg={12} md={12}>
                  <Form.Item label="地址">
                    {getFieldDecorator('shopAddress')(
                      <Input placeholder="地址"/>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Card>
            <br/>
            <Row type="flex" justify="center">
              <Col span={18} style={{textAlign: 'left'}}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    创建店铺
                  </Button>
                </Form.Item>
              </Col>
            </Row>

          </Form>
        </Card>
      </div>
    )
  }
}

/**
 * 创建包装的类
 * @author BillowsTao
 */
ShopCreate = Form.create({name: 'shop_create'})(ShopCreate);
