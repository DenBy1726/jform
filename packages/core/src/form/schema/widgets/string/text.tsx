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
        schema,
        required
    } = props;


    return <>
        <input
            type="text"
            className={className}
            id={id}
            style={style}
            disabled={disabled}
            autoFocus={autofocus}
            required={required}
            value={value == null ? "" : value}
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