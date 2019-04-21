import React, {Component} from 'react';
import {Table, Form, Row, Col, Input, Button, Modal} from 'antd';
import {OrderAdminService} from "../../service/order/order.admin.service";
import {TimeUtil} from "../../util/time.util";
import {ColorUtil} from "../../util/color.util";

/**
 * Created by wildhunt_unique
 */
export class OrderPaging extends Component {

  orderAdminService = new OrderAdminService();


  componentDidMount() {
    this.setData();
  }

  columns = [{
    title: '订单Id',
    dataIndex: 'orderId',
    key: 'orderId',
  }, {
    title: '店铺名',
    dataIndex: 'shopName',
    key: 'shopName',
  }, {
    title: '买家id',
    dataIndex: 'buyerId',
    key: 'buyerId',
  }, {
    title: '买家昵称',
    dataIndex: 'buyerName',
    key: 'buyerName',
  }, {
    title: '买家手机',
    dataIndex: 'userName',
    key: 'userName'
  }, {
    title: '',
    dataIndex: 'payStatus',
    key: 'payStatus',
    render: payStatus => {
      if (payStatus === 1) {
        return (
          <span style={{"color": ColorUtil.ACTIVE}}>已付款</span>
        )
      } else if (payStatus === -1) {
        return (
          <span style={{"color": ColorUtil.IN_ACTIVE}}>未付款</span>
        )
      }
    }
  }, {
    title: '',
    dataIndex: 'enableStatus',
    key: 'enableStatus',
    render: enableStatus => {
      if (enableStatus === 1) {
        return (
          <span style={{"color": ColorUtil.ACTIVE}}>已接单</span>
        )
      } else if (enableStatus === -1) {
        return (
          <span style={{"color": ColorUtil.IN_ACTIVE}}>已拒绝</span>
        )
      }
    }
  }, {
    title: '',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => {
      return TimeUtil.formatTime(createdAt, true);
    }
  }, {
    title: '',
    dataIndex: 'status',
    key: 'detail',
    render: (text, record) => {
      return (
        <a onClick={() => this.detailModalOpen(record.orderId)}>查看详情</a>
      );
    }
  }];

  state = {
    // 表格参数
    data: [],
    pagination: {},
    loading: true,
    // 查询参数
    shopIdParam: null,
    enableStatusParam: null,
    payStatusParam: null,
    buyerIdParam: null,
    // 详情页
    detailModalVisible: false,
    detailData: null
  };

  setData = () => {
    this.setState({
      loading: true
    });
    let searchParam = {
      shopId: this.state.shopIdParam,
      enableStatus: this.state.enableStatusParam,
      payStatus: this.state.payStatusParam,
      buyerId: this.state.buyerIdParam
    };
    this.orderAdminService.paging({
      params: searchParam,
      success: (result) => {
        this.setState({
          data: result.data
        })
      },
      final: () => {
        this.setState({
          loading: false
        })
      }
    });
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
        <Form.Item label={`买家id`}>
          <Input onChange={this.inputChangeHandler} name="buyerIdParam" placeholder="输入买家id"/>
        </Form.Item>
      </Col>
    );
    return searchParamsInput;
  };

  inputChangeHandler = (e) => {
    let o = {};
    o[e.target.name] = e.target.value;
    this.setState(o);
  };

  render() {
    return (
      <div>
        <Form
          className="ant-advanced-search-form"
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
        {this.getDetailModal()}
      </div>
    )
  }

  detailModalOpen = (orderId) => {
    this.setState({
      detailData: null
    });
    this.orderAdminService.getDetail({
      params: {
        orderId: orderId
      },
      success: (data) => {
        this.setState({
          detailModalVisible: true,
          detailData: data
        });
      }
    });
  };

  detailModalClose = () => {
    this.setState({
      detailModalVisible: false
    })
  };

  getOrderInfo = () => {
    const view = [];
    let detailData = this.state.detailData;
    if (detailData != null) {
      let orderInfo = detailData.orderThinResponse;
        view.push(
          <div>{orderInfo.buyerNotes}</div>
        );
    }
    return view;
  };

  getDetailModal = () => {

    const modal = [];
    modal.push(
      <Modal
        visible={this.state.detailModalVisible}
        title="订单详情"
        onCancel={this.detailModalClose}
        width={720}
        footer={[
          <Button key="back" onClick={this.detailModalClose}>关闭</Button>
        ]}
      >
        <Row>
          <Col span={24} key={1}>
            {this.getOrderInfo()}
          </Col>
        </Row>
      </Modal>
    );
    return modal;
  };
}
