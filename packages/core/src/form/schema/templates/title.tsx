import React, {PropsWithChildren} from "react"
import {FieldLabelProps} from "@jform/core";


export default (props: PropsWithChildren<FieldLabelProps>) => {
    const {text, required = {}, id, className = "", style} = props;
    if (!text) {
        return null;
    }
    let computedText = typeof text === "function" ? text(props) : text;
    let computedRequired = typeof required.text === "function" ? required.text(props) : required.text;
    return (
        <label style={style} className={className} id={id}>
            {computedText}
            {required.display !== false && computedRequired &&
                <span className={required.className} style={required.style} id={required.id}>{computedRequired}</span>}
        </label>
    );
}

