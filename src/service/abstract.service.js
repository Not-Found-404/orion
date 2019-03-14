import {Icon, notification} from "antd";
import React from "react";
import {AbstractRequest} from "./abstract.request";
import axios from 'axios';

export class AbstractService {
    post(url, request: AbstractRequest) {
        axios({
            method: "POST",
            headers: {'Content-type': 'application/json'},
            url: url,
            data: request.params,
        }).then(res => {
            this.deal(res.data, request)
        }).catch(error => {
            this.notice(error.message);
        });
    }

    get(url, request: AbstractRequest) {
        axios({
            method: "get",
            url: url + this.json2param(request.params),
        }).then((res) => {
            this.deal(res.data, request)
        }).catch(error => {
            this.notice(error.message);
        });
    }

    put(url, request: AbstractRequest) {
        axios({
            method: "put",
            url: url,
            headers: {'Content-type': 'application/json'},
            data: request.params,
        }).then(res => {
            this.deal(res.data, request)
        }).catch(error => {
            this.deal(error.message);
        });
    }

    deal = (data, request: AbstractRequest) => {
        console.log(data);
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