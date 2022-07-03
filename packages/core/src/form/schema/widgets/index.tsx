import {cloneDeep} from "lodash";
import text from "./string/text";
import select from "./string/select";
import {FunctionComponent} from "react";
import {JSONSchema7, JSONSchema7TypeName} from "json-schema";
import {ConfigSchema, HtmlConfigurable} from "@jform/core";
import {ErrorProps} from "../templates";
import {StringWidgetProps} from "./string"
import {BooleanWidgetProps} from "./boolean"
import checkbox from "./boolean/checkbox";
import grid from "./object/grid";

export interface Widgets extends Record <JSONSchema7TypeName, { [v: string]: FunctionComponent<WidgetProps<any>> }> {
}

export interface WidgetProps<T> extends HtmlConfigurable {
    autofocus?: boolean,
    schema: JSONSchema7,
    configSchema?: ConfigSchema,
    disabled: boolean,
    required: boolean,
    onChange: (arg: T) => void,
    onBlur: () => void,
    onFocus: () => void,
    errors: ErrorProps,
    value: T,
    placeholder?: string,
    examples?: any[],
    events: { [k: string]: Function },
    theme: object,
    widget: object
}

const defaultWidgets: Widgets = {
    string: {
        text: text,
        select: select
    },
    number: {},
    integer: {},
    boolean: {
        checkbox: checkbox,
        select: select
    },
    object: {
        grid: grid
    },
    array: {},
    null: {}
};

export {StringWidgetProps, BooleanWidgetProps}

export default (): Widgets => cloneDeep(defaultWidgets);