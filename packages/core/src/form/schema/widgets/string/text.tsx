import React from "react";
import {StringWidgetProps} from "./index";

function TextWidget(props: StringWidgetProps) {
    const {
        autofocus,
        disabled,
        onChange,
        onFocus,
        onBlur,
        value,
        id,
        style,
        className,
        placeholder,
        examples,
        schema
    } = props;


    return <>
        <input
            className={className}
            id={id}
            style={style}
            disabled={disabled}
            autoFocus={autofocus}
            value={value}
            placeholder={placeholder}
            onChange={e => onChange(e.target.value)}
            onBlur={() => onBlur()}
            onFocus={() => onFocus()}
        />
        {examples ? (
            <datalist>
                {[...new Set((examples).concat(schema.default ? [schema.default] : [])),]
                    .map(example => (
                        <option key={example} value={example}/>
                    ))}
            </datalist>
        ) : null}
    </>
}

export default TextWidget;