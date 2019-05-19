import React, {Component} from "react";
import {Modal, Upload, Row, Col, Button, Form, Input, Icon, Card, Select, message, Table} from 'antd';
import {BannerAdminService} from "../../service/banner/banner.admin.service";
import {ColorUtil} from "../../util/color.util";
const confirm = Modal.confirm;
export class BannerManage extends Component {

  bannerAdminService = new BannerAdminService();

  componentDidMount() {
    this.setData();
  }

  columns = [{
    title: '',
    dataIndex: 'imageUrl',
    key: 'imageUrl',
    render: imageUrl => {
      return (
        <img height={"100px"} src={imageUrl} alt=""/>
      )
    }
  }, {
    title: '广告',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: type => {
      let text = "";
      switch (type) {
        case 0:
          text = "无跳转";
          break;
        case 1:
          text = "跳转至店铺";
          break;
        case 2:
          text = "跳转至商品";
          break;
        case 3:
          text = "跳转至链接";
          break;
      }
      return (
        <span>{text}</span>
      )
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      if (status === 1) {
        return (
          <span style={{color: ColorUtil.ACTIVE}}>启用中</span>
        )
      } else {
        return (
          <span style={{color: ColorUtil.INIT}}>禁用中</span>
        )
      }
    }
  }, {
    title: '',
    dataIndex: 'status',
    key: 'enable',
    render: (status, record) => {
      let enable = record.status !== 1;
      let text = enable ? "启用" : "禁用";
      return (
        <a onClick={() => this.enable(record.bannerId, enable)}>{text}</a>
      )
    }
  }, {
    title: '',
    dataIndex: 'bannerId',
    key: 'bannerId',
    render: bannerId => {
      return (
        <a onClick={() => this.remove(bannerId)}>删除</a>
      )
    }
  },];

  state = {
    data: [],
    loading: true,
  };

  setData() {
    this.setState({
      loading: true,
    });
    this.bannerAdminService.adminList({
      params: {},
      success: (result) => {
        this.setState({
          data: result.list,
          loading: false,
        });
      }
    })
  };

  enable = (bannerId, enable) => {
    let updateParam = {
      bannerId: bannerId,
      status: enable ? 1 : -2
    };
    this.bannerAdminService.update({
      params: updateParam,
      success: (data) => {
        this.setData();
      }
    })
  };

  remove = (bannerId) => {
    confirm({
      title: '确认',
      content: '是否删除',
      onOk: () => {
       this.submitRemove(bannerId)
      },
      onCancel() {
        // do nothing
      },
    });


  };

  submitRemove = (bannerId) => {
    this.bannerAdminService.detele({
      params: {
        bannerId: bannerId
      },
      success: (data) => {
        message.success("删除成功");
        this.setData();
      }
    });
  };

  render() {
    return (
      <Card title={"广告图管理"}>
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          pagination={false}
          rowKey="banner"
        />
      </Card>
    )
  }
}
