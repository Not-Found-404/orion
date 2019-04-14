import {Icon, notification} from "antd";
import React from "react";
import {AbstractRequest} from "./abstract.request";
import axios from 'axios';
import {AbstractParam} from "./abstract.param";

export class AbstractService {
    post(param: AbstractParam) {
        console.log('post.url:%s\nparams:%o', param.url, param.request.params);
        axios({
            method: "POST",
            headers: {'Content-type': 'application/json'},
            url: param.url,
            data: param.request.params,
        }).then(res => {
            this.deal(res.data, param.request)
        }).catch(error => {
            this.notice(error.message);
        });
    }

    get(param: AbstractParam) {
        console.log('post.url:%s\nparams:%o', param.url, param.request.params);
        axios({
            method: "get",
            url: param.url + this.json2param(param.request.params),
        }).then((res) => {
            this.deal(res.data, param.request)
        }).catch(error => {
            this.notice(error.message);
        });
    }

    put(param: AbstractParam) {
        console.log('put.url:%s\nparams:%o', param.url, param.request.params);
        axios({
            method: "put",
            url: param.url,
            headers: {'Content-type': 'application/json'},
            data: param.request.params,
        }).then(res => {
            this.deal(res.data, param.request)
        }).catch(error => {
            this.deal(error.message);
        });
    }

    deal = (data, request: AbstractRequest) => {
        console.log('request.end.data:%o', data);
        let response = data;
        if (response.success) {
            request.success(response.result);
        } else {
            this.notice(response.error);
        }
    };

    notice = (error) => {
        notification.open({
            message: '错误',
            description: error,
            icon: <Icon type="exclamation-circle" style={{color: '#e9262d'}}/>,
        });
    };

    cleanArray = (actual) => {
        const newArray = [];
        for (let i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    };

    json2param = (json) => {
        if (!json) return '';
        let params = this.cleanArray(Object.keys(json).map(key => {
            if (json[key] === undefined || json[key] == null) return '';
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        })).join('&');
        return params === '' ? '' : '?' + params;
    }
}