import React, {PropsWithChildren} from "react"
import {FieldLabelProps} from "@jform/core";
import {REQUIRED_FIELD_SYMBOL} from "./constant";


export default (props: PropsWithChildren<FieldLabelProps<any>>) => {
    const {text, required, id, className, style} = props;
    if (!text) {
        return null;
    }
    let computedText = typeof text === "function" ? text(props) : text;
    return (
        <label style={style} className={`jform-label ${className}`} id={id}>
            {computedText}
            {required && <span className="jform-label-required">{REQUIRED_FIELD_SYMBOL}</span>}
        </label>
    );
}

