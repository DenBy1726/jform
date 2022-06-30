import {TypeProps} from "./index";
import React, {ReactElement} from "react";
import {JSONSchema7} from "json-schema";
import {ADDITIONAL_PROPERTY_FLAG} from "@jform/utils/handlers/additionalProperties";

const orderProperties = (properties: string[], order?: string[]) => {
    if (!Array.isArray(order)) {
        return properties;
    }

    const arrayToHash = (arr: string[]) =>
        arr.reduce((prev: any, curr) => {
            prev[curr] = true;
            return prev;
        }, {});

    const errorPropList = (arr: string[]) =>
        arr.length > 1
            ? `properties '${arr.join("', '")}'`
            : `property '${arr[0]}'`;
    const propertyHash = arrayToHash(properties);
    const orderFiltered = order.filter(prop => prop === "*" || propertyHash[prop]);
    const orderHash = arrayToHash(orderFiltered);

    const rest = properties.filter(prop => !orderHash[prop]);
    const restIndex = orderFiltered.indexOf("*");
    if (restIndex === -1) {
        if (rest.length) {
            throw new Error(`configSchema order list does not contain ${errorPropList(rest)}`);
        }
        return orderFiltered;
    }
    if (restIndex !== orderFiltered.lastIndexOf("*")) {
        throw new Error("uiSchema order list contains more than one wildcard item");
    }

    const complete = [...orderFiltered];
    complete.splice(restIndex, 1, ...rest);
    return complete;
}

const isRequired = (schema: JSONSchema7, name: string): boolean => {
    return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
}

const onPropertyChanged = (name: string, data: object, onChange: Function): ((arg: any) => void) => {
    return (value: any) => {
        const newData = {...data, [name]: value};
        onChange(newData);
    };
}

const ObjectField = (props: TypeProps): ReactElement<any, any> => {
    const {
        data,
        schema,
        configSchema,
        eventSchema,
        readSchema,
        onBlur,
        onFocus,
        onChange,
        widget: Widget,
        required,
        disabled,
        autofocus,
        errors,
        events,
    } = props;

    const properties = orderProperties(Object.keys(schema.properties || {}), configSchema?.order).map(name => {
        const _schema = schema?.properties?.[name];
        //@ts-ignore
        const isAdditional = _schema?.[ADDITIONAL_PROPERTY_FLAG];
        return {
            [name]: {
                onChange: onPropertyChanged(name, data, onChange),
                onBlur,
                onFocus,
                schema: _schema,
                configSchema: isAdditional ? configSchema?.additionalProperties : configSchema?.[`$${name}`],
                eventSchema: isAdditional ? eventSchema?.additionalProperties : eventSchema?.[`$${name}`],
                readSchema: isAdditional ? readSchema?.additionalProperties : readSchema?.[`$${name}`],
                required: isRequired(schema, name),
                value: data[name]
            }
        }
    }).reduce((a, b) => ({...a, ...b}));
    const {className, id, style, theme} = configSchema || {};

    const widgetProps = {
        properties,
        className,
        id,
        style,
        required,
        disabled,
        schema,
        autofocus,
        errors,
        events,
        value: data,
        theme,
        onChange,
        onBlur,
        onFocus
    }

    //@ts-ignore
    return <Widget {...widgetProps}/>

}

export default ObjectField;