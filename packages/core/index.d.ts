declare module '@jform/core' {
    import * as React from 'react';
    import type * as CSS from 'csstype';
    import {JSONSchema7, JSONSchema7Definition, JSONSchema7Type, JSONSchema7TypeName} from 'json-schema';


    export interface FieldStateCommonFormTemplate {
        loading: React.FunctionComponent,
        view: React.FunctionComponent
    }

    export interface KeysSchema {
        [name: `$${string}`]: any;
    }

    export interface HtmlConfigurable {
        className?: string,
        style?: CSS.Properties,
        id?: string,
    }

    export interface SchemaItem<Text, T> extends HtmlConfigurable, KeysSchema {
        text?: Text | ((arg: T) => Text),
        display?: boolean
        template?: string | ((arg: T) => React.FunctionComponent<T>),
    }

    export interface SchemaErrorItem<T> extends SchemaItem<string[], T> {
        errorClass?: string
    }

    export interface FieldLabelProps<T> extends SchemaItem<string, T> {
        required?: boolean
    }


    export interface ConfigSchema extends KeysSchema, HtmlConfigurable {
        template?: React.FunctionComponent,
        title?: FieldLabelProps<any> | string,
        description?: SchemaItem<string, any> | string,
        help?: SchemaItem<string, any> | string,
        error?: SchemaErrorItem<any> | string[],
        hidden?: boolean,
        disabled?: boolean
    }

    export interface ReadSchema extends KeysSchema {
        always: boolean
    }

    export interface ValidationSchema extends KeysSchema {
    }

    export interface EventSchema extends KeysSchema {
    }

    export interface RulesSchema extends KeysSchema {
    }

    export interface JSchema {
        schema: JSONSchema7,
        configSchema: ConfigSchema,
        readSchema: ReadSchema,
        validationSchema: ValidationSchema,
        eventSchema: EventSchema,
        rulesSchema?: RulesSchema
    }

    export interface FieldLayoutProps {
        title: React.FunctionComponent<FieldLabelProps<any>>,
        description: React.FunctionComponent<SchemaItem<string, any>>,
        help: React.FunctionComponent<SchemaItem<string, any>>,
        titleProps: FieldLabelProps<any>,
        descriptionProps: SchemaItem<string, any>,
        helpProps: SchemaItem<string, any>,
        errors: React.FunctionComponent<SchemaErrorItem<any>>,
        errorsProps: SchemaErrorItem<any>,
        hidden?: boolean,
        id?: string
    }

    export interface FieldCommonFormTemplate {
        layout: React.FunctionComponent<FieldLayoutProps>,
        title: React.FunctionComponent<FieldLabelProps<any>>,
        description: React.FunctionComponent<SchemaItem<string, any>>,
        help: React.FunctionComponent<SchemaItem<string, any>>,
        error: React.FunctionComponent<SchemaErrorItem<any>>,
        state: FieldStateCommonFormTemplate
    }

    export interface CommonFormTemplate {
        field: FieldCommonFormTemplate,
        button: React.FunctionComponent,
        tip: React.FunctionComponent,
        error: React.FunctionComponent,
        actions: React.FunctionComponent
    }

    export interface JsonTypeFormTemplate extends FieldCommonFormTemplate {
        format: { [k: string]: string | object }
    }

    export interface FormTemplate {
        common: CommonFormTemplate,
        type?: { [k in JSONSchema7TypeName]: JsonTypeFormTemplate },
        button?: object
    }

    export interface SchemaProps {
        data: string,
        schema: JSONSchema7,
        configSchema?: ConfigSchema,
        readSchema?: ReadSchema,
        validationSchema?: ValidationSchema,
        eventSchema?: EventSchema,
        template?: FormTemplate,
        errors?: string[],
        propertyKeyModified?: boolean,
        modifiedName?: string,
        required?: boolean
    }

    export interface FormProps {
        data: string,
        schema: JSONSchema7,
        configSchema?: ConfigSchema,
        readSchema?: ReadSchema,
        validationSchema?: ValidationSchema,
        eventSchema?: EventSchema,
        template?: FormTemplate,
        errors?: string[],
        rulesSchema?: RulesSchema
    }


    export function Schema(props: React.PropsWithChildren<SchemaProps>): React.FunctionComponent;

    export default function Form(props: React.PropsWithChildren<FormProps>): React.FunctionComponent;

    export function getDefaultTemplate(): FormTemplate;

}