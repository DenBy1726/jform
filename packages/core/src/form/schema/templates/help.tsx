import React, {PropsWithChildren} from "react"
import {FieldStaticInfoProps} from "./index";

export interface HelpProps extends FieldStaticInfoProps<string, HelpProps> {
}

export default (props: PropsWithChildren<HelpProps>) => {
    const {text, id, className = "", style} = props;
    if (!text) {
        return null;
    }
    let computedText = typeof text === "function" ? text(props) : text;
    return (
        <div style={style} className={className} id={id}>
            {computedText}
        </div>
    );
}
