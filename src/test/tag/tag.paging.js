import React, {Component} from 'react';
import {Table, Modal} from 'antd';
import {TagAdminService} from "../../service/tag/tag.admin.service";

const confirm = Modal.confirm;

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
        key: 'enable',
        width: 100,
        render: (text, record) => {
            return (
                <div>
                    <a>编辑</a>
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

    deleteTag = (tagId) => {
        confirm({
            title: '确认删除?',
            content: '标签以及标签与店铺的关联都将被删除',
            onOk() {
                // this.tagAdminService.delete({
                //     params: {
                //         tagId: tagId
                //     },
                //     success: (data) => {
                //         this.setDate();
                //     }
                // })
            },
            onCancel() {
                // do nothing
            },
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