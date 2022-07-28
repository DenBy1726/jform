export default {
    common: {
        configSchema: {
            title: {
                style: {
                    fontWeight: 700
                }
            },
            layout: {
                render: [
                    {title: {}},
                    {children: {}},
                    {description: {}},
                    {help: {}},
                    {errors: {}}
                ],
                style: {
                    width: "100%",
                    paddingRight: "10px"
                }
            }
        }
    },
    type: {
        object: {
            configSchema: {
                title: {
                    style: {
                        marginBottom: "20px",
                        fontSize: "21px",
                        borderBottom: "1px solid #e5e5e5"
                    }
                }
            }
        },
        string: {
            configSchema: {
                className: "user-form-control"
            }
        },
        boolean: {
            configSchema: {
                layout: {
                    className: "user-boolean-layout"
                },
                style: {
                    width: "20px",
                    height: "20px"
                },
                title: {
                    style: {
                        fontWeight: 400,
                        cursor: "pointer",
                        marginLeft: "10px",
                        alignSelf: "end"
                    }
                }
            }
        }
    },
    widget: {
        object: {
            grid: {
                configSchema: {
                    widget: {
                        itemStyle: {
                            display: "flex",
                            alignItems: "flex-end"
                        }
                    }
                }
            }
        }
    }
}