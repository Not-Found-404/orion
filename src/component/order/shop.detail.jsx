import React, {Component} from 'react';
import {Form, Row, Col, Button, Card, Tabs, Avatar, List,Skeleton} from 'antd';
import {Link} from "react-router-dom";
import {ShopAdminService} from "../../service/shop/shop.admin.service";
import {CommentAdminService} from "../../service/comment/comment.admin.service";
import {TimeUtil} from "../../util/time.util";

const TabPane = Tabs.TabPane;
const {Meta} = Card;

/**
 * Created by wildhunt_unique
 */
export class ShopDetail extends Component {

  shopAdminService = new ShopAdminService();

  commentAdminService = new CommentAdminService();

  componentDidMount() {
    this.setData();
  }

  state = {
    shopId: null,
    shopData: null,
    categoryList: null,
    commentList: null,
    commentLoading: true
  };

  setData = () => {
    let shopId = this.props.match.params.shopId;
    this.shopAdminService.commonShopGet({
      params: {
        shopId: shopId
      },
      success: (data) => {
        this.setState({
          shopData: data,
          shopId: shopId
        })
      }
    });
    this.shopAdminService.shopCategoryLis({
      params: {
        shopId: shopId,
        withItemInfo: true
      },
      success: (data) => {
        this.setState({
          categoryList: data.categoryList
        })
      }
    });
    this.commentAdminService.paging({
      params: {
        shopId: shopId,
        pageSize: 5,
        pageNo: 1
      },
      success: (data) => {
        this.setState({
          commentList: data.data
        })
      }
    });
  };

  getShopTitle = () => {
    let shopData = this.state.shopData;
    if (shopData != null) {
      return (
        <Row>
          <Col span={6}>
            <img width={"100%"} src={shopData.imageUrl} alt=""/>
          </Col>
          <Col span={1}>
          </Col>
          <Col span={17} style={{textAlign: 'right'}}>
            {this.getShopInfo()}
          </Col>
        </Row>
      );
    }
  };

  getCategoryList = () => {
    const view = [];
    let categoryList = this.state.categoryList;
    for (let index in categoryList) {
      let category = categoryList[index];
      view.push(
        <Card title={category.name}>
          {this.getAllItem(category.itemThinResponseList)}
        </Card>
      );
      view.push(<br/>);
    }
    return view;
  };

  getShopInfo = () => {
    let shopData = this.state.shopData;
    if (shopData != null) {
      const view = [];
      view.push(
        <Row style={{textAlign: 'left'}}>
          <Col span={6}>
            <Form.Item label={`店铺名`}>
              {shopData.name}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={`联系方式`}>
              {shopData.mobile}
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label={`店铺编码`}>
              {shopData.shopId}
            </Form.Item>
          </Col>
        </Row>
      );
      view.push(
        <Row style={{textAlign: 'left'}}>
          <Col span={18}>
            <Form.Item label={`店铺地址`}>
              {shopData.address}
            </Form.Item>
          </Col>
        </Row>
      );
      return view;
    }
  };

  getCommentList = () => {
    const commentList = [];
    let commentListTemp = this.state.commentList;
    for (let index in commentListTemp) {
      commentList.push(commentListTemp[index]);
    }
    return (
      <List
        className="comment-list"
        itemLayout="horizontal"
        dataSource={commentList}
        renderItem={item => (
          <List.Item >
            <Skeleton avatar title={false} loading={false} active>
              <List.Item.Meta
                avatar={<Avatar src={item.userAvatar} />}
                title={<a href="https://ant.design">{item.userName}</a>}
                description={item.context}
              />
              <div>{TimeUtil.formatTime(item.createdAt,true)}</div>
            </Skeleton>
          </List.Item>
        )}
      />
    )
  };

  getAllItem = (itemList) => {
    const view = [];
    for (let i = 0; i < itemList.length; i++) {
      let item = itemList[i];
      view.push(
        <Col span={12}>
          <Card style={{width: "98%", margin: "2%", backgroundColor: "#f2f5f7"}}>
            <Meta
              avatar={<Avatar style={{width: "100px", height: "100px"}} shape="square" src={item.mainImage}/>}
              title={item.name}
              description={"￥" + item.price}
            />
          </Card>

        </Col>
      )
    }
    return (
      <Row>
        {view}
      </Row>
    );
  };

  render() {
    return (
      <Card title="店铺详情">
        <Row>
          <Col span={24} style={{textAlign: 'right'}}>
            <Button type="primary" style={{marginLeft: 8}}>
              <Link to="/shopManage/">返回</Link>
            </Button>
          </Col>
        </Row>
        {this.getShopTitle()}
        <br/>
        <Tabs defaultActiveKey="1">
          <TabPane tab="所有商品" key="1">{this.getCategoryList()}</TabPane>
          <TabPane tab="评价" key="2">
            <Row>
              <Col span={2}/>
              <Col  span={20}>
                {this.getCommentList()}
              </Col>
              <Col span={2}/>
            </Row>
          </TabPane>
          {/*<TabPane tab="订单记录" key="3">评价</TabPane>*/}
        </Tabs>
      </Card>
    )
  }
}
