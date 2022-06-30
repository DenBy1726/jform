import React, {PropsWithChildren} from "react"
import {FieldStaticInfoProps} from "./index";

export interface TitleProps extends FieldStaticInfoProps<string, TitleProps> {
    required?: RequiredProps,
    name?: string,
    useName?: boolean
}

export interface RequiredProps extends FieldStaticInfoProps<string, RequiredProps> {
    display?: boolean
}

export default (props: PropsWithChildren<TitleProps>) => {
    const {text, required = {}, id, className = "", style, tag: Tag = "label", useName, name} = props;
    let computedText;
    if (!text) {
        if (useName === true) {
            computedText = name;
        } else {
            return null;
        }
    } else {
        computedText = typeof text === "function" ? text(props) : text;
    }
    let computedRequired = typeof required.text === "function" ? required.text(required) : required.text;
    return (
        //@ts-ignore
        <Tag style={style} className={className} id={id}>
            {computedText}
            {required.display !== false && computedRequired &&
                <span className={required.className} style={required.style} id={required.id}>{computedRequired}</span>}
        </Tag>
    );
}

