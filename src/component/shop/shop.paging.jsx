import React, {Component} from 'react';
import {Table, Form, Row, Col, Input, Button} from 'antd';
import {ShopAdminService} from "../../service/shop/shop.admin.service";

export class ShopPaging extends Component {

  shopAdminService = new ShopAdminService();

  componentDidMount() {
    this.setData();
  }

  state = {
    data: [],
    pagination: {},
    loading: true,
    shopIdParam: null,
    shopNameParam: null,
    userIdParam: null,
    mobileParam: null
  };

  columns = [{
    title: '店铺Id',
    dataIndex: 'shopId',
    key: 'shopId',
  }, {
    title: '店铺名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '联系电话',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '卖家id',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    title: '卖家姓名',
    dataIndex: 'userName',
    key: 'userName'
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      if (status === 1) {
        return '营业中'
      } else if (status === -1) {
        return '歇业中'
      } else if (status === -2) {
        return '冻结中'
      }
    }
  }, {
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
  }];

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

  setData = () => {

    let searchParam = {
      shopId: this.state.shopIdParam,
      name: this.state.shopNameParam,
      userId: this.state.userIdParam,
      mobile: this.state.mobileParam
    };
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

  inputChangeHandler = (e) => {
    let o = {};
    o[e.target.name] = e.target.value;
    this.setState(o);
  };

  getFields = () => {
    const searchParamsInput = [];
    searchParamsInput.push(
      <Col span={6} key={1}>
        <Form.Item label={`店铺id`}>
          <Input onChange={this.inputChangeHandler} name="shopIdParam" placeholder="输入手机号"/>
        </Form.Item>
      </Col>
    );
    searchParamsInput.push(
      <Col span={6} key={2}>
        <Form.Item label={`店铺名`}>
          <Input onChange={this.inputChangeHandler} name="shopNameParam" placeholder="输入店铺名"/>
        </Form.Item>
      </Col>
    );
    searchParamsInput.push(
      <Col span={6} key={3}>
        <Form.Item label={`卖家id`}>
          <Input onChange={this.inputChangeHandler} name="userIdParam" placeholder="输入用户id"/>
        </Form.Item>
      </Col>
    );
    searchParamsInput.push(
      <Col span={6} key={4}>
        <Form.Item label={`联系电话`}>
          <Input onChange={this.inputChangeHandler} name="mobileParam" placeholder="输入联系电话"/>
        </Form.Item>
      </Col>
    );
    return searchParamsInput;
  };


  render() {
    return (
      <div>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>{this.getFields()}</Row>
          <Row>
            <Col span={24} style={{textAlign: 'right'}}>
              <Button type="primary" onClick={() => {
                this.setData()
              }}>搜索</Button>
              <Button style={{marginLeft: 8}} onClick={this.setData}>
                重置
              </Button>
            </Col>
          </Row>
          <br/>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            loading={this.state.loading}
          />
        </Form>
      </div>
    )
  }
}
