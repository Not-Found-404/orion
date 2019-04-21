import React from 'react';
import './shop.create.css';
import { Card, Form, Input, Button, Select, Row, Col, message } from 'antd';
import { ShopAdminService } from '../../service/shop/shop.admin.service';
const Option = Select.Option;

/**
 * 表单验证函数-判断表单项合法性
 * @param fieldsError {object[]} - 获取控件的 Error
 * @author BillowsTao
 */
function hasErrors(fieldsError) {
  // 判断表单项的合法性，并进行校验
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export class ShopCreate extends React.Component {
  // 注入服务
  shopAdminService = new ShopAdminService();

  // 构造函数
  constructor(props) {
    super(props);

    // 绑定 `this`
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // 装载数据商品标签数据
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
        let createParam  = { // 传输 DTO
          userId: values.sellerId,
          name: values.shopName,
          address: values.shopAddress,
          email: values.shopEmail,
          imageUrl: '', // 图片地址先置为空
          mobile: values.shopPhoneNumber,
          tagIds: values.shopTag
        }
        console.log('表单的数据: ', values, 'DTO:',createParam);
        this.shopAdminService.shopCreate(
          {
            params:createParam, // 传递数据
            success: (data) => { // 成功回调函数
              message.success('成功添加店铺!');
            },
            final: ()=>{
              // 重置表单状态
              this.props.form.resetFields();
            }
          }
        );
      }
    });
  }

  // 渲染函数
  render() {
    // 获取表单属性组件-解构
    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = this.props.form;

    return (
      <div className="shop-create-layout">
        <Card
          className="shop-create"
          title="创建店铺"
        >
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col lg={8} md={12}>
                <Form.Item
                  label="卖家ID"
                >
                  {/* 注册组件 */}
                  {getFieldDecorator('sellerId', {
                    rules: [{ required: true, message: '请输入卖家ID' }],
                  })(
                    <Input placeholder="卖家ID" />
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={12}>
                <Form.Item
                  label="店铺名"
                >
                  {getFieldDecorator('shopName', {
                    rules: [{ required: true, message: '请输入店铺名' }],
                  })(
                    <Input placeholder="店铺名" />
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={12}>
                <Form.Item label="地址">
                  {getFieldDecorator('shopAddress')(
                    <Input placeholder="地址" />
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={12}>
                <Form.Item label="电话">
                  {getFieldDecorator('shopPhoneNumber')(
                    <Input placeholder="电话" />
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={12}>
                <Form.Item label="邮箱">
                  {getFieldDecorator('shopEmail')(
                    <Input placeholder="邮箱" />
                  )}
                </Form.Item>
              </Col>
              <Col lg={8} md={12}>
                <Form.Item label="店铺标签">
                  {getFieldDecorator('shopTag',
                    {
                      valuePropName: 'checked' // 定义子节点的值的属性
                    })(
                      <Select
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="店铺标签"
                        onChange={() => { }}
                      >
                        <Option value="零售店">零售店</Option>
                        <Option value="超市">超市</Option>
                      </Select>
                    )}
                </Form.Item>
              </Col>
            </Row>
            <Row type="flex" justify="center">
              <Col>
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
ShopCreate = Form.create({ name: 'shop_create' })(ShopCreate);
