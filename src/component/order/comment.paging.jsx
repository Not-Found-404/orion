import React, {Component} from 'react';
import {Table, Form, Row, Col, Input, Button, Rate} from 'antd';
import {CommentAdminService} from "../../service/comment/comment.admin.service";

export class CommentPaging extends Component {

    commentAdminService = new CommentAdminService();

    componentDidMount() {
        this.setData();
    }

    state = {
        data: [],
        pagination: {},
        loading: true,
        orderIdParam: null
    };

    add0 = (m) => {
        return m < 10 ? '0' + m : m
    };

    formatTime = (unixTime) => {
        let time = new Date(unixTime);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d); //+ ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    };

    columns = [{
        title: '订单id',
        dataIndex: 'orderId',
        key: 'orderId',
    }, {
        title: '评分',
        dataIndex: 'rate',
        key: 'rate',
        render: rate => {
            return (<Rate disabled defaultValue={rate}/>)
        }
    }, {
        title: '评价内容',
        dataIndex: 'context',
        key: 'context',
    }, {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: createdAt => {
            return this.formatTime(createdAt);
        }
    }, {
        title: '店铺名',
        dataIndex: 'extra',
        key: 'shopName',
        render: extra => {
            return extra.shopName != null ? extra.shopName : "";
        }
    }, {
        title: '买家用户名',
        dataIndex: 'userName',
        key: 'userName'
    }, {
        title: '卖家手机号',
        dataIndex: 'extra',
        key: 'buyerPhone',
        render: extra => {
            if (extra.buyerPhone != null) {
                return extra.buyerPhone
            } else {
                return "";
            }
        }
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status => {
            if (status === 1) {
                return '显示'
            } else if (status === -2) {
                return '隐藏'
            }
        }
    }, {
        title: '操作',
        dataIndex: 'status',
        key: 'enable',
        render: (text, record) => {
            let enable = !(record.status === 1);
            let enableText = enable ? '显示' : '隐藏';
            return (
                <a onClick={() => this.enableStatus(record.commentId, enable)}>{enableText}</a>
            );
        }
    }];

    enableStatus = (commentId, enable) => {
        let status = enable ? 1 : -2;
        this.commentAdminService.enable({
            params: {
                commentId: commentId,
                status: status
            },
            success: (data) => {
                this.setData();
            }
        })
    };

    setData = () => {
        let searchParam = {
            orderId: this.state.orderIdParam
        };
        this.setState({
            loading: true
        });
        this.commentAdminService.paging({
            params: searchParam,
            success: (data) => {
                this.setState({
                    data: data.data,
                    loading: false
                })
            }
        });
    };

    inputChangeHandler = (e) => {
        let o = {};
        o[e.target.name] = e.target.value;
        this.setState(o);
    };

    getFields = () => {
        const searchParamsInput = [];
        searchParamsInput.push(
            <Col span={6} key={1}>
                <Form.Item label={`订单id`}>
                    <Input onChange={this.inputChangeHandler} name="orderIdParam" placeholder="输入订单编号"/>
                </Form.Item>
            </Col>
        );
        return searchParamsInput;
    };

    render() {
        return (
            <div>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" onClick={() => {
                                this.setData()
                            }}>搜索</Button>
                            <Button style={{marginLeft: 8}} onClick={this.setData}>
                                重置
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                    />
                </Form>
            </div>
        )
    }
}