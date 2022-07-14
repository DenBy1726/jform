import React, {createContext, PropsWithChildren, useMemo, useState} from "react";
import Schema from "./schema";
import {isEqual, merge} from "lodash"
import getDefaultTemplate, {FormTemplate} from "./schema/templates";
import getDefaultWidgets, {Widgets} from "./schema/widgets";
import getDefaults, {applyDefaults, canonizeDefaults, computeInitials, Defaults} from "./defaults";
import {JSONSchema7} from "json-schema";
import {useLifeCycle} from "./hooks";
import {ValidationSchema, ConfigSchema, EventSchema, JSchema, ReadSchema, RulesSchema} from "types";


export interface FormProps {
    data: string,
    schema: JSONSchema7,
    configSchema?: ConfigSchema,
    readSchema?: ReadSchema,
    validationSchema?: ValidationSchema,
    eventSchema?: EventSchema,
    template?: FormTemplate,
    widgets?: Widgets,
    errors?: string[],
    rulesSchema?: RulesSchema,
    defaults?: Defaults,
    schemaInitialized?: (arg: JSchema & { data: any }) => void,
    onChange?: (arg: any) => void,
    onBlur?: () => void,
    onFocus?: () => void,
    onSubmit?: (arg: any) => void
}


// @ts-ignore
export const JFormContext = createContext<{ template: FormTemplate, widgets: Widgets, schema: JSONSchema7, defaults: Defaults }>({});

export default function Form(props: PropsWithChildren<FormProps>) {
    let {template, widgets, defaults = {}, schemaInitialized, errors} = props;

    const [data, setData] = useState(props.data);
    const [schema, setSchema] = useState(props.schema || {});
    const [configSchema, setConfigSchema] = useState(props.configSchema || {});
    const [readSchema, setReadSchema] = useState(props.readSchema || {});
    const [eventSchema, setEventSchema] = useState(props.eventSchema || {});

    const computedTemplate = useMemo(() => merge(getDefaultTemplate(), template), [template]);
    const computedWidgets = useMemo(() => merge(getDefaultWidgets(), widgets), [widgets]);
    const computedDefaults = useMemo(() => canonizeDefaults(merge(getDefaults(), defaults)), [defaults]);

    const onBlur = () => props.onBlur && props.onBlur();
    const onFocus = () => props.onFocus && props.onFocus();
    const onChange = (value: any) => {
        if (isEqual(value, data)) {
            return;
        }
        if (props.onChange) {
            props.onChange(value)
        }
        updateData(value)
    }

    const onSubmit = () => {
        props?.onSubmit?.(data);
    }

    const extendSchemas = () => {
        const applied = applyDefaults({...props}, computedDefaults);
        const dataWithDefaults = computeInitials(applied.schema as JSONSchema7, applied.schema as JSONSchema7, data);
        setData(dataWithDefaults);
        setSchema(applied.schema || {});
        setConfigSchema(applied.configSchema || {});
        setReadSchema(applied.readSchema || {});
        setEventSchema(applied.eventSchema || {});
        if (schemaInitialized) {
            schemaInitialized({...applied, data});
        }
    }

    const updateData = (data: any) => {
        setData(data)
    };


    const [didMount, didUpdate] = useLifeCycle();
    const [, didUpdateData] = useLifeCycle();

    //@ts-ignore
    didMount(extendSchemas);
    didUpdate(extendSchemas, [props.schema, props.configSchema]);
    didUpdateData(() => updateData(props.data), [props.data])


    return <JFormContext.Provider
        value={{template: computedTemplate, widgets: computedWidgets, schema, defaults: computedDefaults}}>
        <Schema data={data} schema={schema || {}} configSchema={configSchema} readSchema={readSchema}
                eventSchema={eventSchema} errors={errors} onBlur={onBlur} onFocus={onFocus} onChange={onChange}/>
        {props.onSubmit && <button onClick={onSubmit}>Submit</button>}
    </JFormContext.Provider>
}
