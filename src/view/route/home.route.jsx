import React from 'react';
import { Route } from "react-router-dom";
import { CommentPaging } from "../../component/order/comment.paging";
import { ShopPaging } from "../../component/shop/shop.paging";
import { TagPaging } from "../../component/shop/tag.paging";
import { ShopCreate } from "../../component/shop/shop.create";
import { UserPaging } from '../../component/user/user.paging';

export class HomeRoute extends React.Component {
  render() {
    return (
      // 路由组件在此声明
      <div className="routeLayout">
        <Route path="/userManage" component={UserPaging} />
        <Route path="/tagManage" component={TagPaging} />
        <Route path="/shopManage" component={ShopPaging} />
        <Route path="/commentManage" component={CommentPaging} />
        <Route path="/shopCreate" component={ShopCreate} />
      </div>
    )
  }
}
