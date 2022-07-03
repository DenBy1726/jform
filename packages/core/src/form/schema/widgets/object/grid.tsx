import {ObjectWidgetProps} from "./index";
import React from "react";
import Schema from "../../Schema";
import {JSONSchema7} from "json-schema";

const handleRemoveKey = (handler: Function, name: string, data: object, onChange: Function) => {
    return () => {
        const result = handler({
            name, data, removeKey: () => {
                //@ts-ignore
                const {[name]: removed, ...result} = data;
                return result;
            }
        });
        onChange(result);
    }
}

const handleAddKey = (handler: Function, data: object, onChange: Function) => {
    return () => {
        const item = handler();
        onChange({...data, ...item});
    }
}

const canExpand = (schema: JSONSchema7, data: any, handler: Function) => {
    if (!handler) {
        return false;
    }
    if (!schema.additionalProperties) {
        return false;
    }

    if (schema.maxProperties !== undefined) {
        return Object.keys(data).length < schema.maxProperties;
    }
    return true;
}

const GridWidget = (props: ObjectWidgetProps) => {
    const {
        autofocus,
        disabled,
        properties = {},
        className,
        required,
        id,
        style,
        tag: Tag = "div",
        widget,
        events,
        schema,
        value: data,
        onChange: onChangeObject
    } = props;

    //@ts-ignore
    const {itemClassName,additionalItemClassName, actionsClassName, actionClassName, addKeyButton, removeKeyButton} = widget;
    const {onAddKey, onRemoveKey} = events;

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
            readSchema,
            isAdditional
        }]) => {

            return <div key={name} className={[itemClassName, isAdditional && additionalItemClassName].filter(x => x && x.length > 0).join(" ")}>
                <Schema
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
                {isAdditional && onRemoveKey &&
                    <button className={removeKeyButton} onClick={handleRemoveKey(onRemoveKey, name, data, onChangeObject)}>Delete</button>}
            </div>
        })}
        {canExpand(schema, data, onAddKey) &&
            <div className={actionsClassName}>
                <p className={actionClassName}>
                    <button className={addKeyButton} onClick={handleAddKey(onAddKey, data, onChangeObject)}>Add</button>
                </p>
            </div>
        }
    </Tag>
}

export default GridWidget;