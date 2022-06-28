import React from "react";
import {StringWidgetProps} from "./index";

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
            onChange={e => onChange(e.target.value)}
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