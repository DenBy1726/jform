declare module '@jform/core' {
    import * as React from 'react';
    import type * as CSS from 'csstype';
    import {JSONSchema7} from 'json-schema';
    import {
        FieldStaticInfoProps,
        TitleProps,
        DescriptionProps,
        HelpProps,
        ErrorProps,
        FormTemplate,
        FieldLayoutProps
    } from "form/schema/templates/";

    import {Defaults} from 'form/defaults';
    import {WidgetProps, Widgets} from 'form/schema/widgets';
    import {FormProps} from "form/Form";

    export interface KeysSchema {
        [name: `$${string}`]: any;
    }

    export interface HtmlConfigurable {
        className?: string,
        style?: CSS.Properties,
        id?: string,
    }

    export interface FieldLayout extends HtmlConfigurable {
        errorClassName?: string
    }

    export interface FieldStaticInfo<Text, T> extends HtmlConfigurable {
        text?: Text | ((arg: T) => Text),
        display?: boolean
        template?: React.FunctionComponent<T>,
    }

    export interface FieldTitle extends FieldStaticInfo<string, TitleProps> {
        required?: FieldStaticInfoProps<string, TitleProps>
    }

    export interface FieldError extends FieldStaticInfo<string[], ErrorProps> {
        errorClassName?: string
    }

    export interface FieldHidden extends HtmlConfigurable {
        enable?: boolean
    }

    export interface Widget {
        type: string | React.FunctionComponent<WidgetProps<any>>
    }


    export interface ConfigSchema extends KeysSchema, HtmlConfigurable {
        layout?: FieldLayout | React.FunctionComponent<FieldLayoutProps>,
        field?: React.FunctionComponent,
        title?: FieldTitle | string | ((arg: any) => string),
        description?: FieldStaticInfo<string, DescriptionProps> | string | ((arg: any) => string),
        help?: FieldStaticInfo<string, HelpProps> | string | ((arg: any) => string),
        error?: FieldError | string[] | ((arg: any) => string[]),
        hidden?: FieldHidden | boolean,
        disabled?: boolean,
        autofocus?: boolean,
        enumNames?: string[],
        placeholder?: string,
        widget?: string | React.FunctionComponent<WidgetProps<any>> | Widget,
        disabledOptions?: any[],
        empty?: any
    }

    export interface ReadSchema extends KeysSchema {
        always?: boolean
        href?: string,
        widget?: string
    }

    export interface ValidationSchema extends KeysSchema {
    }

    export interface EventSchema extends KeysSchema {
        onChange?: Function,
        onBlur?: Function,
        onFocus?: Function
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

    export default function Form(props: React.PropsWithChildren<FormProps>): React.FunctionComponent;
    export function getDefaultTemplate(): FormTemplate;
    export function getDefaultWidgets(): Widgets;
    export function getDefaults(): Defaults;

}