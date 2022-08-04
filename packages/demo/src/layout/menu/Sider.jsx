import React from "react";
import "./Menu.css"
import {Menu, Layout} from "antd";
import {useStoreState} from "easy-peasy";
import {useNavigate, useLocation} from "react-router-dom";

const {Sider} = Layout;

export default () => {
    const sider = useStoreState(state => state.menu.sider);

    let navigate = useNavigate();
    let {pathname} = useLocation();

    return (sider ? <Sider collapsible className="site-layout-background" width={200}>
        <Menu
            mode="inline"
            style={{height: '100%'}}
            items={sider}
            onSelect={({key}) => {
                navigate(key);
            }}
            selectedKeys={[pathname]}
        />
    </Sider> : null)
}