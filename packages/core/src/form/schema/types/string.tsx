import React, {FunctionComponent, useContext} from "react";
import {ConfigSchema, StringTypeProps, StringWidgetProps, WidgetProps} from "@jform/core";
import {JSONSchema7} from "json-schema";
import {retrieveSchema} from "../reference";
import {JFormContext} from "../../Form";

function getWidget<T extends WidgetProps<any>>(type: string, widget: string, widgets: any): FunctionComponent<T> {
    if (typeof widget === "function") {
        return widget as FunctionComponent;
    }
    if (widgets[type][widget]) {
        return widgets[type][widget];
    } else {
        throw new Error(`No widget "${widget}" for type ${type}`);
    }
}

function toConstant(schema: JSONSchema7): any {
    if (Array.isArray(schema.enum) && schema.enum.length === 1) {
        return schema.enum[0];
    } else if (schema.const) {
        return schema.const;
    } else {
        throw new Error("schema cannot be inferred as a constant");
    }
}

function optionsList(schema: JSONSchema7, configSchema?: ConfigSchema) {
    if (schema.enum) {
        return schema.enum.map((value, i) => {
            const label = (configSchema?.enumNames && configSchema?.enumNames[i]) || String(value);
            return {label, value};
        });
    } else {
        const altSchemas = schema.oneOf || schema.anyOf;
        return altSchemas?.map(schema => {
            const value = toConstant(schema as JSONSchema7);
            const label = (schema as JSONSchema7).title || String(value);
            return {
                schema,
                label,
                value,
            };
        });
    }
}


function isSelect(_schema: JSONSchema7): boolean {
    const schema = retrieveSchema(_schema, _schema);
    const altSchemas = schema.oneOf || schema.anyOf;
    if (Array.isArray(schema.enum)) {
        return true;
    } else if (Array.isArray(altSchemas)) {
        return altSchemas.every(altSchemas => isConstant(altSchemas as JSONSchema7));
    }
    return false;
}

function isConstant(schema: JSONSchema7): boolean {
    return (
        (Array.isArray(schema.enum) && schema.enum.length === 1) ||
        schema.hasOwnProperty("const")
    );
}


function StringField(props: StringTypeProps) {
    const {
        schema,
        configSchema = {},
        data,
        required,
        disabled,
        autofocus,
        onChange,
        onBlur,
        onFocus,
        errors
    } = props;
    const {widgets} = useContext(JFormContext);

    let enumOptions;
    if (isSelect(schema)) {
        enumOptions = optionsList(schema, configSchema);
    }

    const {widget = {}} = configSchema;

    if (typeof widget === 'function') {
        const Widget = widget;
        return (
            <Widget
                options={enumOptions as any[]}
                value={data}
                {...props}
            />
        );
    } else {
        const declaredWidget = configSchema.type || 'undefined';
        const Widget = getWidget<StringWidgetProps>("string", declaredWidget, widgets);
        //@ts-ignore
        const {className, id, style} = widget || {};
        const {placeholder} = configSchema;
        const {default: defaultValue} = schema;
        return (
            <Widget
                options={enumOptions as any[]}
                disabledOptions={configSchema?.disabledOptions}
                autofocus={autofocus}
                schema={schema}
                configSchema={configSchema}
                disabled={disabled}
                value={data}
                required={required}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                errors={errors}
                className={className}
                id={id}
                style={style}
                placeholder={placeholder}
                defaultValue={defaultValue as string}
            />
        )
    }

}

export default StringField;