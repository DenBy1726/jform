import React from "react"
import {cloneDeep} from "lodash";
import {Defaults} from "../defaults";
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
                className: "jform-field-layout",
                rootClassName: "jform-field-layout-root",
                errorClassName: "error-field",
                render: ({Title, Description, Children, Errors, Help}: any) => <>
                    <Title/>
                    <Description/>
                    <Children/>
                    <Errors/>
                    <Help/>
                </>
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
                layout: {
                    className: "string-field",
                }
            }
        },
        boolean: {
            configSchema: {
                widget: "checkbox",
                layout: {
                    className: "boolean-field"
                }
            }
        },
        object: {
            configSchema: {
                widget: "grid",
                title: {
                    tag: "legend"
                },
                layout: {
                    className: "object-field",
                }
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
        },
        boolean: {
            checkbox: {
                configSchema: {
                    className: "checkbox-widget",
                    layout: {
                        render: ({Title, Description, Children, Errors, Help}: any) => <>
                            <Description/>
                            <label>
                                <Children/>
                                <Title/>
                            </label>
                            <Errors/>
                            <Help/>
                        </>
                    }
                }
            }
        },
        object: {
            grid: {
                configSchema: {
                    className: "grid-widget",
                    layout: {
                        tag: "fieldset",
                        render: ({Title, Description, Children}: any) => <> <Title/> <Description/> <Children/> </>
                    }
                }
            }
        }
    },
    rules: [
        ({configSchema}) => configSchema?.enumNames ? {configSchema: {widget: "select"}} : undefined,
        ({schema}) => schema?.enum ? {configSchema: {widget: "select"}} : undefined
    ]
};

export const defaultRules: ((arg: JSchema) => JSchema | undefined)[] = [
    ({schema}) => !schema?.type ? {schema: {type: getSchemaType(schema || {})}} : undefined
]


export default (): Defaults => cloneDeep(defaults);