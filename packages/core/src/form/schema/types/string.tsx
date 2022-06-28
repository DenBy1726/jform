import React, {ReactElement, useContext} from "react";
import {JFormContext} from "../../Form";
import {TypeProps} from "./index";
import {StringWidgetProps} from "../widgets/index";
import {getOptions, getWidget, isSelect} from "@jform/utils/index";
import {EventSchema} from "@jform/core";

const processValue = (value: string, empty?: string): string | undefined => {
    if (value === "") {
        return empty;
    } else {
        return value;
    }
}

const wrapEvent = (event: Function, userHandler?: Function, empty?: string): ((arg: any) => void) => {
    const processedEvent = (value: string) => event(processValue(value, empty));
    if (userHandler) {
        return (value: string) => {
            userHandler(value);
            processedEvent(value);
        }
    } else {
        return processedEvent;
    }
};

const wrapNoArgEvent = (event: Function, userHandler?: Function): Function => {
    if (userHandler) {
        return () => {
            userHandler();
            event();
        }
    } else {
        return event;
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
        type,
        onBlur,
        onFocus,
        onChange
    } = props;
    const {widgets} = useContext(JFormContext);

    let options;
    if (isSelect(schema)) {
        options = getOptions<string>(schema, configSchema);
    }

    const {examples} = schema;

    let {onChange: onChangeEvent, onBlur: onBlurEvent, onFocus: onFocusEvent, ...events} = Object.keys(eventSchema)
        .filter(key => !key.startsWith("$"))
        .reduce((obj, key) => {
            //@ts-ignore
            obj[key] = eventSchema[key];
            return obj;
        }, {}) as EventSchema;

    let _onChange = wrapEvent(onChange, onChangeEvent, configSchema?.empty);
    let _onBlur = wrapNoArgEvent(onBlur, onBlurEvent);
    let _onFocus = wrapNoArgEvent(onFocus, onFocusEvent);

    const {placeholder, disabledOptions, className, id, style} = configSchema;

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
        placeholder,
        className,
        id,
        style,
        events,
        examples
    }

    let Widget;
    if (typeof type === 'string') {
        Widget = getWidget<StringWidgetProps>("string", type, widgets);
    } else {
        Widget = type;
    }

    return (
        //@ts-ignore
        <Widget {...widgetProps}/>
    )

}

export default StringField;