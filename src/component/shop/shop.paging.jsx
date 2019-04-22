import React, { Component } from 'react';
import { Table, Form, Row, Col, Input, Button, Card } from 'antd';
import { ShopAdminService } from "../../service/shop/shop.admin.service";
import { ColorUtil } from "../../util/color.util";

/**
 * Created by wildhunt_unique
 */
export class ShopPaging extends Component {

  shopAdminService = new ShopAdminService();

  constructor(props) {
    super(props);

    // 构造初始化参数
    this.state = {
      data: [],
      pagination: {},
      loading: true,
      shopIdParam: null,
      shopNameParam: null,
      userIdParam: null,
      mobileParam: null
    };

    // 绑定 `this`
    this.initDataForm = this.initDataForm.bind(this);
    this.resetSearchForm = this.resetSearchForm.bind(this);
  }

  componentDidMount() {
    // 初始化加载数据
    this.initDataForm();
  }

  columns = [
    {
      title: '店铺Id',
      dataIndex: 'shopId',
      key: 'shopId',
    },
    {
      title: '店铺名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系电话',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '卖家id',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: '卖家姓名',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: status => {
        if (status === 1) {
          return (
            <span style={{ "color": ColorUtil.ACTIVE }}>营业中</span>
          )
        } else if (status === -1) {
          return (
            <span style={{ "color": ColorUtil.INIT }}>歇业中</span>
          )
        } else if (status === -2) {
          return (
            <span style={{ "color": ColorUtil.INIT }}>冻结中</span>
          )
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'enable',
      render: (text, record) => {
        let enable = !(record.status === 1);
        let enableText = enable ? '解冻' : '冻结';
        return (
          <a onClick={() => this.enableStatus(record.shopId, enable)}>{enableText}</a>
        );
      }
    }
  ];

  enableStatus = (shopId, enbale) => {
    let status = enbale ? 1 : -2;
    this.shopAdminService.shopUpdate({
      params: {
        shopId: shopId,
        status: status
      },
      success: (data) => {
        this.setData();
      }
    })
  };

  /**
   * 初始化页面数据
   */
  initDataForm() {
    this.setState({
      loading: true,
    });
    this.shopAdminService.shopPaging({
      params: {},
      success: (data) => {
        this.setState({
          data: data.data,
          loading: false
        })
      }
    })
  }

  // 提交表单函数
  handleSearch = (event) => {
    // 阻止表单默认行为
    event.preventDefault();
    let formFieldsValue = this.props.form.getFieldsValue();
    // 处理请求参数
    let searchParam = {
      shopId: formFieldsValue.shopIdParam ? formFieldsValue.shopIdParam : null,
      name: formFieldsValue.shopNameParam ? formFieldsValue.shopNameParam : null,
      userId: formFieldsValue.userIdParam ? formFieldsValue.userIdParam : null,
      mobile: formFieldsValue.mobileParam ? formFieldsValue.mobileParam : null
    };
    // 加载动画展示
    this.setState({
      loading: true,
    });
    this.shopAdminService.shopPaging({
      params: searchParam,
      success: (data) => {
        this.setState({
          data: data.data,
          loading: false
        })
      }
    })
  };

  /**
   * 重置表单查询数据
   */
  resetSearchForm() {
    // 初始化加载数据
    this.initDataForm();
    // 重置查询条件
    this.props.form.resetFields();
  }

  render() {
    // 获取表单属性组件-解构
    const {
      getFieldDecorator
    } = this.props.form;
    return (
      <Card title="店铺管理">
        <Form
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>

            <Col span={6}>
              <Form.Item label={`店铺id`}>
                {getFieldDecorator('shopIdParam')(
                  <Input name="shopIdParam" placeholder="输入手机号" />
                )}
              </Form.Item>
            </Col>


            <Col span={6}>
              <Form.Item label={`店铺名`}>
                {getFieldDecorator('shopNameParam')(
                  <Input name="shopNameParam" placeholder="输入店铺名" />
                )}
              </Form.Item>
            </Col>


            <Col span={6}>
              <Form.Item label={`卖家id`}>
                {getFieldDecorator('userIdParam')(
                  <Input name="userIdParam" placeholder="输入用户id" />
                )}
              </Form.Item>
            </Col>


            <Col span={6}>
              <Form.Item label={`联系电话`}>
                {getFieldDecorator('mobileParam')(
                  <Input name="mobileParam" placeholder="输入联系电话" />
                )}
              </Form.Item>
            </Col>

          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.resetSearchForm}>
                重置
              </Button>
            </Col>
          </Row>
          <br />
          <Table
            columns={this.columns}
            rowKey="shopId"
            dataSource={this.state.data}
            loading={this.state.loading}
          />
        </Form>
      </Card>
    )
  }
}

/**
 * 创建包装的类
 * @author BillowsTao
 */
ShopPaging = Form.create({ name: 'shop_manage' })(ShopPaging);
