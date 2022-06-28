import {cloneDeep} from "lodash";
import {Defaults} from "form/defaults/index";


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
                widget: "text",
                className: "form-control string-field",
                empty: ""
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
        }
    },
    rules: [
        ({schema}) => schema?.enum && {configSchema: {widget: "select"}}
    ]
};


export default (): Defaults => cloneDeep(defaults);