import React from "react";
import {Layout} from "antd";
import "../store/model/theme.css"
import {useRoutes} from "react-router-dom";
import routesConfig from "../routes"

const {Content} = Layout;

export default (props) => {
    const routes = useRoutes(routesConfig);
    return <>
        <Content style={{padding: '0 24px', minHeight: 280}}>
            {routes}
        </Content>
    </>
}