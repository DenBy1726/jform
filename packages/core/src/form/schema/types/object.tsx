import {TypeProps} from "./index";
import React, {ReactElement} from "react";
import {JSONSchema7} from "json-schema";
import {mergeSchemas, isAdditional} from "@jform/utils";
import {isObject} from "lodash-es";

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
        throw new Error("configSchema order list contains more than one wildcard item");
    }

    const complete = [...orderFiltered];
    complete.splice(restIndex, 1, ...rest);
    return complete;
}

const isRequired = (schema: JSONSchema7, name: string): boolean => {
    return Array.isArray(schema.required) && schema.required.indexOf(name) !== -1
}

const onPropertyChanged = (name: string, data: any, onChange: Function): ((arg: any) => void) => {
    return (value: any) => {
        let newData;
        if (isObject(data)) {
            newData = {...data, [name]: value};
        } else {
            newData = {[name]: value}
        }
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

    let propertiesList = orderProperties(Object.keys(schema.properties || {}), configSchema?.order);
    let properties = {};
    if (propertiesList.length > 0) {
        properties = propertiesList.map(name => {
            const _schema = schema?.properties?.[name];
            //@ts-ignore
            const additional = isAdditional(_schema);
            return {
                [name]: {
                    onChange: onPropertyChanged(name, data, onChange),
                    onBlur,
                    onFocus,
                    schema: _schema,
                    configSchema: mergeSchemas({}, configSchema?.additionalProperties, configSchema?.[`$${name}`]),
                    eventSchema: mergeSchemas({}, eventSchema?.additionalProperties, eventSchema?.[`$${name}`]),
                    readSchema: mergeSchemas({}, readSchema?.additionalProperties, readSchema?.[`$${name}`]),
                    required: isRequired(schema, name),
                    value: data[name],
                    isAdditional: additional
                }
            }
        }).reduce((a, b) => ({...a, ...b}));
    }
    const {className, id, style, theme, widget} = configSchema || {};

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
        widget,
        onChange,
        onBlur,
        onFocus
    }

    //@ts-ignore
    return <Widget {...widgetProps}/>

}

export default ObjectField;