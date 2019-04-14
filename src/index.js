import React from 'react';
import ReactDOM from 'react-dom';
import { LocaleProvider, DatePicker, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "antd/dist/antd.css";
import "./index.css";
import {MainFrame} from "./test/main/main.frame";

moment.locale('zh-cn');

class App extends React.Component {
  state = {
    date: null,
  };

  handleChange = (date) => {
    message.info(`您选择的日期是: ${date.format('YYYY-MM-DD')}`);
    this.setState({ date });
  }
  render() {
    const { date } = this.state;
    return (
      <MainFrame/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));