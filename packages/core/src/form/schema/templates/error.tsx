import React, {PropsWithChildren} from "react"
import {SchemaErrorItem} from "@jform/core";


export default (props: PropsWithChildren<SchemaErrorItem<any>>) => {
    const {text = [], id, className = "", style, errorClassName = ""} = props;
    if (text.length === 0) {
        return null;
    }
    let computedErrors = typeof text === "function" ? text(props) : text;
    return <div>
        <ul id={id} style={style} className={className}>
            {computedErrors
                .filter(elem => !!elem)
                .map((error, index) => {
                    return (
                        <li className={errorClassName} key={index}>
                            {error}
                        </li>
                    );
                })}
        </ul>
    </div>
}