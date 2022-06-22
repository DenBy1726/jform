import React, {PropsWithChildren} from "react"
import {SchemaItem} from "@jform/core";


export default (props: PropsWithChildren<SchemaItem<string, any>>) => {
    const {text, id, className = "", style} = props;
    if (!text) {
        return null;
    }
    let computedText = typeof text === "function" ? text(props) : text;
    return (
        <div style={style} className={`jform-description ${className}`} id={id}>
            {computedText}
        </div>
    );
}