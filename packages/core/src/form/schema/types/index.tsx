import React, {FunctionComponent, PropsWithChildren} from "react"
import {JSONSchema7, JSONSchema7TypeName} from "json-schema";
import string from "./string";
import {ConfigSchema, EventSchema, FieldError, HtmlConfigurable, ReadSchema} from "types";
import {WidgetProps} from "form/schema/widgets";
import boolean from "./boolean";
import object from "./object";

export interface Types extends Record<JSONSchema7TypeName, FunctionComponent<PropsWithChildren<TypeProps>>> {
}

export interface TypeProps extends HtmlConfigurable {
    schema: JSONSchema7,
    configSchema?: ConfigSchema,
    disabled: boolean,
    autofocus: boolean,
    data: any,
    required: boolean,
    eventSchema?: EventSchema,
    readSchema?: ReadSchema,
    errors: FieldError,
    widget: React.FunctionComponent<WidgetProps<any>>,
    onChange: (arg: any) => void,
    onBlur: () => void,
    onFocus: () => void,
    events: { [k: string]: Function },
    name?: string
}

const types: Types = {
    string: string,
    number: () => <></>,
    integer: () => <></>,
    boolean: boolean,
    object: object,
    array: () => <></>,
    null: () => <></>
};

export default types;