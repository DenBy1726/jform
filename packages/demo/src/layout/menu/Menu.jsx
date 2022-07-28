import "./Menu.css"
import {Menu} from "antd";
import React, {useEffect} from "react";
import {useStoreActions, useStoreState} from "easy-peasy";
import {useLocation, useNavigate} from "react-router";

export default () => {
    const header = useStoreState(state => state.menu.header);
    const selectMenu = useStoreActions(state => state.menu.selectMenu)
    let navigate = useNavigate();

    let {pathname} = useLocation();
    const key = "/" + pathname.split('/')[1];

    useEffect(() => {
        selectMenu(key)
    }, [key])

    return <Menu selectedKeys={[key]} onSelect={({key}) => {
        navigate(key);
    }} className="menu" theme="dark" mode="horizontal" items={header}/>
}