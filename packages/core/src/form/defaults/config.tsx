import {cloneDeep} from "lodash";
import {Defaults} from "../defaults";
import {checkboxLayout} from "../schema/widgets/boolean";
import {getSchemaType} from "@jform/utils/index";
import {JSchema} from "@jform/core";


const defaults: Defaults = {
    common: {
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
            },
            className: "form-control"
        }
    },
    type: {
        string: {
            configSchema: {
                widget: "text",
                className: "string-field",
                empty: ""
            }
        },
        boolean: {
            configSchema: {
                widget: "checkbox",
                className: "boolean-field",
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
                    className: "select-widget",
                    empty: null
                }
            }
        },
        boolean: {
            checkbox: {
                configSchema: {
                    className: "checkbox-widget",
                    layout: checkboxLayout
                }
            }
        }
    },
    rules: [
        ({configSchema}) => configSchema?.enumNames  ? {configSchema: {widget: "select"}} : undefined,
        ({schema}) => schema?.enum  ? {configSchema: {widget: "select"}} : undefined
    ]
};

export const defaultRules: ((arg: JSchema) => JSchema | undefined)[] = [
    ({schema}) => !schema?.type ? {schema: {type: getSchemaType(schema || {})}} : undefined
]


export default (): Defaults => cloneDeep(defaults);