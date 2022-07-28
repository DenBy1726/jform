import React, {useState} from "react";
import "./Menu.css"
import {Drawer, Menu} from "antd";
import {useStoreState} from "easy-peasy";
import {Theme} from "../../components/theme/Theme";

export default () => {
    const settings = useStoreState(state => state.menu.settings);
    const [visible, setVisible] = useState(false);

    const handleSettingSelect = ({key}) => {
        switch (key) {
            case "settings":
                setVisible(true);
                break;
        }
    }

    return <>
        <Drawer
            title="Настройка отображения"
            placement="right"
            onClose={() => setVisible(false)}
            visible={visible}
        >
            <Theme/>
        </Drawer>
        <Menu onClick={handleSettingSelect} selectable={false} className="settings-menu" theme="dark"
              mode="horizontal"
              items={settings}/>
    </>
}