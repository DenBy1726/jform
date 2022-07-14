import React from "react"
import {cloneDeep} from "lodash";
import {Defaults} from "../defaults";
import {getSchemaType} from "@jform/utils";
import {JSchema} from "types";


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
                render: [
                    {
                        title: {},
                        children: {}
                    },
                    {
                        description: {}
                    },
                    {
                        help: {}
                    },
                    {
                        errors: {}
                    }
                ]
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
                        render: ({Title, Description, children, Errors, Help}: any) => <>
                            <Description/>
                            <label>
                                {children}
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
                    widget: {
                        type: "grid",
                        itemClassName: "grid-item",
                        additionalItemClassName: "additional-item",
                        actionsClassName: "actions-item",
                        actionClassName: "action-item",
                        addKeyButton: "add-key-button",
                        removeKeyButton: "remove-key-button",
                        layout: {
                            md: 12
                        }
                    },
                    layout: {
                        tag: "fieldset",
                        render: [
                            {
                                title: {}
                            },
                            {
                                description: {}
                            },
                            {
                                children: {}
                            }
                        ]
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
    ({schema}) => schema !== true && !schema?.type ? {schema: {type: getSchemaType(schema || {})}} : undefined
]


export default (): Defaults => cloneDeep(defaults);