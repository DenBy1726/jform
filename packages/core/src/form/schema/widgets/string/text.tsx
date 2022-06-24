import React from "react";
import {StringWidgetProps} from "@jform/core";

function TextWidget(props: StringWidgetProps) {
    const {
        autofocus,
        schema,
        configSchema,
        disabled,
        required,
        onChange,
        onFocus,
        onBlur,
        errors,
        value,
        emptyValue,
        defaultValue,
        id,
        style,
        className,
        options,
        disabledOptions,
        placeholder,
        ...inputProps
    } = props;

    //@ts-ignore
    const _onChange = ({target: {value}}) => {
        return props.onChange(value === "" ? emptyValue : value);
    };

    return <>
        <input
            className={className}
            id={id}
            style={style}
            disabled={disabled}
            autoFocus={autofocus}
            value={value == null ? defaultValue : value}
            placeholder={placeholder}
            {...inputProps}
            onChange={_onChange}
            onBlur={onBlur && (event => onBlur(event.target.value))}
            onFocus={onFocus && (event => onFocus(event.target.value))}
        />
        {schema.examples ? (
            <datalist>
                {[
                    ...new Set((schema.examples as any[]).concat(schema.default ? [schema.default] : [])
                    ),
                ].map(example => (
                    <option key={example} value={example}/>
                ))}
            </datalist>
        ) : null}
    </>
}

export default TextWidget;