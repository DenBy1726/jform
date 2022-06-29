import React from "react"
import {BooleanWidgetProps} from "../";

function CheckboxWidget(props: BooleanWidgetProps) {
    const {
        value,
        disabled,
        autofocus,
        onBlur,
        onFocus,
        onChange,
        className,
        id,
        style,
        required
    } = props;

    return <input
        type="checkbox"
        id={id}
        className={className}
        style={style}
        checked={value === undefined ? false : value}
        required={required}
        disabled={disabled}
        autoFocus={autofocus}
        onChange={event => onChange(event.target.checked)}
        onBlur={() => onBlur()}
        onFocus={() => onFocus()}
    />
}

export default CheckboxWidget;