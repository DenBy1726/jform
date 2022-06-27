import {cloneDeep} from "lodash";
import text from "./string/text";
import select from "./string/select";
import {FunctionComponent} from "react";
import {JSONSchema7, JSONSchema7TypeName} from "json-schema";
import {ConfigSchema, HtmlConfigurable} from "@jform/core";
import {ErrorProps} from "../templates";
import {StringWidgetProps} from "./string"

export interface Widgets extends Record <JSONSchema7TypeName, { [v: string]: FunctionComponent<WidgetProps<any>> }> {
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
    errors: ErrorProps,
    value: T,
    empty?: T,
    placeholder?: string,
    defaultValue?: string,
    examples?: any[]
}

const defaultWidgets: Widgets = {
    string: {
        text: text,
        select: select
    },
    number: {},
    integer: {},
    boolean: {},
    object: {},
    array: {},
    null: {}
};

export {StringWidgetProps}

export default (): Widgets => cloneDeep(defaultWidgets);