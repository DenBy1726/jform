declare module '@jform/core' {
    import * as React from 'react';
    import type * as CSS from 'csstype';
    import {JSONSchema7, JSONSchema7Definition, JSONSchema7Type, JSONSchema7TypeName} from 'json-schema';
    import {FunctionComponent} from "react";


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

    export interface SchemaItem<Text, T> extends HtmlConfigurable {
        text?: Text | ((arg: T) => Text),
        display?: boolean
        template?: string | ((arg: T) => React.FunctionComponent<T>),
    }

    export interface SchemaErrorItem<T> extends SchemaItem<string[], T> {
        errorClassName?: string
    }

    export interface FieldLabelProps extends HtmlConfigurable {
        required?: SchemaItem<string, FieldLabelProps>,
        text?: string | ((arg: FieldLabelProps) => string),
        display?: boolean
    }

    export interface LayoutProps extends HtmlConfigurable {
        errorClassName?: string
    }

    export interface TypeProps extends HtmlConfigurable {
        schema: JSONSchema7,
        configSchema?: ConfigSchema,
        disabled: boolean,
        autofocus: boolean,
        data: any,
        required: boolean,
        onChange: Function,
        onBlur: Function,
        onFocus: Function,
        errors: SchemaErrorItem<any>,
        placeholder?: string
    }

    export interface StringTypeProps extends TypeProps {
        options?: any[]
    }

    export interface WidgetProps<T> extends HtmlConfigurable {
        autofocus?: boolean,
        schema: JSONSchema7,
        configSchema?: ConfigSchema,
        disabled: boolean,
        required: boolean,
        onChange: Function,
        onBlur: Function,
        onFocus: Function,
        errors: SchemaErrorItem<any>,
        value: T,
        emptyValue?: T,
        placeholder?: string,
        defaultValue?: string
    }

    export interface SelectOption<T> {
        schema?: JSONSchema7,
        label: string,
        value: T,
    }

    export interface StringWidgetProps extends WidgetProps<string> {
        options?: SelectOption<string>[],
        disabledOptions?: string[]
    }


    export interface ConfigSchema extends KeysSchema, HtmlConfigurable {
        layout?: LayoutProps,
        field?: React.FunctionComponent,
        title?: FieldLabelProps | string | ((arg: any) => string),
        description?: SchemaItem<string, any> | string | ((arg: any) => string),
        help?: SchemaItem<string, any> | string | ((arg: any) => string),
        error?: SchemaErrorItem<any> | string[] | ((arg: any) => string[]),
        hidden?: boolean | (HtmlConfigurable & { enable?: boolean }),
        disabled?: boolean,
        autofocus?: boolean,
        enumNames?: string,
        placeholder?: string,
        type?: string,
        widget?: HtmlConfigurable | Function,
        disabledOptions?: any[]
    }

    export interface ReadSchema extends KeysSchema {
        always?: boolean
        href?: string,
        widget?: string
    }

    export interface ValidationSchema extends KeysSchema {
    }

    export interface EventSchema extends KeysSchema {
    }

    export interface RulesSchema {
    }

    export interface JSchema {
        schema?: JSONSchema7,
        configSchema?: ConfigSchema,
        readSchema?: ReadSchema,
        validationSchema?: ValidationSchema,
        eventSchema?: EventSchema,
        rulesSchema?: RulesSchema
    }

    export interface FieldHiddenProps extends HtmlConfigurable {
        enable?: boolean
    }

    export interface FieldLayoutProps extends LayoutProps {
        title: React.FunctionComponent<FieldLabelProps>,
        description: React.FunctionComponent<SchemaItem<string, any>>,
        help: React.FunctionComponent<SchemaItem<string, any>>,
        titleProps: FieldLabelProps,
        descriptionProps: SchemaItem<string, any>,
        helpProps: SchemaItem<string, any>,
        errors: React.FunctionComponent<SchemaErrorItem<any>>,
        errorsProps: SchemaErrorItem<any>,
        hidden?: FieldHiddenProps
    }

    export interface FieldCommonFormTemplate {
        layout: React.FunctionComponent<FieldLayoutProps>,
        title: React.FunctionComponent<FieldLabelProps>,
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

    export interface Defaults {
        common?: JSchema,
        type?: { [k in JSONSchema7TypeName]?: JSchema },
        widget?: { [k in JSONSchema7TypeName]?: { [v: string]: JSchema } },
        rules?: ((arg: JSchema) => JSchema | undefined)[]
    }

    export interface Widgets {
        // @ts-ignore
        [k in JSONSchema7TypeName]: { [v: string]: FunctionComponent<WidgetProps> }
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
        eventSchema?: EventSchema,
        errors?: string[],
        propertyKeyModified?: boolean,
        modifiedName?: string,
        required?: boolean,
        className?: string
    }

    export interface FormProps {
        data: string,
        schema: JSONSchema7,
        configSchema?: ConfigSchema,
        readSchema?: ReadSchema,
        validationSchema?: ValidationSchema,
        eventSchema?: EventSchema,
        template?: FormTemplate,
        widgets?: Widgets,
        errors?: string[],
        rulesSchema?: RulesSchema,
        defaults?: Defaults,
        schemaInitialized?: (arg: JSchema) => void
    }


    export function Schema(props: React.PropsWithChildren<SchemaProps>): React.FunctionComponent;

    export default function Form(props: React.PropsWithChildren<FormProps>): React.FunctionComponent;

    export function getDefaultTemplate(): FormTemplate;

    export function getDefaultWidgets(): Widgets;

}