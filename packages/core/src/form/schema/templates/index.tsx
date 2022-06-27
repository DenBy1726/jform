import React from "react"
import {HtmlConfigurable} from "@jform/core";
import layout, {FieldLayoutProps} from "./layout";
import title, {TitleProps} from "./title";
import {cloneDeep} from "lodash";
import help, {HelpProps} from "./help";
import description, {DescriptionProps} from "./description";
import error, {ErrorProps} from "./error";
import {JSONSchema7TypeName} from "json-schema";

interface FieldStaticInfoProps<Text, T> extends HtmlConfigurable {
    text?: Text | ((arg: T) => Text)
}

interface FormTemplate {
    common: CommonFormTemplate,
    type?: { [k in JSONSchema7TypeName]: JsonTypeFormTemplate },
    button?: object
}

interface FieldCommonFormTemplate {
    layout: React.FunctionComponent<FieldLayoutProps>,
    title: React.FunctionComponent<TitleProps>,
    description: React.FunctionComponent<DescriptionProps>,
    help: React.FunctionComponent<HelpProps>,
    error: React.FunctionComponent<ErrorProps>,
    state: FieldStateCommonFormTemplate
}


interface CommonFormTemplate {
    field: FieldCommonFormTemplate,
    button: React.FunctionComponent,
    tip: React.FunctionComponent,
    error: React.FunctionComponent,
    actions: React.FunctionComponent
}


interface FieldStateCommonFormTemplate {
    loading: React.FunctionComponent,
    view: React.FunctionComponent
}

interface JsonTypeFormTemplate extends FieldCommonFormTemplate {
    format: { [k: string]: string | object }
}


const defaultTemplate: FormTemplate = {
    common: {
        field: {
            layout: layout,
            title: title,
            description: description,
            help: help,
            error: error,
            state: {
                view: ({children}) => <>{children}</>,
                loading: ({children}) => <>{children}</>,
            }
        },
        actions: ({children}) => <>{children}</>,
        button: ({children}) => <>{children}</>,
        error: ({children}) => <>{children}</>,
        tip: ({children}) => <>{children}</>
    }
}

export {
    FieldStaticInfoProps,
    FormTemplate,
    DescriptionProps,
    ErrorProps,
    HelpProps,
    TitleProps
}

export default (): FormTemplate => cloneDeep(defaultTemplate);