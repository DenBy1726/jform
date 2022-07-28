import React from "react"
import config from "./config"
import {useStoreActions, useStoreState} from "easy-peasy";
import {Form} from "components/common/Form";
import user from "store/defaults/user";

export const Theme = () => {
    const {defaultsKey, defaultTypes, stylesKey, stylesTypes} = useStoreState(state => state.theme);

    const changeDefaults = useStoreActions(state => state.theme.setDefaults);
    const changeStyles = useStoreActions(state => state.theme.setStyles);
    const data = {defaults: defaultsKey, styles: stylesKey};

    return <Form defaults={user} data={data} {...config(changeDefaults, defaultTypes, changeStyles, stylesTypes, data)}/>
}