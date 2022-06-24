import React, {FunctionComponent, PropsWithChildren, useContext, useMemo} from "react"
import {
    ConfigSchema, FieldHiddenProps,
    FieldLabelProps,
    FieldLayoutProps, FormTemplate,
    SchemaErrorItem,
    SchemaItem,
    SchemaProps,
    TypeProps
} from "@jform/core";
import {retrieveSchema} from "./reference";
import {JSONSchema7} from "json-schema";
import {getSchemaType} from "@jform/utils/getSchemaType";
import types from "./types";
import {JFormContext} from "../Form";

const getFieldItemHandler = (item: SchemaItem<any, any>, def: FunctionComponent): FunctionComponent<any> => {
    const {text, template, ...otherProps} = item;
    if (template) {
        // @ts-ignore
        return (props) => template({...props, ...otherProps});
    } else {
        return (props) => def({title: text || props?.title, ...props, ...otherProps})
    }
}

const canonizeFieldItemProps = (item?: SchemaItem<any, any>, standard?: string): SchemaItem<any, any> => {
    if (item === undefined) {
        return {text: standard};
    }
    return {...item, text: item.text || standard};
}

const canonizeErrorFieldProps = (item?: SchemaErrorItem<any>, standard?: string[]): SchemaErrorItem<any> => {
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
        typeTemplate = types[0];
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
        readSchema,
        errors,
        required,
        propertyKeyModified = false,
        modifiedName,
        className,
        ...other
    } = props;

    const {template} = useContext(JFormContext);

    const FieldTemplate: FunctionComponent<FieldLayoutProps> = getFieldTemplate(configSchema, template);

    const titleProps: FieldLabelProps = canonizeFieldItemProps(configSchema?.title as SchemaItem<any, any>, schema.title) as FieldLabelProps;
    //@ts-ignore
    titleProps?.required?.display = required || titleProps?.required?.display || false;

    const descProps: SchemaItem<string, any> = canonizeFieldItemProps(configSchema?.description as SchemaItem<any, any>, schema.description);
    const helpProps: SchemaItem<string, any> = canonizeFieldItemProps(configSchema?.help as SchemaItem<any, any>);
    const errorProps: SchemaErrorItem<any> = canonizeErrorFieldProps(configSchema?.error as SchemaErrorItem<any>, errors);

    const TitleField: FunctionComponent = useMemo(() => getFieldItemHandler(titleProps, template!.common!.field!.title as FunctionComponent), [titleProps]);
    const DescriptionField: FunctionComponent = useMemo(() => getFieldItemHandler(descProps, template!.common!.field!.description), [descProps]);
    const HelpField: FunctionComponent = useMemo(() => getFieldItemHandler(helpProps, template!.common!.field!.help), [helpProps]);
    const ErrorsField: FunctionComponent = useMemo(() => getFieldItemHandler(errorProps, template!.common!.field!.error), [errorProps]);

    const disabled = configSchema?.disabled || schema.readOnly;
    const autofocus = configSchema?.autofocus;


    // if(propertyKeyModified) {
    //     titleProps.text = modifiedName;
    // }
    // if (required) {
    //     titleProps.required = required;
    // }

    const computedSchema = useMemo(() => retrieveSchema(schema, schema, data), [schema, data]);
    console.log(computedSchema);

    const TypeTemplate = getTypeTemplate(schema, configSchema);

    return <FieldTemplate title={TitleField}
                          description={DescriptionField}
                          help={HelpField}
                          titleProps={titleProps}
                          descriptionProps={descProps}
                          helpProps={helpProps}
                          hidden={configSchema?.hidden as FieldHiddenProps}
                          errors={ErrorsField}
                          errorsProps={errorProps}
                          {...other}>
        <TypeTemplate
            schema={schema}
            configSchema={configSchema}
            autofocus={!!autofocus}
            disabled={!!disabled}
            className={className}
            data={data}
            required={false}
            onChange={() => {
            }}
            onBlur={() => {
            }}
            onFocus={() => {
            }}
            errors={errorProps}
        />
    </FieldTemplate>;
}