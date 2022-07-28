import React from "react";
import {Layout} from "antd";
import {useStoreState} from "easy-peasy";
import "../store/model/theme.css"
import {useRoutes} from "react-router-dom";
import routesConfig from "../routes"
const {Content} = Layout;

export default (props) => {
    const routes = useRoutes(routesConfig);
    const selectedStyles = useStoreState(state => state.theme.selectedStyles)
    return <>
        <Content style={{padding: '0 24px', minHeight: 280}}>
            {routes}

        </Content>
        <link rel="stylesheet" href={selectedStyles}/>
    </>
}