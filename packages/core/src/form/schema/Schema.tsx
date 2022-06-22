import React, {FunctionComponent, PropsWithChildren, useMemo} from "react"
import {FieldLabelProps, FieldLayoutProps, SchemaErrorItem, SchemaItem, SchemaProps} from "@jform/core";
import {retrieveSchema} from "./reference";

const getFieldItemHandler = (item: SchemaItem<any, any>, def: FunctionComponent): FunctionComponent<any> => {
    const {text, template, ...otherProps} = item;
    if (template) {
        // @ts-ignore
        return (props) => template({...props, ...otherProps});
    } else {
        return (props) => def({title: text || props?.title, ...props, ...otherProps})
    }
}

const canonizeFieldItemProps = (item?: SchemaItem<any, any> | string | ((arg: any) => string), standard?: string): SchemaItem<any, any> => {
    if (item === undefined) {
        return {text: standard};
    } else if (typeof item === 'string' || typeof item === 'function') {
        return {text: item};
    } else {
        return {...item, text: item.text || standard};
    }
}

const canonizeErrorFieldProps = (item?: SchemaErrorItem<any> | string [], standard?: string[]): SchemaErrorItem<any> => {
    let errors: string[] = [];
    if (standard !== undefined) {
        errors.push(...standard);
    }
    if (item === undefined) {
        return {text: errors}
    } else if (Array.isArray(item)) {
        return {text: [...errors, ...item]}
    } else {
        if(item.text === undefined) {
            return {...item, text: [...errors]}
        } else if (Array.isArray(item.text)) {
            return {...item, text: [...errors, ...item.text]}
        } else {
            // @ts-ignore
            return {...item, text: () => item.text(errors)}
        }
    }
}

export default (props: PropsWithChildren<SchemaProps>) => {
    const {
        template,
        schema,
        data,
        configSchema,
        readSchema,
        errors,
        required,
        propertyKeyModified = false,
        modifiedName,
        ...other
    } = props;

    const FieldTemplate: FunctionComponent<FieldLayoutProps> = configSchema?.template || template!.common!.field!.layout;

    const titleProps: FieldLabelProps<any> = canonizeFieldItemProps(configSchema?.title, schema.title);
    const descProps: SchemaItem<string,any> = canonizeFieldItemProps(configSchema?.description, schema.description);
    const helpProps: SchemaItem<string,any> = canonizeFieldItemProps(configSchema?.help);
    const errorProps: SchemaErrorItem<any> = canonizeErrorFieldProps(configSchema?.error, errors);

    const TitleField: FunctionComponent = useMemo(() => getFieldItemHandler(titleProps, template!.common!.field!.title as FunctionComponent), [titleProps]);
    const DescriptionField: FunctionComponent = useMemo(() => getFieldItemHandler(descProps, template!.common!.field!.description), [descProps]);
    const HelpField: FunctionComponent = useMemo(() => getFieldItemHandler(helpProps, template!.common!.field!.help), [helpProps]);
    const ErrorsField: FunctionComponent = useMemo(() => getFieldItemHandler(errorProps, template!.common!.field!.error), [errorProps]);

    //const disabled = configSchema?.disabled || schema.readOnly;
    //const autofocus = configSchema?.autofocus;
    // let classNames: string | string[] = [`jform-field`, `jform-field-${schema.type}`]
    // // @ts-ignore
    // if (errorProps.display !== false && errorProps.list?.length > 0) {
    //     classNames.push("field-error has-error has-danger")
    // }
    // if (configSchema?.className) {
    //     classNames.push(configSchema.className);
    // }
    // classNames = classNames.join(" ").trim();

    // if(propertyKeyModified) {
    //     titleProps.text = modifiedName;
    // }
    // if (required) {
    //     titleProps.required = required;
    // }

    const computedSchema = useMemo(() => retrieveSchema(schema, schema, data), [schema, data]);
    console.log(computedSchema);
    return <FieldTemplate title={TitleField}
                          description={DescriptionField}
                          help={HelpField}
                          titleProps={titleProps}
                          descriptionProps={descProps}
                          helpProps={helpProps}
                          hidden={configSchema?.hidden}
                          errors={ErrorsField}
                          errorsProps={errorProps}
                          {...other}>
        {props.children}
    </FieldTemplate>;
}