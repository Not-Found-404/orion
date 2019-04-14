import React, {Component} from 'react';
import {Table, Divider, Tag, Avatar, Form, Row, Col, Input, Button, Icon, Select} from 'antd';
import {ShopAdminService} from "../../service/shop/shop.admin.service";

export class ShopPaging extends Component {

    shopAdminService = new ShopAdminService();

    componentDidMount() {
        this.setData();
    }

    state = {
        data: [],
        pagination: {},
        loading: true,
    };

    columns = [{
        title: '店铺Id',
        dataIndex: 'shopId',
        key: 'shopId',
    }, {
        title: '店铺名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '卖家id',
        dataIndex: 'userId',
        key: 'userId',
    }, {
        title: '卖家姓名',
        dataIndex: 'userName',
        key: 'userName'
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status => {
            if (status === 1) {
                return '营业中'
            } else if (status === -1) {
                return '歇业中'
            } else if (status === -2) {
                return '冻结中'
            }
        }
    }, {
        title: '操作',
        dataIndex: 'status',
        key: 'enable',
        render: (text, record) => {
            let enbale = !(record.status === 1);
            let enbaleText = enbale ? '解冻' : '冻结';
            return (
                <a onClick={() => this.enableStatus(record.userId, enbale)}>{enbaleText}</a>
            );
        }
    }];

    setData = () => {
        this.setState({
            loading: true,
        });
        this.shopAdminService.shopPaging({
            params: null,
            success: (data) => {
                this.setState({
                    data: data.data,
                    loading: false
                })
            }
        })
    };

    render() {
        return (
            <Table
                columns={this.columns}
                dataSource={this.state.data}
                loading={this.state.loading}
            />
        )
    }
}