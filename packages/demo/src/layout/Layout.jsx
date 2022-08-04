import React from "react"
import {Layout} from "antd";
import "./Layout.css"
import Header from "./Header";
import Sider from "./menu/Sider";
import AppContent from "./Content"


const {Content} = Layout;

export default () => {

    return <Layout>
        <Header/>
        <Content style={{marginTop: 64}}>
            <Layout className="site-layout-background">
                <Sider/>
                <AppContent/>
            </Layout>
        </Content>
    </Layout>
}