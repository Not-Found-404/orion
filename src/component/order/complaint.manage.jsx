import React, {Component} from 'react';
import {Table, Form, Row, Col, Input, Button, Rate, Card, Modal} from 'antd';
import {CommentAdminService} from "../../service/comment/comment.admin.service";
import {TimeUtil} from "../../util/time.util";
import {ColorUtil} from "../../util/color.util";
import {ComplaintAdminService} from "../../service/complaint/complaint.admin.service";

/**
 * Created by wildhunt_unique
 */
export class ComplaintManage extends Component {
  complaintAdminService = new ComplaintAdminService();

  componentDidMount() {
    this.setData();
  }

  state = {
    data: [],
    pagination: {},
    loading: true,
    shopIdParam: null,
    userIdParam: null,
    userMobileParam:null,
    pageTotal: null,
    // 详情页
    detailModalVisible: false,
    detailData:null
  };

  setData = (pageNo = 1, pageSize = 5) => {
    let searchParam = {
      pageNo:pageNo,
      pageSize:pageSize,
      shopId:this.state.shopIdParam,
      userMobile:this.state.userMobileParam
    };
    this.setState({
      loading: true
    });
    this.complaintAdminService.paging({
      params: searchParam,
      success: (data) => {
        this.setState({
          data: data.data,
          loading: false,
          pageTotal: data.total,
          pageNo:pageNo
        })
      }
    });
  };

  columns = [{
    title: '投诉描述',
    dataIndex: 'title',
    key: 'title',
  },{
    title: '店铺名',
    dataIndex: 'shopName',
    key: 'shopName',
  },  {
    title: '店铺编号',
    dataIndex: 'shopId',
    key: 'shopId'
  },{
    title: '投诉人',
    dataIndex: 'nickName',
    key: 'nickName'
  }, {
    title: '投诉人手机号',
    dataIndex: 'userMobile',
    key: 'userMobile'
  }, {
    title: '投诉时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => {
      return TimeUtil.formatTime(createdAt,true);
    }
  }, {
    title: '',
    key: 'op',
    render: (text, record) => {
      return (
        <a onClick={() => this.detailModalOpen(record)}>查看详情</a>
      );
    }
  }];

  detailModalOpen = (record) => {
    this.setState({
      detailData: record,
      detailModalVisible: true,
    });
  };

  detailModalClose = () => {
    this.setState({
      detailData:null,
      detailModalVisible: false
    })
  };

  getDetailModal = () => {
    const modal = [];
    let detailData = this.state.detailData;
    if (detailData!=null){
      modal.push(
        <Modal
          visible={this.state.detailModalVisible}
          title="投诉详情"
          onCancel={this.detailModalClose}
          width="80%"
          footer={[
            <Button key="back" onClick={this.detailModalClose}>关闭</Button>
          ]}
        >
          <Row>
            <Col span={24} key={"title"}>
              <Form.Item label={``}>
                <span>{detailData.title}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} key={"content"}>
              <Form.Item label={``}>
                <span>{detailData.content}</span>
              </Form.Item>
            </Col>
          </Row>
          <hr/>
          <Row>
            <Col span={6} key={"nickName"}>
              <Form.Item label={`投诉人`}>
                <span>{detailData.nickName}</span>
              </Form.Item>
            </Col>
            <Col span={6} key={"userMobile"}>
              <Form.Item label={`手机号`}>
                <span>{detailData.userMobile}</span>
              </Form.Item>
            </Col>
            <Col span={12} key={"createdAt"}>
              <Form.Item label={`投诉时间`}>
                <span>{TimeUtil.formatTime(detailData.createdAt,true)}</span>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} key={"shopName"}>
              <Form.Item label={`店铺`}>
                <span>{detailData.shopName}</span>
              </Form.Item>
            </Col>
            <Col span={6} key={"shopMobile"}>
              <Form.Item label={`联系方式`}>
                <span>{detailData.shopMobile}</span>
              </Form.Item>
            </Col>
            <Col span={6} key={"shopId"}>
              <Form.Item label={`编号`}>
                <span>{detailData.shopId}</span>
              </Form.Item>
            </Col>
          </Row>
        </Modal>
      );
    }
    return modal;
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
        <Form.Item label={`店铺编号`}>
          <Input onChange={this.inputChangeHandler} name="shopIdParam" placeholder="输入店铺编号"/>
        </Form.Item>
      </Col>
    );
    searchParamsInput.push(
      <Col span={6} key={1}>
        <Form.Item label={`手机号`}>
          <Input onChange={this.inputChangeHandler} name="userMobileParam" placeholder="输入投诉人手机号"/>
        </Form.Item>
      </Col>
    );
    return searchParamsInput;
  };

  render() {
    return (
      <Card title="投诉管理">
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
              <Button style={{marginLeft: 8}} onClick={() => this.setData()}>
                重置
              </Button>
            </Col>
          </Row>
          <br/>
          <Table
            columns={this.columns}
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={{
              total: this.state.pageTotal,
              defaultCurrent: 1,
              pageSize: 5,
              current: this.state.pageNo,
              onChange: (current, pageSize) => {
                this.pageChange(current, pageSize)
              }
            }}
          />
        </Form>
        {this.getDetailModal()}
      </Card>)
  }
}
