import React, {ReactElement} from "react";
import {BooleanWidgetProps} from "../widgets";
import {TypeProps} from "../../schema/types";
import {getOptions, schemaRequiresTrueValue} from "@jform/utils/index";
import {JSONSchema7} from "json-schema";
import {ConfigSchema} from "@jform/core";

const getBooleanOptions = (schema: JSONSchema7, configSchema: ConfigSchema) => {
    if (Array.isArray(schema.oneOf)) {
        return getOptions({
            oneOf: schema.oneOf.map((option) => ({
                //@ts-ignore
                ...option, title: option.title || (option.const === true ? "Yes" : "No"),
            })),
        });
    } else {
        return getOptions({
            enum: schema.enum || [true, false]
        }, {
            enumNames:
                configSchema?.enumNames ||
                (schema.enum && schema.enum[0] === false
                        ? ["No", "Yes"]
                        : ["Yes", "No"]
                )
        });
    }
};

const BooleanField = (props: TypeProps): ReactElement<BooleanWidgetProps, any> => {
    const {
        schema,
        configSchema = {},
        data,
        disabled,
        autofocus,
        errors,
        widget: Widget,
        onBlur,
        onFocus,
        onChange,
        events
    } = props;

    let options = getBooleanOptions(schema, configSchema);

    const {examples} = schema;
    const {placeholder, className, id, style, theme} = configSchema;

    const widgetProps = {
        options,
        autofocus,
        schema,
        required: schemaRequiresTrueValue(schema),
        configSchema,
        disabled,
        value: data,
        onChange,
        onBlur,
        onFocus,
        errors,
        placeholder,
        className,
        id,
        style,
        events,
        examples,
        theme
    }


    return (
        //@ts-ignore
        <Widget {...widgetProps}/>
    );
}

export default BooleanField;