import React from "react"
import JForm from "@jform/core"
import {useStoreState} from "easy-peasy";

export const Form = (props) => {
    const defaults = useStoreState(state => state.theme.selectedDefaults);
    return <JForm  defaults={defaults} {...props}/>
}