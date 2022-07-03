import {WidgetProps} from "form/schema/widgets";
import {JSONSchema7} from "json-schema";
import {ConfigSchema, EventSchema, ReadSchema} from "@jform/core";

interface ObjectItem {
    onChange: (arg: any) => void,
    onBlur: () => void,
    onFocus: () => void,
    schema: JSONSchema7,
    configSchema?: ConfigSchema,
    eventSchema?: EventSchema,
    readSchema?: ReadSchema,
    required: boolean,
    value: any,
    isAdditional: boolean
}

export interface ObjectWidgetProps extends WidgetProps<object> {
    properties?: { [k: string]: ObjectItem }
}