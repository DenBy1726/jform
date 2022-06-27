import React, {FunctionComponent, PropsWithChildren, useContext, useMemo} from "react"
import {
    ConfigSchema,
    EventSchema,
    FieldError,
    FieldHidden,
    FieldStaticInfo,
    FieldTitle,
    HtmlConfigurable,
    ReadSchema
} from "@jform/core";
import {JSONSchema7} from "json-schema";
import {getSchemaType, retrieveSchema} from "@jform/utils/index";
import types, {TypeProps} from "./types";
import {JFormContext} from "../Form";
import {FormTemplate} from "./templates";
import {FieldLayoutProps} from "./templates/layout";

interface SchemaProps extends HtmlConfigurable {
    data: string,
    schema: JSONSchema7,
    configSchema?: ConfigSchema,
    readSchema?: ReadSchema,
    eventSchema?: EventSchema,
    errors?: string[],
    propertyKeyModified?: boolean,
    modifiedName?: string,
    required?: boolean
}

const getFieldItemHandler = (item: FieldStaticInfo<any, any>, def: FunctionComponent): FunctionComponent<any> => {
    const {text, template, ...otherProps} = item;
    if (template) {
        return (props) => template({...props, ...otherProps});
    } else {
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

function getTypeTemplate(schema: JSONSchema7, configSchema?: ConfigSchema): FunctionComponent<TypeProps> {
    if (configSchema?.field !== undefined) {
        return configSchema.field;
    }
    const type = getSchemaType(schema);
    let typeTemplate;

    if (typeof type === "string") {
        typeTemplate = types[type];
    } else {
        typeTemplate = types[type[0]];
    }

    // // If the type is not defined and the schema uses 'anyOf' or 'oneOf', don't
    // // render a field and let the MultiSchemaField component handle the form display
    // if (!componentName && (schema.anyOf || schema.oneOf)) {
    //     return () => null;
    // }

    return typeTemplate;

}

function getFieldTemplate(configSchema: ConfigSchema | undefined, template: FormTemplate): FunctionComponent<FieldLayoutProps> {
    if (configSchema?.layout) {
        if (typeof configSchema.layout === 'function') {
            return configSchema.layout;
        } else {
            return (props) => template!.common!.field!.layout({...props, ...configSchema?.layout});
        }
    }
    return template!.common!.field!.layout;
}

export default (props: PropsWithChildren<SchemaProps>) => {
    const {
        schema,
        data,
        configSchema,
        eventSchema,
        errors,
        required
    } = props;


    const {template} = useContext(JFormContext);

    const titleProps: FieldTitle = canonizeFieldItemProps(configSchema?.title as FieldStaticInfo<any, any>, schema.title) as FieldTitle;
    //@ts-ignore
    titleProps?.required?.display = required || titleProps?.required?.display || false;

    const descProps: FieldStaticInfo<string, any> = canonizeFieldItemProps(configSchema?.description as FieldStaticInfo<any, any>, schema.description);
    const helpProps: FieldStaticInfo<string, any> = canonizeFieldItemProps(configSchema?.help as FieldStaticInfo<any, any>);
    const errorProps: FieldError = canonizeErrorFieldProps(configSchema?.error as FieldError, errors);

    const TitleField: FunctionComponent = useMemo(() => getFieldItemHandler(titleProps, template!.common!.field!.title as FunctionComponent), [titleProps]);
    const DescriptionField: FunctionComponent = useMemo(() => getFieldItemHandler(descProps, template!.common!.field!.description), [descProps]);
    const HelpField: FunctionComponent = useMemo(() => getFieldItemHandler(helpProps, template!.common!.field!.help), [helpProps]);
    const ErrorsField: FunctionComponent = useMemo(() => getFieldItemHandler(errorProps, template!.common!.field!.error), [errorProps]);

    // if(propertyKeyModified) {
    //     titleProps.text = modifiedName;
    // }
    // if (required) {
    //     titleProps.required = required;
    // }

    const computedSchema = useMemo(() => retrieveSchema(schema, schema, data), [schema, data]);
    console.log(computedSchema);

    const FieldTemplate = getFieldTemplate(configSchema, template);
    const TypeTemplate = getTypeTemplate(computedSchema, configSchema);

    return <FieldTemplate title={TitleField}
                          description={DescriptionField}
                          help={HelpField}
                          titleProps={titleProps}
                          descriptionProps={descProps}
                          helpProps={helpProps}
                          hidden={configSchema?.hidden as FieldHidden}
                          errors={ErrorsField}
                          errorsProps={errorProps}
                          className={configSchema?.layout?.className}
                          errorClassName={configSchema?.layout?.errorClassName}
                          style={configSchema?.layout?.style}
                          id={configSchema?.layout?.id}>
        <TypeTemplate
            type={configSchema?.type || 'undefined'}
            schema={computedSchema}
            configSchema={configSchema}
            autofocus={!!(configSchema?.autofocus)}
            disabled={!!(configSchema?.disabled || schema.readOnly)}
            data={data}
            required={false}
            eventSchema={eventSchema}
            errors={errorProps}
        />
    </FieldTemplate>;
}