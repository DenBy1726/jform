import React, {createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState} from "react";
import Schema from "./schema";
import {ConfigSchema, Defaults, FormProps, FormTemplate, JSchema, Widgets} from "@jform/core";
import {isArray, isObject, merge, mergeWith} from "lodash"
import getDefaultTemplate from "./schema/templates";
import getDefaultWidgets from "./schema/widgets";
import getDefaults, {frameworkRules} from "./defaults";
import {JSONSchema7} from "json-schema";
import {getSchemaType, traverse} from "@jform/utils/index";

const customizer = (a: any, b: any): any => {
    if (isObject(a) && isObject(b)) {
        const aClasses = Object.keys(a).filter(x => x.includes("lassName"));
        const bClasses = Object.keys(b).filter(x => x.includes("lassName"));
        if (aClasses.length > 0 && bClasses.length > 0) {
            const merger = {...b};
            aClasses.forEach(x => {
                //@ts-ignore
                if (a[x] && b[x]) {
                    //@ts-ignore
                    merger[x] = a[x] + " " + b[x]
                }
            })
            return mergeWith(a, merger, customizer);
        }
    }
    if (isArray(a) && isObject(b)) {
        return a;
    }
    if (isObject(a) && isArray(b)) {
        return a;
    }
    return undefined;
}

const _applyDefaults = (_schema: JSchema, defaults: Defaults) => {
    let {schema, ...additional} = _schema;
    const rules = [...(defaults?.rules || []), ...frameworkRules];
    // @ts-ignore
    schema = traverse(schema as JSONSchema7, additional, (schema, other) => {
        return rules.map(x => x({schema, ...other})).reduce((a, b) => merge(a, b))
    });
    //@ts-ignore
    schema = traverse(schema as JSONSchema7, additional, (schema, other) => {
        let type = getSchemaType(schema);
        let mergeCases: any = {defined: {schema, ...other}, common: defaults.common};

        if (Array.isArray(type)) {
            type = type[0];
        }
        if (defaults?.type?.[type]) {
            const {schema: mergeSchema, configSchema = {}, ...mergeOther} = defaults.type[type] || {};
            mergeCases.type = {schema: mergeSchema, configSchema, ...mergeOther};

            const futureType = type || defaults.common?.schema?.type;
            const futureWidget = (other?.configSchema as ConfigSchema)?.type || configSchema.type;

            if (futureWidget && defaults.widget && defaults?.widget?.[futureType]?.[futureWidget]) {
                const {schema: mergeSchema, ...mergeOther} = defaults?.widget?.[futureType]?.[futureWidget] || {};
                mergeCases.widget = {schema: mergeSchema, ...mergeOther};
            }
        }
        ({schema, ...other} = Object.keys(mergeCases.defined)
            .map(x => ({
                    [x]: mergeWith({},
                        mergeCases?.common?.[x],
                        mergeCases?.type?.[x],
                        mergeCases?.widget?.[x],
                        mergeCases?.defined?.[x],
                        customizer
                    )
                }
            ))
            .reduce((a, b) => ({...a, ...b})));
        return {schema, ...other};
    })
    return {schema, ...additional};
};

const applyDefaults = (props: FormProps, defaults: Defaults) => {
    let {schema, configSchema, eventSchema, readSchema} = props;
    return _applyDefaults({schema, configSchema, eventSchema, readSchema}, defaults || {});
}

// @ts-ignore
export const JFormContext = createContext<{ template: FormTemplate, widgets: Widgets, schema: JSONSchema7 }>({});


const useLifeCycle = () => {
    const [init, setInit] = useState(false);
    const [loadingInit, setLoadingInit] = useState(false);


    const didMount = (handler: Function) => {
        if (!loadingInit) {
            setLoadingInit(true)
            handler();
        }
    }

    const didUpdate = useCallback((handler, deps) => {
        useEffect(() => {
            if (!init) {
                setInit(true);
            } else {
                handler();
            }
        }, deps);
    }, []);


    return [didMount, didUpdate]
};

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
