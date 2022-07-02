import React, {PropsWithChildren} from "react"
import {FieldStaticInfoProps} from "./index";

export interface DescriptionProps extends FieldStaticInfoProps<string> {
}


export default (props: PropsWithChildren<DescriptionProps>) => {
    const {text, id, className = "", style, tag: Tag = "div"} = props;
    if (!text) {
        return null;
    }
    return (
        //@ts-ignore
        <Tag style={style} className={className} id={id}>
            {text}
        </Tag>
    );
}