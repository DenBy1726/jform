import React from "react"
import Layout from "./layout/Layout";
import {BrowserRouter as Router} from "react-router-dom";

export const App = (props) => {
    return <>
        <Router basename="/jform">
            <Layout/>
        </Router>
    </>
}