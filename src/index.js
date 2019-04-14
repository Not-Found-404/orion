import React from 'react';
import ReactDOM from 'react-dom';
import { MainFrame } from "./test/main/main.frame";
import "antd/dist/antd.css";
import "./index.css";

class App extends React.Component {
  render() {
    return (
      <MainFrame />
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));