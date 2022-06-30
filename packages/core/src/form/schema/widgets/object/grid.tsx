import {ObjectWidgetProps} from "./index";
import React from "react";
import Schema from "../../Schema";

const GridWidget = (props: ObjectWidgetProps) => {
    const {autofocus, disabled, properties = {}, className, required, id, style, tag: Tag = "div"} = props;

    //@ts-ignore
    return <Tag autoFocus={autofocus} required={required} disabled={disabled} className={className} id={id}
                style={style}>
        {Object.entries(properties).map(([name, {
            onChange,
            onBlur,
            onFocus,
            value,
            schema,
            required,
            configSchema,
            eventSchema,
            readSchema
        }]) => {
            return <Schema
                key={name}
                name={name}
                required={required}
                schema={schema}
                configSchema={configSchema}
                eventSchema={eventSchema}
                readSchema={readSchema}
                data={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
            />
        })}
    </Tag>
}

export default GridWidget;