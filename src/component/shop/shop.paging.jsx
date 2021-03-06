import React, {Component} from 'react';
import {Table, Form, Row, Col, Input, Button, Card, Switch, Menu} from 'antd';
import {ShopAdminService} from "../../service/shop/shop.admin.service";
import {ColorUtil} from "../../util/color.util";
import {Link} from "react-router-dom";

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
      loading: true,
      shopIdParam: null,
      shopNameParam: null,
      userIdParam: null,
      mobileParam: null,
      pageSize: 5,          // 初始化每页条数
    };

    // 绑定 `this`
    this.initDataForm = this.initDataForm.bind(this);
    this.resetSearchForm = this.resetSearchForm.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    // 初始化加载数据
    this.initDataForm();
  }

  columns = [
    {
      title: '店铺编码',
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
      title: '卖家编码',
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
      render: (text) => {
        if (text === 1) {
          return (
            <span style={{"color": ColorUtil.ACTIVE}}>营业中</span>
          )
        } else if (text === -1) {
          return (
            <span style={{"color": ColorUtil.INIT}}>歇业中</span>
          )
        } else if (text === -2) {
          return (
            <span style={{"color": ColorUtil.INIT}}>冻结中</span>
          )
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'status',
      key: 'freeze',
      render: (text, row) => {
        // 1-营业 -2-解冻
        let freeze = !(row.status === 1);
        return (
          <Switch onChange={this.toggleShopStatus.bind(this, row.shopId)} checkedChildren="冻结" unCheckedChildren="解冻"
                  checked={freeze}/>
        );
      }
    }, {
      title: '',
      key: 'detail',
      render: (text, row) => {
        return (
          <Link to={"/shopDetail/"+row.shopId}>店铺详情</Link>
        );
      }
    }
  ];

  toggleShopStatus(shopId, checked) {
    let status = checked ? -2 : 1;
    this.shopAdminService.shopUpdate({
      params: {
        shopId: shopId,
        status: status
      },
      success: () => {
        this.initDataForm();
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
      params: {
        pageNo: 1, // 初始化页数为1
        pageSize: this.state.pageSize, // 获取页数条目数
      },
      success: (response) => {
        this.setState({
          data: response.data,
          loading: false,
          totalSize: response.total, // 全部条目数
          currentPageNo: 1,
          searchParam: {} // 置搜索参数为空
        });
      }
    })
  }

  // 提交表单函数
  handleSearch = (event) => {
    // 阻止表单默认行为
    event.preventDefault();
    let formFieldsValue = this.props.form.getFieldsValue();
    // 处理请求参数
    let requestParam = {
      pageNo: 1, // 初始化页数为1
      pageSize: this.state.pageSize, // 获取页数条目数
    }
    let searchParam = {
      shopId: formFieldsValue.shopIdParam ? formFieldsValue.shopIdParam : null,
      name: formFieldsValue.shopNameParam ? formFieldsValue.shopNameParam : null,
      userId: formFieldsValue.userIdParam ? formFieldsValue.userIdParam : null,
      mobile: formFieldsValue.mobileParam ? formFieldsValue.mobileParam : null
    };
    // 加载动画展示
    this.setState({
      loading: true,
      searchParam: searchParam, // 置入搜索参数
    });
    this.shopAdminService.shopPaging({
      params: {...searchParam, ...requestParam},
      success: (response) => {
        this.setState({
          data: response.data,
          loading: false,
          totalSize: response.total, // 全部页数
          pageNo: 1
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

  /**
   * 页数变化回调函数
   * @author BillowsTao
   */
  onPageChange(page, pageSize) {
    this.setState({
      loading: true,
      currentPageNo: page,  // 设置当前页
    });
    // 处理请求参数
    let requestParam = {
      pageNo: page, // setState 方法会异步执行，获取的参数不正确
      pageSize: this.state.pageSize,
    }
    this.shopAdminService.shopPaging({
      params: {...this.state.searchParam, ...requestParam},
      success: (response) => {
        this.setState({
          data: response.data,
          loading: false,
          totalSize: response.total, // 全部页数
        })
      }
    })
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
          <Row gutter={{xs: 8, sm: 16, md: 24}}>
            <Col span={6}>
              <Form.Item label={`店铺编码`}>
                {getFieldDecorator('shopIdParam')(
                  <Input name="shopIdParam" placeholder="输入手机号"/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={`店铺名`}>
                {getFieldDecorator('shopNameParam')(
                  <Input name="shopNameParam" placeholder="输入店铺名"/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={`卖家编码`}>
                {getFieldDecorator('userIdParam')(
                  <Input name="userIdParam" placeholder="输入用户编码"/>
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label={`联系电话`}>
                {getFieldDecorator('mobileParam')(
                  <Input name="mobileParam" placeholder="输入联系电话"/>
                )}
              </Form.Item>
            </Col>

          </Row>
          <Row>
            <Col span={24} style={{textAlign: 'right'}}>
              <Button type="primary" htmlType="submit">搜索</Button>
              <Button style={{marginLeft: 8}} onClick={this.resetSearchForm}>
                重置
              </Button>
            </Col>
          </Row>
          <br/>
          <Table
            columns={this.columns}
            rowKey="shopId"
            dataSource={this.state.data}
            loading={this.state.loading}
            pagination={
              {
                defaultCurrent: 1,                  // 默认页数
                current: this.state.currentPageNo,  // 当前页数
                total: this.state.totalSize,        // 总页数
                pageSize: this.state.pageSize,      // 每页条数
                onChange: this.onPageChange         // 翻页回调函数
              }
            }
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
ShopPaging = Form.create({name: 'shop_manage'})(ShopPaging);
