import React, {Component} from 'react';
import {Table, Avatar, Form, Row, Col, Input, Button, Select} from 'antd';
import {UserAdminService} from "../../service/user/user.admin.service";

const {Option} = Select;

export class UserPaging extends Component {

    userAdminService = new UserAdminService();

    columns = [{
        title: '',
        dataIndex: 'avatar',
        key: 'avatar',
        render: avatar => {
            avatar = 'http://' + avatar;
            return <Avatar src={avatar}/>
        }
    }, {
        title: '用户id',
        dataIndex: 'userId',
        key: 'userId',
    }, {
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
    }, {
        title: '电话',
        dataIndex: 'mobile',
        key: 'mobile',
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: type => {
            if (type === 2) {
                return '商家'
            } else {
                return '消费者'
            }
        }
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: status => {
            if (status === 1) {
                return '启用中'
            } else {
                return '禁用中'
            }
        }
    }, {
        title: '操作',
        dataIndex: 'status',
        key: 'enable',
        render: (text, record) => {
            let enbale = !(record.status === 1);
            let enbaleText = enbale ? '启用' : '禁用';
            return (
                <a onClick={() => this.enableStatus(record.userId, enbale)}>{enbaleText}</a>
            );
        }
    }];

    state = {
        data: [],
        pagination: {},
        loading: true,
    };

    enableStatus = (userId, isEnable) => {
        let status = isEnable ? 1 : -2;
        this.userAdminService.updateStatus({
            params: {
                userId: userId,
                status: status
            },
            success: data => {
                this.setData(null);
            }
        })
    };

    setData = () => {
        let searchParams = {
            userId: this.state.userIdParam,
            mobile: this.state.mobileParam,
            type: this.state.typeParam
        };

        this.setState({
            loading: true,
        });
        this.userAdminService.paging({
            params: searchParams,
            success: (data) => {
                this.setState({
                    data: data.data,
                    loading: false
                })
            }
        })

    };


    componentDidMount() {
        this.setData();
    }

    changeHandler = (e) => {
        let value = null;
        let element = e.currentTarget;
        console.log(e);
        let name = element.getAttribute("name");
        switch (name) {
            case "userId":
                value = e.target.value === "" ? null : e.target.value;
                this.setState({
                    userIdParam: value
                });
                break;
            case "mobile":
                value = e.target.value === "" ? null : e.target.value;
                this.setState({
                    mobileParam: value
                });
                break;
            default:
              break;
        }
    };

    selectChangeHandler = (value) => {
        this.setState({
            typeParam: value
        });
    };

    getFields = () => {
        const searchParamsInput = [];
        searchParamsInput.push(
            <Col span={6} key={1}>
                <Form.Item label={`手机号`}>
                    <Input onChange={this.changeHandler} name="mobile" placeholder="输入手机号"/>
                </Form.Item>
            </Col>
        );
        searchParamsInput.push(
            <Col span={6} key={2}>
                <Form.Item label={`用户id`}>
                    <Input onChange={this.changeHandler} name="userId" placeholder="输入用户id"/>
                </Form.Item>
            </Col>
        );
        searchParamsInput.push(
            <Col span={6} key={3}>
                <Form.Item
                    label="用户类型"
                >
                    <Select onChange={this.selectChangeHandler} name="type" defaultValue={null}>
                        <Option value={null}>请选择</Option>
                        <Option value={2}>商家</Option>
                        <Option value={1}>消费者</Option>
                    </Select>
                </Form.Item>
            </Col>
        );
        return searchParamsInput;
    };

    handleSearch = (e) => {
        this.setData();
    };

    handleReset = (e) => {

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
                                this.handleSearch()
                            }}>搜索</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                                重置
                            </Button>
                        </Col>
                    </Row>
                    <Table
                        columns={this.columns}
                        dataSource={this.state.data}
                        loading={this.state.loading}
                    />
                </Form>
            </div>
        );
    }


}
