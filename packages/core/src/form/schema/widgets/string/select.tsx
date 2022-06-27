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
        defaultValue
    } = props;


    return (
        <select
            id={id}
            style={style}
            className={className}
            value={typeof value === "undefined" ? defaultValue : value}
            required={required}
            disabled={disabled}
            autoFocus={autofocus}
            onBlur={e => onBlur(e.target.value)}
            onFocus={e => onFocus(e.target.value)}
            onChange={e => onChange(e.target.value)}
        >
            {defaultValue === undefined && (<option value="">{placeholder}</option>)}
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