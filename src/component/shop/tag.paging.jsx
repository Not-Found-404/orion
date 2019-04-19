import React, { Component } from 'react';
import { Table, Modal, Drawer, Row, Col, Button, Form, Input, Card } from 'antd';
import { TagAdminService } from "../../service/tag/tag.admin.service";

const confirm = Modal.confirm;

export class TagPaging extends Component {
  tagAdminService = new TagAdminService();

  state = {
    data: [],
    pagination: {},
    loading: true,
    createDrawerVisible: false,
    createTagLoading: false,
    updateModalVisible: false,
    updateLoading: false
  };

  componentDidMount() {
    this.setData();
  }

  columns = [{
    title: '标签id',
    dataIndex: 'tagId',
    key: 'tagId',
  }, {
    title: '标签名',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '标签内容',
    dataIndex: 'content',
    key: 'content',
  }, {
    title: '操作',
    key: 'enable',
    width: 100,
    render: (text, record) => {
      return (
        <div>
          <a onClick={() => this.showUpdateModal(record.tagId)}>编辑</a>
        </div>
      );
    }
  }, {
    title: '',
    key: 'delete',
    width: 100,
    render: (text, record) => {
      return (
        <a onClick={() => this.deleteTag(record.tagId)}>删除</a>
      );
    }
  }];

  updateTag = () => {
    this.setState({
      updateLoading: true
    });
    let updateParams = {
      tagId: this.state.updateTagId,
      name: this.state.tagUpdateNameParam,
      content: this.state.tagUpdateContentParam
    };
    this.tagAdminService.update({
      params: updateParams,
      success: (data) => {
        this.closeUpdateModal();
        this.setData();
      },
      final: () => {
        this.setState({
          updateLoading: false
        });
      }
    })
  };

  deleteTag = (tagId) => {
    confirm({
      title: '确认删除?',
      content: '标签以及标签与店铺的关联都将被删除',
      onOk: () => {
        this.tagAdminService.delete({
          params: {
            tagId: tagId
          },
          success: (data) => {
            this.setData();
          }
        })
      },
      onCancel() {
        // do nothing
      },
    });
  };

  showUpdateModal = (tagId) => {
    this.setState({
      updateModalVisible: true,
      updateTagId: tagId
    });
  };


  closeUpdateModal = () => {
    this.setState({
      updateModalVisible: false,
      updateLoading: false
    });
  };


  setData = () => {
    this.setState({
      loading: true,
    });
    this.tagAdminService.list({
      params: null,
      success: (data) => {
        this.setState({
          data: data.tagThinResponse,
          loading: false
        })
      }
    })
  };

  createDrawerOnClose = () => {
    this.setState({
      createDrawerVisible: false
    })
  };

  getModal = () => {
    const modal = [];
    modal.push(
      <Modal
        visible={this.state.updateModalVisible}
        title="更新标签"
        onCancel={this.closeUpdateModal}
        footer={[
          <Button key="back" onClick={this.closeUpdateModal}>取消</Button>,
          <Button key="submit" type="primary" loading={this.state.updateLoadingoa} onClick={() => {
            this.updateTag()
          }}>
            确认
                    </Button>,
        ]}
      >
        <Row>
          <Col span={24} key={1}>
            <Form.Item label={`标签名`}>
              <Input onChange={this.inputChangeHandler} name="tagUpdateNameParam" placeholder="输入标签名" />
            </Form.Item>
            <Form.Item label={`标签内容`}>
              <Input onChange={this.inputChangeHandler} name="tagUpdateContentParam"
                placeholder="输入标签内容" />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    );
    return modal;
  };

  getDrawer = () => {
    const createDrawer = [];
    createDrawer.push(<Drawer
      title="创建新标签"
      width={360}
      onClose={this.createDrawerOnClose}
      visible={this.state.createDrawerVisible}
      placement={"right"}
    >
      <Row>
        <Col span={24} key={1}>
          <Form.Item label={`标签名`}>
            <Input onChange={this.inputChangeHandler} name="tagCreateNameParam" placeholder="输入标签名" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} key={1}>
          <Form.Item label={`标签内容`}>
            <Input onChange={this.inputChangeHandler} name="tagCreateContentParam" placeholder="输入标签内容" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24} key={1} style={{ textAlign: 'right' }}>
          <Button loading={this.state.createTagLoading} onClick={() => this.createTag()}
            type="primary">创建标签</Button>
        </Col>
      </Row>
    </Drawer>);
    return createDrawer;
  };

  render() {
    return (
      <Card title="店铺标签管理">
        {this.getModal()}
        {this.getDrawer()}
        <Row>
          <Col span={24} style={{ textAlign: 'left' }}>
            <Button type="primary" onClick={() => {
              this.setState({
                createDrawerVisible: true
              })
            }}>创建新标签</Button>
          </Col>
        </Row>
        <br />
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          loading={this.state.loading}
        />
      </Card>
    )
  }

  inputChangeHandler = (e) => {
    let o = {};
    o[e.target.name] = e.target.value === "" ? null : e.target.value;
    this.setState(o);
  };

  createTag = () => {
    this.setState({
      createTagLoading: true
    });
    let createParam = {
      name: this.state.tagCreateNameParam,
      content: this.state.tagCreateContentParam
    };
    this.tagAdminService.create({
      params: createParam,
      success: (data) => {
        this.createDrawerOnClose();
        this.setData();
      },
      final: () => {
        this.setState({
          createTagLoading: false
        });
      }
    });
  }
}
