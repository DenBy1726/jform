import React from "react";

import {Layout} from "antd";
import Menu from "./menu/Menu";
import SettingsMenu from "./menu/SettingsMenu";
import {Link} from "react-router-dom";

const {Header} = Layout;

export default () => {
    return <Header className="header" style={{position: 'fixed', zIndex: 1, width: '100%'}}>
        <ul className="ant-menu-overflow ant-menu ant-menu-root ant-menu-horizontal ant-menu-dark menu" role="menu"
            tabIndex="0" data-menu-list="true">
            <li className="ant-menu-overflow-item ant-menu-item ant-menu-item-only-child menu-header-element">
                <Link to="/" >@Jform - API</Link>
            </li>
        </ul>
        <Menu/>
        <SettingsMenu/>
    </Header>
}