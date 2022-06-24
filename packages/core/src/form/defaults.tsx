import {Defaults, JSchema, Widgets} from "@jform/core";
import {cloneDeep} from "lodash";

const strOrFunc = (arg: any): boolean => {
    return typeof arg === "string" || typeof arg === "function";
}

const arrayOrFunc = (arg: any): boolean => {
    return Array.isArray(arg) || typeof arg === "function";
}

// @ts-ignore
// @ts-ignore
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
                widget: {
                    className: "form-control string-field"
                }
            }
        }
    },
    widget: {
        string: {
            text: {
                configSchema: {
                    widget: {
                        className: "text-widget"
                    }
                }
            },
            select: {
                configSchema: {
                    widget: {
                        className: "select-widget"
                    }
                }
            }
        }
    },
    rules: [
        ({schema}) => schema?.enum && {configSchema: {type: "select"}}
    ]
};

export const frameworkRules: ((arg: JSchema) => JSchema | undefined)[] = [
    //@ts-ignore
    ({configSchema}) => strOrFunc(configSchema?.help) ? {configSchema: {help: {text: configSchema?.help}}} : undefined,
    //@ts-ignore
    ({configSchema}) => strOrFunc(configSchema?.description) ? {configSchema: {description: {text: configSchema?.description}}} : undefined,
    //@ts-ignore
    ({configSchema}) => strOrFunc(configSchema?.title) ? {configSchema: {title: {text: configSchema?.title}}} : undefined,
    //@ts-ignore
    ({configSchema}) => arrayOrFunc(configSchema?.error) ? {configSchema: {error: {text: configSchema?.error}}} : undefined,
    //@ts-ignore
    ({configSchema}) => configSchema?.hidden ? {configSchema: {hidden: {enable: true}}} : undefined
]

export default (): Widgets => cloneDeep(defaults);