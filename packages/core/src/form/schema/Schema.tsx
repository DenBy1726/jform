import React, {FunctionComponent, PropsWithChildren, useContext, useMemo} from "react"
import {
    ConfigSchema,
    EventSchema,
    FieldError,
    FieldHidden,
    FieldStaticInfo,
    FieldTitle,
    HtmlConfigurable,
    ReadSchema,
    Widget
} from "@jform/core";
import {JSONSchema7, JSONSchema7TypeName} from "json-schema";
import {getWidget, retrieveSchema} from "@jform/utils/index";
import types, {TypeProps} from "./types";
import {JFormContext} from "../Form";
import {FormTemplate} from "./templates";
import {FieldLayoutProps} from "./templates/layout";
import {StringWidgetProps} from "form/schema/widgets";

interface SchemaProps extends HtmlConfigurable {
    data: string,
    schema: JSONSchema7,
    configSchema?: ConfigSchema,
    readSchema?: ReadSchema,
    eventSchema?: EventSchema,
    errors?: string[],
    propertyKeyModified?: boolean,
    modifiedName?: string,
    required?: boolean,
    onChange: (arg: any) => void,
    onBlur: () => void,
    onFocus: () => void,
}

const getFieldItemHandler = (item: FieldStaticInfo<any, any>, _def: FunctionComponent, type?: FunctionComponent): FunctionComponent<any> => {
    const {text, template, ...otherProps} = item;
    if (template) {
        return (props) => template({...props, ...otherProps});
    } else {
        const def = type || _def;
        return (props) => def({title: text || props?.title, ...props, ...otherProps})
    }
}

const canonizeFieldItemProps = (item?: FieldStaticInfo<any, any>, standard?: string): FieldStaticInfo<any, any> => {
    if (item === undefined) {
        return {text: standard};
    }
    return {...item, text: item.text || standard};
}

const canonizeErrorFieldProps = (item?: FieldError, standard?: string[]): FieldError => {
    let errors: string[] = [];
    if (standard !== undefined) {
        errors.push(...standard);
    }
    if (item === undefined) {
        return {text: errors}
    } else {
        if (item.text === undefined) {
            return {...item, text: [...errors]}
        } else if (Array.isArray(item.text)) {
            return {...item, text: [...errors, ...item.text]}
        } else {
            // @ts-ignore
            return {...item, text: () => item.text(errors)}
        }
    }
}

function getTypeTemplate(type: JSONSchema7TypeName, configSchema?: ConfigSchema): FunctionComponent<TypeProps> {
    if (configSchema?.field !== undefined) {
        return configSchema.field;
    }

    // // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
    // // render a field and let the MultiSchemaField component handle the form display
    // if (!componentName && (schema.anyOf || schema.oneOf)) {
    //     return () => null;
    // }

    if (type === undefined) {
        throw new Error(`unknown type ${type}. Supported: ${Object.keys(types).join(",")}`)
    }
    //@ts-ignore
    return types[type];

}

function getFieldTemplate(type: JSONSchema7TypeName, configSchema: ConfigSchema | undefined, template: FormTemplate): FunctionComponent<FieldLayoutProps> {
    if (typeof configSchema?.layout !== "function" && configSchema?.layout?.template && typeof configSchema.layout?.template === 'function') {
        return configSchema.layout?.template;
    } else {
        if (template?.type?.[type]?.layout !== undefined) {
            return template?.type?.[type]?.layout;
        }
        return template!.common!.field!.layout;
    }
}

const processValue = (value: string, empty?: string): string | undefined => {
    if (value === "") {
        return empty;
    } else {
        return value;
    }
}

const wrapEvent = (event: Function, userHandler?: Function): (arg: any) => void => {
    if (userHandler) {
        return (value: any) => {
            userHandler(value);
            event(value);
        }
    } else {
        return val => event(val);
    }
};

const wrapNoArgEvent = (event: Function, userHandler?: Function): () => void => {
    if (userHandler) {
        return () => {
            userHandler();
            event();
        }
    } else {
        return () => event();
    }
};

export default (props: PropsWithChildren<SchemaProps>) => {
    const {
        schema,
        data,
        configSchema,
        eventSchema,
        errors,
        required,
        onBlur,
        onFocus,
        onChange
    } = props;

    let {
        onChange: onChangeEvent,
        onBlur: onBlurEvent,
        onFocus: onFocusEvent,
        ...events
    } = Object.keys(eventSchema || {})
        .filter(key => !key.startsWith("$"))
        .reduce((obj, key) => {
            //@ts-ignore
            obj[key] = eventSchema[key];
            return obj;
        }, {}) as EventSchema;

    const type = schema.type as JSONSchema7TypeName;

    const _onChange = wrapEvent((x: any) => onChange(processValue(x, configSchema?.empty)), onChangeEvent);
    const _onBlur = wrapNoArgEvent(onBlur, onBlurEvent);
    const _onFocus = wrapNoArgEvent(onFocus, onFocusEvent);

    const {template, widgets} = useContext(JFormContext);

    const titleProps: FieldTitle = canonizeFieldItemProps(configSchema?.title as FieldStaticInfo<any, any>, schema.title) as FieldTitle;
    //@ts-ignore
    titleProps?.required?.display = required || titleProps?.required?.display || false;

    const descProps: FieldStaticInfo<string, any> = canonizeFieldItemProps(configSchema?.description as FieldStaticInfo<any, any>, schema.description);
    const helpProps: FieldStaticInfo<string, any> = canonizeFieldItemProps(configSchema?.help as FieldStaticInfo<any, any>);
    const errorProps: FieldError = canonizeErrorFieldProps(configSchema?.error as FieldError, errors);

    const TitleField: FunctionComponent = useMemo(() =>
        getFieldItemHandler(titleProps, template!.common!.field!.title as FunctionComponent, template?.type?.[type]?.title), [titleProps]);
    const DescriptionField: FunctionComponent = useMemo(() =>
        getFieldItemHandler(descProps, template!.common!.field!.description, template?.type?.[type]?.description), [descProps]);
    const HelpField: FunctionComponent = useMemo(() =>
        getFieldItemHandler(helpProps, template!.common!.field!.help, template?.type?.[type]?.help), [helpProps]);
    const ErrorsField: FunctionComponent = useMemo(() =>
        getFieldItemHandler(errorProps, template!.common!.field!.error, template?.type?.[type]?.error), [errorProps]);

    // if(propertyKeyModified) {
    //     titleProps.text = modifiedName;
    // }
    // if (required) {
    //     titleProps.required = required;
    // }

    const computedSchema = useMemo(() => retrieveSchema(schema, schema, data), [schema, data]);
    console.log(computedSchema);

    const FieldTemplate = getFieldTemplate(type, configSchema, template);
    const TypeTemplate = getTypeTemplate(type, configSchema);
    let widget = getWidget<StringWidgetProps>(type, (configSchema?.widget as Widget)?.type, widgets);

    return <FieldTemplate title={TitleField}
                          description={DescriptionField}
                          help={HelpField}
                          titleProps={titleProps}
                          descriptionProps={descProps}
                          helpProps={helpProps}
                          hidden={configSchema?.hidden as FieldHidden}
                          errors={ErrorsField}
                          errorsProps={errorProps}
                          configSchema={configSchema}
    >
        <TypeTemplate
            widget={widget}
            schema={computedSchema}
            configSchema={configSchema}
            autofocus={!!(configSchema?.autofocus)}
            disabled={!!(configSchema?.disabled || schema.readOnly)}
            data={data}
            required={false}
            eventSchema={eventSchema}
            errors={errorProps}
            onChange={_onChange}
            onBlur={_onBlur}
            onFocus={_onFocus}
            //@ts-ignore
            events={events}
        />
    </FieldTemplate>;
}