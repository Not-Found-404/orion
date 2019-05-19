import React, {Component} from 'react';
import {Modal, Upload, Row, Col, Button, Form, Input, Icon, Card, Select, message} from 'antd';
import {BannerAdminService} from "../../service/banner/banner.admin.service";
import {StringUtil} from "../../util/string.util";

const {Option} = Select;

export class BannerCreate extends Component {
  bannerAdminService = new BannerAdminService();

  componentDidMount() {

  }

  state = {
    imageUrlParam: null,
    nameParam: null,
    contentParam: null,
    typeParam: 1,
    // 上传
    previewVisible: false,
    previewImage: '',
    imageUrl: null,
    fileList: [],
  };

  render() {
    return (
      <Card title={"创建广告图"}>

        <Row>
          <Col span={24}>
            <Form.Item label="广告图">
              {this.getImageUpload()}
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={6} key={1}>
            <Form.Item label="名称">
              <Input onChange={this.inputChangeHandler} value={this.state.nameParam} name={"nameParam"}
                     placeholder="输入名称"/>
            </Form.Item>
          </Col>
          <Col span={6} key={2}>
            <Form.Item label="类型">
              <Select name="type" style={{width: "100%"}} value={this.state.typeParam} allowClear placeholder="选择商品类目"
                      onChange={this.typeChangeHandler}>
                <Option key={1} value={1}>跳转至店铺</Option>
                <Option key={2} value={2}>跳转至商品</Option>
                <Option key={3} value={3}>跳转至链接</Option>
                <Option key={0} value={0}>-无跳转-</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12} key={3}>
            {this.getContentInput()}
          </Col>
        </Row>
        <Row style={{textAlign: 'center'}}>
          <Button style={{width: "150px"}} type="primary" onClick={() => {
            this.submitCreateBanner()
          }}>创建广告图</Button>
        </Row>
      </Card>
    );
  }

  // 受控组件属性绑定
  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value === "" ? null : event.target.value,
    });
  };

  typeChangeHandler = (e) => {
    this.setState({
      typeParam: e
    });
  };

  handleCancel = () => this.setState({
    previewVisible: false
  });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  getImageUpload = () => {
    const {previewVisible, previewImage, fileList} = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus"/>
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/api/common/upload/image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{width: '100%'}} src={previewImage}/>
        </Modal>
      </div>
    );
  };

  handleChange = (info) => {
    let imageUrl = null;
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log("file:%o , fileList:%o", info.file, info.fileList);
    }
    if (status === 'done') {
      imageUrl = info.file.response.result;
    } else if (status === 'error') {
      imageUrl = null;
    }
    this.setState({
      fileList: info.fileList,
      imageUrl: imageUrl
    });
  };

  getContentInput = () => {
    let type = this.state.typeParam;
    switch (type) {
      case 0:
        return;
      case 1:
        return (
          <Form.Item label="店铺编号">
            <Input onChange={this.inputChangeHandler} value={this.state.contentParam} name={"contentParam"}
                   placeholder="请输入店铺编号"/>
          </Form.Item>
        );
      case 2:
        return (
          <Form.Item label="商品编号">
            <Input onChange={this.inputChangeHandler} value={this.state.contentParam} name={"contentParam"}
                   placeholder="请输入商品编号"/>
          </Form.Item>
        );
      case 3:
        return (
          <Form.Item label="网址链接">
            <Input onChange={this.inputChangeHandler} value={this.state.contentParam} name={"contentParam"}
                   placeholder="请输入网址链接"/>
          </Form.Item>
        );
      default:
        return;
    }
  };

  submitCreateBanner = () => {
    let createParam = {
      imageUrl: StringUtil.notEmpty(this.state.imageUrl) ? this.state.imageUrl : null,
      name: StringUtil.notEmpty(this.state.nameParam) ? this.state.nameParam : null,
      content: StringUtil.notEmpty(this.state.contentParam) ? this.state.contentParam : null,
      type: this.state.typeParam,
    };
    console.log(createParam);
    this.bannerAdminService.create({
      params: createParam,
      success: (data) => {
        message.success("创建成功");
        this.props.history.push('/bannerManage');
      }
    });
  }
}
