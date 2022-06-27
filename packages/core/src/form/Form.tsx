import React, {createContext, PropsWithChildren, useMemo, useState} from "react";
import Schema from "./schema";
import {ConfigSchema, EventSchema, JSchema, ReadSchema, RulesSchema, ValidationSchema,} from "@jform/core";
import {merge} from "lodash"
import getDefaultTemplate, {FormTemplate} from "./schema/templates";
import getDefaultWidgets, {Widgets} from "./schema/widgets";
import getDefaults, {applyDefaults, Defaults} from "./defaults";
import {JSONSchema7} from "json-schema";
import {useLifeCycle} from "./hooks";


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
    schemaInitialized?: (arg: JSchema) => void
}


// @ts-ignore
export const JFormContext = createContext<{ template: FormTemplate, widgets: Widgets, schema: JSONSchema7 }>({});

export default function Form(props: PropsWithChildren<FormProps>) {
    let {data, template, widgets, defaults = {}, schemaInitialized, errors} = props;

    const computedTemplate = useMemo(() => merge(getDefaultTemplate(), template), [template]);
    const computedWidgets = useMemo(() => merge(getDefaultWidgets(), widgets), [widgets]);
    const computedDefaults = useMemo(() => merge(getDefaults(), defaults), [defaults]);

    const [schema, setSchema] = useState(props.schema || {});
    const [configSchema, setConfigSchema] = useState(props.configSchema || {});
    const [readSchema, setReadSchema] = useState(props.readSchema || {});
    const [eventSchema, setEventSchema] = useState(props.eventSchema || {});

    const extendSchemas = () => {
        const {schema, configSchema, eventSchema, readSchema} = applyDefaults(props, computedDefaults);
        setSchema(schema || {})
        setConfigSchema(configSchema || {});
        setReadSchema(readSchema || {});
        setEventSchema(eventSchema || {});
        if (schemaInitialized) {
            schemaInitialized({schema, configSchema, eventSchema, readSchema});
        }
    }

    const [didMount, didUpdate] = useLifeCycle();

    // @ts-ignore
    didMount(extendSchemas);
    didUpdate(extendSchemas, [props.schema, props.configSchema]);


    return <JFormContext.Provider
        value={{template: computedTemplate, widgets: computedWidgets, schema: schema}}>
        <Schema data={data} schema={schema} configSchema={configSchema} readSchema={readSchema}
                eventSchema={eventSchema} errors={errors}/>
    </JFormContext.Provider>
}
