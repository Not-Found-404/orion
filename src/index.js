import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from "./view/home/home";
import "antd/dist/antd.css";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="layout-container">
        <Home />
      </div>
    );
  }
}

// 渲染函数
ReactDOM.render(<App />, document.getElementById('root'));