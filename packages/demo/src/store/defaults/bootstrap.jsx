import React from "react"

export default {
    common: {
        configSchema: {
            layout: {
                className: "form-group",
                style: {
                    width: "100%",
                    paddingRight: "10px"
                }
            }
        }
    },
    type: {
        string: {
            configSchema: {
                className: 'form-control'
            }
        }
    },
    widget: {
        boolean: {
            checkbox: {
                configSchema: {
                    title: {
                        tag: "span"
                    },
                    layout: {
                        className: 'checkbox'
                    }
                }
            }
        }
    }
};