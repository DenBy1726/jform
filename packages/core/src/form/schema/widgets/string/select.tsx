import React from "react";
import {StringWidgetProps} from "@jform/core";
import {JSONSchema7} from "json-schema";

function processValue(_schema: JSONSchema7, value: string): string | undefined {
    if (value === "") {
        return undefined;
    } else {
        return value;
    }
}

function SelectWidget(props: StringWidgetProps) {
    const {
        schema,
        options,
        disabledOptions,
        value,
        required,
        disabled,
        autofocus,
        onChange,
        onBlur,
        onFocus,
        placeholder,
        className,
        id,
        style,
        emptyValue
    } = props;
    return (
        <select
            id={id}
            style={style}
            className={className}
            value={typeof value === "undefined" ? emptyValue : value}
            required={required}
            disabled={disabled}
            autoFocus={autofocus}
            onBlur={onBlur && (e => onBlur(processValue(schema, e.target.value)))}
            onFocus={onFocus && (e => onFocus(processValue(schema, e.target.value)))}
            onChange={e => onChange(processValue(schema, e.target.value))}>
            {schema.default === undefined && (<option value="">{placeholder}</option>)}
            {options?.map(({value, label}, i) => {
                const disabled = disabledOptions && disabledOptions.indexOf(value) != -1;
                return (
                    <option key={i} value={value} disabled={disabled}>
                        {label}
                    </option>
                );
            })}
        </select>
    );
}

export default SelectWidget;