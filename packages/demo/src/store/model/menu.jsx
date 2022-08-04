import React from "react"
import {SettingOutlined} from "@ant-design/icons";
import {action, computed} from "easy-peasy";
import documentation from "./sider/documentation"
import examples from "./sider/examples"
import solutions from "./sider/solutions"
import components from "./sider/components"
import {COMPONENTS_PATH, DOCUMENTATION_PATH, EXAMPLES_PATH, SOLUTIONS_PATH} from "routes/constants";

export default {
    header: [
        {
            label: "Документация",
            sider: documentation,
            key: DOCUMENTATION_PATH
        },
        {
            label: "Виджеты",
            sider: components,
            key: COMPONENTS_PATH
        },
        {
            label: "Примеры",
            sider: examples,
            key: EXAMPLES_PATH
        },
        {
            label: "Решения",
            sider: solutions,
            key: SOLUTIONS_PATH
        }
    ],
    settings: [
        {
            key: "settings",
            icon: <SettingOutlined className="menu-header-element"/>
        }
    ],

    menuKey: "/",

    sider: computed(state => {
        const header = state.header.find(x => x.key === state.menuKey);
        if (header) {
            return header.sider;
        } else {
            return null;
        }
    }),

    selectMenu: action((state, payload) => {
        state.menuKey = payload;
    })

};