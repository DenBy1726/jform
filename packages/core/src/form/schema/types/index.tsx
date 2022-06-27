import React, {FunctionComponent, PropsWithChildren} from "react"
import {JSONSchema7, JSONSchema7TypeName} from "json-schema";
import string from "./string";
import {ConfigSchema, EventSchema, FieldError, HtmlConfigurable} from "@jform/core";

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
    errors: FieldError,
    type: string
}

const types: Types = {
    string: string,
    number: () => <></>,
    integer: () => <></>,
    boolean: () => <></>,
    object: () => <></>,
    array: () => <></>,
    null: () => <></>
};

export default types;