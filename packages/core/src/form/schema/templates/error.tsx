import React, {PropsWithChildren} from "react"
import {FieldStaticInfoProps} from "./index";

export interface ErrorProps extends FieldStaticInfoProps<string[], ErrorProps> {
    errorClassName?: string
}

export default (props: PropsWithChildren<ErrorProps>) => {
    const {text = [], id, className = "", style, errorClassName = "",tag: Tag = "ul"} = props;
    if (text.length === 0) {
        return null;
    }
    let computedErrors = typeof text === "function" ? text(props) : text;
    return <div>
        {/*
        // @ts-ignore */}
        <Tag id={id} style={style} className={className}>
            {computedErrors
                .filter(elem => !!elem)
                .map((error, index) => {
                    return (
                        <li className={errorClassName} key={index}>
                            {error}
                        </li>
                    );
                })}
        </Tag>
    </div>
}