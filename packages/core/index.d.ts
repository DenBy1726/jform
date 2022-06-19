declare module '@jform/core' {
    import * as React from 'react';
    import {JSONSchema7, JSONSchema7Definition, JSONSchema7Type, JSONSchema7TypeName} from 'json-schema';


    export interface FieldStateCommonFormTemplate {
        loading: React.FunctionComponent,
        view: React.FunctionComponent
    }

    export interface FieldCommonFormTemplate {
        layout: React.FunctionComponent,
        title: React.FunctionComponent,
        description: React.FunctionComponent,
        help: React.FunctionComponent,
        error: React.FunctionComponent,
        state: FieldStateCommonFormTemplate
    }

    export interface CommonFormTemplate {
        field: FieldCommonFormTemplate,
        button: React.FunctionComponent,
        tip: React.FunctionComponent,
        error: React.FunctionComponent,
        actions: React.FunctionComponent,
    }

    export interface JsonTypeFormTemplate extends FieldCommonFormTemplate {
        format: { [k: string]: string | object }
    }

    export interface FormTemplate {
        common: CommonFormTemplate
        type?: { [k in JSONSchema7TypeName]: JsonTypeFormTemplate },
        button?: object
    }

    export interface SchemaProps {
        data: string;
        schema: JSONSchema7;
        template?: FormTemplate;

    }

    export interface FormProps extends SchemaProps {
    }

    export class Form extends React.Component<FormProps> {
    }


    export class Schema extends React.Component<SchemaProps> {
    }

}