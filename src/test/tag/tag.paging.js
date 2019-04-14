import React, {Component} from 'react';
import {Table, Divider, Tag, Avatar, Form, Row, Col, Input, Button, Icon, Select} from 'antd';
import {TagAdminService} from "../../service/tag/tag.admin.service";

export class TagPaging extends Component {
    tagAdminService = new TagAdminService();

    state = {
        data: [],
        pagination: {},
        loading: true,
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
        dataIndex: 'status',
        key: 'enable',
        render: (text, record) => {
            return (
                <a>删除</a>
            );
        }
    }];

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