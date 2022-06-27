import React from "react";
import {StringWidgetProps} from "./index";

const processValue = (value: string, empty?: string): string | undefined => {
    return value === "" ? empty : value
}

function TextWidget(props: StringWidgetProps) {
    const {
        autofocus,
        disabled,
        onChange,
        onFocus,
        onBlur,
        value,
        empty,
        defaultValue,
        id,
        style,
        className,
        placeholder,
        examples
    } = props;


    return <>
        <input
            className={className}
            id={id}
            style={style}
            disabled={disabled}
            autoFocus={autofocus}
            value={value == null ? defaultValue : value}
            placeholder={placeholder}
            onChange={onChange && (e => onChange(processValue(e.target.value, empty)))}
            onBlur={onBlur && (e => onBlur(processValue(e.target.value, empty)))}
            onFocus={onFocus && (e => onFocus(processValue(e.target.value, empty)))}
        />
        {examples ? (
            <datalist>
                {[...new Set((examples).concat(defaultValue ? [defaultValue] : [])),]
                    .map(example => (
                        <option key={example} value={example}/>
                    ))}
            </datalist>
        ) : null}
    </>
}

export default TextWidget;