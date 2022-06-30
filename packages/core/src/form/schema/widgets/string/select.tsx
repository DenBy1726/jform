import React from "react";
import {StringWidgetProps} from "./index";
import {JSONSchema7} from "json-schema";


const processValue = (schema: JSONSchema7, value: string): any => {
    const {type} = schema;
    if (value === "" && schema?.enum?.indexOf("") === -1) {
        return null;
    }
    if (type === "boolean") {
        return value === "true";
    }
    return value;
}

function SelectWidget(props: StringWidgetProps) {
    const {
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
        schema,
        configSchema
    } = props;


    return (
        <select
            id={id}
            style={style}
            className={className}
            value={value || configSchema?.empty}
            required={required}
            disabled={disabled}
            autoFocus={autofocus}
            onBlur={() => onBlur()}
            onFocus={() => onFocus()}
            onChange={e => onChange(processValue(schema, e.target.value))}
        >
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