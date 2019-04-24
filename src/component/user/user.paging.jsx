import React, { Component } from 'react';
import { Table, Avatar, Form, Row, Col, Input, Button, Select, Card } from 'antd';
import { UserAdminService } from "../../service/user/user.admin.service";
import { ColorUtil } from "../../util/color.util";

const { Option } = Select;

/**
 * Created by wildhunt_unique
 */
export class UserPaging extends Component {

  userAdminService = new UserAdminService();

  constructor(props) {
    super(props);

    // 构造初始化参数
    this.state = {
      data: [],
      loading: true,
    };

    // 绑定 `this`
    this.initData = this.initData.bind(this);
  }

  columns = [{
    title: '',
    dataIndex: 'avatar',
    key: 'avatar',
    render: avatar => {
      avatar = 'http://' + avatar;
      return <Avatar src={avatar} />
    }
  }, {
    title: '用户id',
    dataIndex: 'userId',
    key: 'userId',
  }, {
    title: '昵称',
    dataIndex: 'nickname',
    key: 'nickname',
  }, {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
  }, {
    title: '真实姓名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '电话',
    dataIndex: 'mobile',
    key: 'mobile',
  }, {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
    render: type => {
      if (type === 2) {
        return '商家'
      } else {
        return '消费者'
      }
    }
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: status => {
      if (status === 1) {
        return (
          <span style={{ "color": ColorUtil.ACTIVE }}>启用中</span>
        )
      } else {
        return (
          <span style={{ "color": ColorUtil.INIT }}>禁用中</span>
        )
      }
    }
  }, {
    title: '操作',
    dataIndex: 'status',
    key: 'enable',
    render: (text, record) => {
      let enbale = !(record.status === 1);
      let enbaleText = enbale ? '启用' : '禁用';
      return (
        <a href="./#" onClick={this.enableStatus.bind(this, record.userId, enbale)}>{enbaleText}</a>
      );
    }
  }];

  enableStatus = (userId, isEnable, event) => {
    event.preventDefault();
    let status = isEnable ? 1 : -2;
    this.userAdminService.updateStatus({
      params: {
        userId: userId,
        status: status
      },
      success: () => {
        // 重新请求数据
        this.initData();
      }
    })
  };

  initData() {
    let formFieldsValue = this.props.form.getFieldsValue();
    let searchParams = {
      userId: formFieldsValue.userId ? formFieldsValue.userId : null,
      mobile: formFieldsValue.mobile ? formFieldsValue.mobile : null,
      type: formFieldsValue.type ? formFieldsValue.type : null,
    };
    // 显示加载动画
    this.setState({
      loading: true,
    });
    // 请求数据
    this.userAdminService.paging({
      params: searchParams,
      success: (res) => {
        this.setState({
          data: res.data,
          loading: false
        })
      }
    })
  };

  // 组件装载生命周期
  componentDidMount() {
    // 初始化数据
    this.initData();
  }

  searchFormComponent() {
    // 获取表单属性组件-解构
    const {
      getFieldDecorator
    } = this.props.form;
    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
        <Col lg={8} md={12}>
          <Form.Item label={`手机号`}>
            {getFieldDecorator('mobile',{
              initialValue: null,
            })(
              <Input name="mobile" placeholder="输入手机号" />
            )}
          </Form.Item>
        </Col>
        <Col lg={8} md={12}>
          <Form.Item label={`用户id`}>
            {getFieldDecorator('userId',{
              initialValue: null,
            })(
              <Input name="userId" placeholder="输入用户id" />
            )}
          </Form.Item>
        </Col>
        <Col lg={8} md={12}>
          <Form.Item
            label="用户类型"
          >
            {getFieldDecorator('type',{
                valuePropName: 'checked',
                initialValue: null
              }
            )(
              <Select name="type" allowClear placeholder="选择用户类型">
                <Option key="1" value={2}>商家</Option>
                <Option key="2" value={1}>消费者</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>
    );
  };

  handleSearch(event) {
    // 阻止表单默认提交行为
    event.preventDefault();
    let formFieldsValue = this.props.form.getFieldsValue();
    let searchParams = {
      userId: formFieldsValue.userId ? formFieldsValue.userId : null,
      mobile: formFieldsValue.mobile ? formFieldsValue.mobile : null,
      type: formFieldsValue.type ? formFieldsValue.type : null,
    };
    // 显示加载动画
    this.setState({
      loading: true,
    });
    // 请求数据
    this.userAdminService.paging({
      params: searchParams,
      success: (res) => {
        this.setState({
          data: res.data,
          loading: false
        })
      }
    });
  };

  // 重置查询表单函数
  handleReset() {
    // 重置查询条件
    this.props.form.resetFields();
    // 重新搜索数据
    this.initData();
  };

  render() {
    return (
      <Card title="用户管理">
        <Form
          onSubmit={this.handleSearch.bind(this)}
        >
          {/* 搜索编辑内容区域 */}
          {this.searchFormComponent()}
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset.bind(this)}>
                重置
              </Button>
            </Col>
          </Row>
          <br />
          <Table
            columns={this.columns}
            rowKey="userId"
            dataSource={this.state.data}
            loading={this.state.loading}
          />
        </Form>
      </Card>
    );
  }
}

/**
 * 创建包装的类
 * @author BillowsTao
 */
UserPaging = Form.create({ name: 'user_manage' })(UserPaging);
