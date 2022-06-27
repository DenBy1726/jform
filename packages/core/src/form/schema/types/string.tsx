import React, {ReactElement, useContext} from "react";
import {JFormContext} from "../../Form";
import {TypeProps} from "./index";
import {StringWidgetProps} from "../widgets/index";
import {getOptions, getWidget, isSelect} from "@jform/utils/index";

const processValue = (value: string, empty?: string): string | undefined => {
    return value === "" ? empty : value
}

const wrapEvent = (event?: Function, empty?: string): Function => {
    if (event) {
        return (value: string) => event(processValue(value, empty));
    } else {
        return () => {
        }
    }
};

const StringField = (props: TypeProps): ReactElement<StringWidgetProps, any> => {
    const {
        schema,
        configSchema = {},
        eventSchema = {},
        data,
        required,
        disabled,
        autofocus,
        errors,
        type
    } = props;
    const {widgets} = useContext(JFormContext);

    let options;
    if (isSelect(schema)) {
        options = getOptions<string>(schema, configSchema);
    }

    const {widget = {}} = configSchema;
    const {default: defaultValue} = schema;

    let {onChange, onBlur, onFocus} = eventSchema;

    let _onChange = wrapEvent(onChange);
    let _onBlur = wrapEvent(onBlur);
    let _onFocus = wrapEvent(onFocus);

    const {placeholder, empty, disabledOptions, className, id, style} = configSchema;

    const widgetProps = {
        options,
        disabledOptions,
        autofocus,
        schema,
        configSchema,
        disabled,
        value: data,
        required,
        onChange: _onChange,
        onBlur: _onBlur,
        onFocus: _onFocus,
        errors,
        empty,
        placeholder,
        className,
        id,
        style,
        defaultValue: defaultValue as string
    }


    let Widget;
    if (typeof widget === 'function') {
        Widget = widget;
    } else {
        Widget = getWidget<StringWidgetProps>("string", type, widgets);
    }

    return (
        <Widget {...widgetProps}/>
    )

}

export default StringField;