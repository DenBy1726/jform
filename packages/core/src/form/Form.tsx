import React, {createContext, PropsWithChildren, useMemo, useState} from "react";
import Schema from "./schema";
import {isEqual} from "lodash"
import getDefaultTemplate, {FormTemplate} from "./schema/templates";
import getDefaultWidgets, {Widgets} from "./schema/widgets";
import getDefaults, {applyDefaults, canonizeDefaults, computeInitials, Defaults} from "./defaults";
import {JSONSchema7} from "json-schema";
import {useLifeCycle} from "./hooks";
import {ValidationSchema, ConfigSchema, EventSchema, JSchema, ReadSchema, RulesSchema} from "types";
import {mergeSchemas} from "@jform/utils";


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

export const extractSchemaFromProps = (props: FormProps | JSchema): Required<JSchema> => {
    const {
        schema = {},
        configSchema = {},
        readSchema = {},
        eventSchema = {},
        validationSchema = {},
        rulesSchema = []
    } = props;
    return {schema, configSchema, readSchema, eventSchema, validationSchema, rulesSchema}
}


// @ts-ignore
export const JFormContext = createContext<{ template: Partial<FormTemplate>, widgets: Partial<Widgets>, schema: JSONSchema7, defaults: Defaults }>({});

export default function Form(props: PropsWithChildren<FormProps>) {
    let {template = {}, widgets = {}, defaults = {}, schemaInitialized, errors} = props;

    const [data, setData] = useState(props.data);
    const [beforeDefaults, setBeforeDefaults] = useState<Required<JSchema>>(extractSchemaFromProps(props));
    const [jschema, setJschema] = useState<Required<JSchema>>(beforeDefaults);

    const computedTemplate = useMemo(() => mergeSchemas(getDefaultTemplate(), template), [template]);
    const computedWidgets = useMemo(() => mergeSchemas(getDefaultWidgets(), widgets), [widgets]);
    const computedDefaults = useMemo(() => canonizeDefaults(mergeSchemas(getDefaults(), defaults)), [defaults]);

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
        const initialSchema = extractSchemaFromProps(beforeDefaults);
        const jschema = applyDefaults(initialSchema, computedDefaults);
        const dataWithDefaults = computeInitials(jschema.schema as JSONSchema7, jschema.schema as JSONSchema7, data);
        setData(dataWithDefaults);
        setJschema(jschema);
        if (schemaInitialized) {
            schemaInitialized({...jschema, data});
        }
    }

    const updateData = (data: any) => {
        setData(data)
    };


    const [didMount, didUpdate] = useLifeCycle();
    const [, didUpdateData] = useLifeCycle();

    //@ts-ignore
    didMount(extendSchemas);
    didUpdate(() => {
        const jschema = extractSchemaFromProps(props);
        setBeforeDefaults(jschema)
    }, [props.schema, props.configSchema, props.defaults]);
    didUpdate(extendSchemas, [beforeDefaults]);
    didUpdateData(() => updateData(props.data), [props.data])


    return <div className="jform">
        <JFormContext.Provider
            value={{
                template: computedTemplate,
                widgets: computedWidgets,
                schema: jschema.schema,
                defaults: computedDefaults
            }}>
            <div className="jform-group">
                <Schema data={data} {...jschema} errors={errors} onBlur={onBlur} onFocus={onFocus} onChange={onChange}/>
            </div>
            {props.onSubmit && <button className="btn btn-info" onClick={onSubmit}>Submit</button>}
        </JFormContext.Provider>
    </div>
}
