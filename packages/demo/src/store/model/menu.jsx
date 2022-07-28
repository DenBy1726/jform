import React from "react"
import {SettingOutlined} from "@ant-design/icons";
import {action, computed} from "easy-peasy";
import documentation from "./sider/documentation"
import examples from "./sider/examples"
import solutions from "./sider/solutions"
import components from "./sider/components"

export default {
    header: [
        {
            label: "Документация",
            sider: documentation,
            key: "/documentation",
        },
        {
            label: "Виджеты",
            sider: components,
            key: "/components"
        },
        {
            label: "Примеры",
            sider: examples,
            key: "/examples"
        },
        {
            label: "Решения",
            sider: solutions,
            key: "/solutions"
        }
    ],
    settings: [
        {
            key: "settings",
            icon: <SettingOutlined className="menu-header-element"/>
        }
    ],

    menuKey: "/documentation",

    sider: computed(state => {
        return state.header.find(x => x.key === state.menuKey).sider;
    }),

    selectMenu: action((state, payload) => {
        state.menuKey = payload;
    })

};