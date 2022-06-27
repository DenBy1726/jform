import {ConfigSchema, JSchema} from "@jform/core";
import {JSONSchema7, JSONSchema7TypeName} from "json-schema";
import {cloneDeep, merge} from "lodash";
import {traverse, getSchemaType, mergeSchemas} from "@jform/utils/index";
import {FormProps} from "./Form";

const strOrFunc = (arg: any): boolean => {
    return typeof arg === "string" || typeof arg === "function";
}

const arrayOrFunc = (arg: any): boolean => {
    return Array.isArray(arg) || typeof arg === "function";
}

export interface Defaults {
    common?: JSchema,
    type?: { [k in JSONSchema7TypeName]?: JSchema },
    widget?: { [k in JSONSchema7TypeName]?: { [v: string]: JSchema } },
    rules?: ((arg: JSchema) => JSchema | undefined)[]
}


const defaults: Defaults = {
    common: {
        schema: {
            type: "string"
        },
        configSchema: {
            title: {
                className: "jform-title",
                required: {
                    className: "jform-label-required",
                    text: "*"
                }
            },
            description: {
                className: "jform-description"
            },
            error: {
                className: "jform-errors",
                errorClassName: "jform-error"
            },
            help: {
                className: "jform-help"
            },
            layout: {
                className: "jform-field-layout-root",
                errorClassName: "error-field"
            },
            hidden: {
                className: "jform-hidden"
            }
        }
    },
    type: {
        string: {
            configSchema: {
                type: "text",
                className: "form-control string-field"
            }
        }
    },
    widget: {
        string: {
            text: {
                configSchema: {
                    className: "text-widget"
                }
            },
            select: {
                configSchema: {
                    className: "select-widget"
                }
            }
        }
    },
    rules: [
        ({schema}) => schema?.enum && {configSchema: {type: "select"}}
    ]
};

const frameworkRules: ((arg: JSchema) => JSchema | undefined)[] = [
    ({configSchema}) => strOrFunc(configSchema?.help) ? {configSchema: {help: {text: configSchema?.help}}} as JSchema : undefined,
    ({configSchema}) => strOrFunc(configSchema?.description) ? {configSchema: {description: {text: configSchema?.description}}} as JSchema : undefined,
    ({configSchema}) => strOrFunc(configSchema?.title) ? {configSchema: {title: {text: configSchema?.title}}} as JSchema : undefined,
    ({configSchema}) => arrayOrFunc(configSchema?.error) ? {configSchema: {error: {text: configSchema?.error}}} as JSchema : undefined,
    ({configSchema}) => configSchema?.hidden ? {configSchema: {hidden: {enable: true}}} as JSchema : undefined
]

const _applyDefaults = (_schema: JSchema, defaults: Defaults): JSchema => {
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
                    [x]: mergeSchemas(
                        mergeCases?.common?.[x],
                        mergeCases?.type?.[x],
                        mergeCases?.widget?.[x],
                        mergeCases?.defined?.[x],
                    )
                }
            ))
            .reduce((a, b) => ({...a, ...b})));
        return {schema, ...other};
    })
    return {schema, ...additional};
};

export const applyDefaults = (props: FormProps, defaults: Defaults): JSchema => {
    let {schema, configSchema, eventSchema, readSchema} = props;
    return _applyDefaults({schema, configSchema, eventSchema, readSchema}, defaults || {});
}

export default (): Defaults => cloneDeep(defaults);