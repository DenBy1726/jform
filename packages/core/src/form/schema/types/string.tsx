import React, {ReactElement} from "react";
import {TypeProps} from "./index";
import {StringWidgetProps} from "../widgets/index";
import {getOptions} from "@jform/utils/index";

const StringField = (props: TypeProps): ReactElement<StringWidgetProps, any> => {
    const {
        schema,
        configSchema = {},
        data,
        required,
        disabled,
        autofocus,
        errors,
        widget: Widget,
        onBlur,
        onFocus,
        onChange,
        events
    } = props;

    let options = getOptions<string>(schema, configSchema);

    const {examples} = schema;
    const {placeholder, disabledOptions, className, id, style, theme, widget} = configSchema;

    const widgetProps = {
        options,
        disabledOptions,
        autofocus,
        schema,
        configSchema,
        disabled,
        value: data,
        required,
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
        theme,
        widget
    }
    return (
        //@ts-ignore
        <Widget {...widgetProps}/>
    )

}

export default StringField;