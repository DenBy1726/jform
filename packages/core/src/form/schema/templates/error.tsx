import React, {PropsWithChildren} from "react"
import {FieldStaticInfoProps} from "./index";

export interface ErrorProps extends FieldStaticInfoProps<string[]> {
    errorClassName?: string
}

export default (props: PropsWithChildren<ErrorProps>) => {
    const {text = [], id, className = "", style, errorClassName = "",tag: Tag = "ul"} = props;
    if (text.length === 0) {
        return null;
    }
    return <div>
        {/*
        // @ts-ignore */}
        <Tag id={id} style={style} className={className}>
            {text
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