import React, { Component } from 'react';
import { Table, Modal, Drawer, Row, Col, Button, Form, Input, Card } from 'antd';
import { TagAdminService } from "../../service/tag/tag.admin.service";

const confirm = Modal.confirm;

/**
 * Created by wildhunt_unique
 */
export class TagPaging extends Component {
  constructor(params){
    super(params);

    // 绑定`this`
    this.createTagForm = this.createTagForm.bind(this);
  }

  tagAdminService = new TagAdminService();

  state = {
    data: [],
    pagination: false,
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
    render: (text, row) => {
      return (
        <div>
          <a href="./#" onClick={(event) => this.showUpdateModal(row.tagId,row.name ,row.content, event)}>编辑</a>
        </div>
      );
    }
  }, {
    title: '',
    key: 'delete',
    width: 100,
    render: (text, record) => {
      return (
        <a href="./#" onClick={(event) => this.deleteTag(record.tagId, event)}>删除</a>
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

  deleteTag(tagId, event){
    event.preventDefault();
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

  /**
   * 修改标签函数
   * @author BillowsTao
   */
  showUpdateModal(tagId, name, content, event){
    // 阻止默认事件传播
    event.preventDefault();
    this.setState({
      updateModalVisible: true, // 显示修改 Modal
      updateTagId: tagId, // 传递修改项的 ID
      tagUpdateContentParam: content, // 显示当前的数据
      tagUpdateNameParam: name,
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
    return (
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
              <Input
                onChange={this.inputChangeHandler} name="tagUpdateNameParam"
                placeholder="输入标签名" value={this.state.tagUpdateNameParam}
              />
            </Form.Item>
            <Form.Item label={`标签内容`}>
              <Input
                onChange={this.inputChangeHandler} name="tagUpdateContentParam"
                placeholder="输入标签内容" value={this.state.tagUpdateContentParam}
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    );
  };

  getDrawer = () => {
    return (
      <Drawer
        title="创建新标签"
        width={360}
        onClose={this.createDrawerOnClose}
        visible={this.state.createDrawerVisible}
        placement={"right"}
      >
        <Form onSubmit={this.createTagForm}>
          <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
            <Col span={24}>
              <Form.Item label={`标签名`}>
                <Input // 通过 React 接管的可控组件
                  onChange={this.inputChangeHandler} name="tagCreateNameParam"
                  placeholder="输入标签名" value={this.state.tagCreateNameParam}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item label={`标签内容`}>
                <Input // 通过 React 接管的可控组件
                  onChange={this.inputChangeHandler} name="tagCreateContentParam"
                  placeholder="输入标签内容" value={this.state.tagCreateContentParam}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button loading={this.state.createTagLoading} onClick={() => this.createTag()}
                type="primary">创建标签</Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );

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
                createDrawerVisible: true,
                tagCreateNameParam: null, // 置添加标签模态框-标签名为空
                tagCreateContentParam: null // 置添加标签模态框-标签值为空
              })
            }}>创建新标签</Button>
          </Col>
        </Row>
        <br />
        <Table
          columns={this.columns}
          dataSource={this.state.data}
          loading={this.state.loading}
          pagination={false}
        />
      </Card>
    )
  }

  // 受控组件属性绑定
  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value === "" ? null : event.target.value,
    });
  };

  /**
   * 创建店铺标记表单提交函数
   * @author BillowsTao
   */
  createTagForm(){

  }

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
