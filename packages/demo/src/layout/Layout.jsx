import React from "react"
import {Layout} from "antd";
import "./Layout.css"
import Header from "./Header";
import Sider from "./menu/Sider";
import AppContent from "./Content"
import {IFrame} from "../components/common/iframe/IFrame";


const {Content} = Layout;

export default () => {

    return <Layout>
        <Header/>
        <Content style={{marginTop: 64}}>
            <Layout className="site-layout-background">
                <Sider/>
                <IFrame>
                    <AppContent/>
                </IFrame>
            </Layout>
        </Content>
    </Layout>
}