import React, {PropsWithChildren} from "react"
import {FieldStaticInfoProps} from "./index";

export interface TitleProps extends FieldStaticInfoProps<string> {
    required?: RequiredProps,
    name?: string,
    useName?: boolean
}

export interface RequiredProps extends FieldStaticInfoProps<string> {
    display?: boolean
}

export default (props: PropsWithChildren<TitleProps>) => {
    const {text, required = {}, id, className = "", style, tag: Tag = "label"} = props;

    if (text == null) {
       return null;
    }
    const RequiredTag = required?.tag || "span";
    return (
        //@ts-ignore
        <Tag style={style} className={className} id={id}>
            {text}
            {required.display === true && required.text &&
                //@ts-ignore
                <RequiredTag className={required.className} style={required.style}
                             id={required.id}>{required.text}</RequiredTag>}
        </Tag>
    );
}

