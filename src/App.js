import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {ShopAdminService} from "./service/shop/shop.admin.service";
import {ShopWebService} from "./service/shop/shop.web.service";

class App extends Component {
    shopAdminService = new ShopAdminService();

    click = () => {
        this.shopAdminService.shopPaging({
                params: {},
                success: (data) => {
                }
            }
        );
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>

                    <button onClick={() => this.click()}>按钮</button>
                </header>
            </div>
        );
    }
}

export default App;
