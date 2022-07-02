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
    import {ReactElement} from "react";

    export interface KeysSchema {
        [name: `$${string}`]: any;
    }

    export interface HtmlConfigurable {
        className?: string,
        style?: CSS.Properties,
        id?: string,
        tag?: string
    }

    export interface FieldLayout extends HtmlConfigurable {
        errorClassName?: string,
        rootClassName?: string
        template?: React.FunctionComponent<FieldLayoutProps>,
        render?: (arg: any) => ReactElement
    }

    export type Dynamic<T> = {
        [P in keyof T]?: T[P] | ((arg: any) => T[P]);
    };

    export interface FieldStaticInfo<Text, T> extends Dynamic<HtmlConfigurable> {
        text?: Text | ((arg: T) => Text),
        display?: boolean
        template?: React.FunctionComponent<T>,
    }

    export interface FieldTitle extends FieldStaticInfo<string, TitleProps> {
        required?: FieldStaticInfoProps<string>,
        useName?: boolean
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
        additionalProperties?: ConfigSchema,
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
        empty?: any,
        theme?: object,
        order?: string[]
    }

    export interface ReadSchema extends KeysSchema {
        additionalProperties?: ReadSchema,
        always?: boolean
        href?: string,
        widget?: string
    }

    export interface ValidationSchema extends KeysSchema {
    }

    export interface EventSchema extends KeysSchema {
        additionalProperties?: EventSchema,
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