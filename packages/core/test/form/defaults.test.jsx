import {createFormComponent, createSandbox} from "../test_utils";
import {expect} from "chai";
import {Simulate} from "react-dom/test-utils";

describe("defaults", () => {

    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it("should modify schema by type", done => {
        const schema = {
            "type": "string"
        };

        createFormComponent({
            schema, defaults: {
                type: {
                    string: {
                        configSchema: {
                            type: "text"
                        }
                    }
                }
            }, schemaInitialized: ({configSchema}) => {
                expect(configSchema.widget.type).to.equal("text")
                done();
            }
        });
    })

    it("should modify schema by type and widget (1)", done => {
        const schema = {
            type: "string"
        };
        const configSchema = {
            widget: "text"
        }

        createFormComponent({
            schema, configSchema, defaults: {
                widget: {
                    string: {
                        text: {
                            configSchema: {
                                className: "bar"
                            }
                        }
                    }
                }
            }, schemaInitialized: ({configSchema}) => {
                expect(configSchema.className).to.equal("form-control bar")
                done();
            }
        });
    })

    it("should modify schema by type and widget (2)", done => {
        const schema = {
            "type": "string"
        };

        createFormComponent({
            schema, defaults: {
                type: {
                    string: {
                        configSchema: {
                            type: "foo"
                        }
                    }
                },
                widget: {
                    string: {
                        foo: {
                            configSchema: {
                                type: "text"
                            }
                        }
                    }
                }
            }, schemaInitialized: ({configSchema}) => {
                expect(configSchema.widget.type).to.equal("text")
                done();
            }
        });
    })

    it("should not override user defined", done => {
        const schema = {
            type: "string"
        };
        const configSchema = {
            widget: "text"
        }

        createFormComponent({
            schema, configSchema, defaults: {
                type: {
                    string: {
                        configSchema: {
                            type: "foo"
                        }
                    }
                },
                widget: {
                    string: {
                        text: {
                            configSchema: {
                                type: "bar"
                            }
                        }
                    }
                }
            }, schemaInitialized: ({configSchema}) => {
                expect(configSchema.widget.type).to.equal("text")
                done();
            }
        });
    });

    it("should support json schema mutation", done => {
        const schema = {
            "type": "string"
        };

        createFormComponent({
            schema, defaults: {
                type: {
                    string: {
                        schema: {
                            pattern: "foo"
                        }
                    }
                }
            }, schemaInitialized: ({schema}) => {
                expect(schema.pattern).to.equal("foo")
                done();
            }
        });
    })

    //TODO: array
    //
    // it("should initialize nested properties", done => {
    //     const schema = {
    //         type: "object",
    //         properties: {
    //             foo: {
    //                 type: "array",
    //                 items: {
    //                     type: "object",
    //                     properties: {
    //                         baz: {
    //                             type: "string"
    //                         }
    //                     }
    //                 }
    //             },
    //             bar: {
    //                 type: "string"
    //             }
    //         }
    //     };
    //
    //     createFormComponent({
    //         schema, defaults: {
    //             type: {
    //                 string: {
    //                     configSchema: {
    //                         className: "foo"
    //                     }
    //                 }
    //             }
    //         }, schemaInitialized: ({configSchema}) => {
    //             expect(configSchema.$foo.$baz.className).to.equal("form-control foo text-widget")
    //             expect(configSchema.$bar).not.to.be.undefined
    //             done()
    //         }
    //     });
    // })

    //TODO: array
    //
    // it("should support common rules", done => {
    //     const schema = {
    //         type: "object",
    //         properties: {
    //             foo: {
    //                 type: "array",
    //                 items: {
    //                     type: "object",
    //                     properties: {
    //                         baz: {}
    //                     }
    //                 }
    //             },
    //             bar: {}
    //         }
    //     };
    //
    //     createFormComponent({
    //         schema, defaults: {
    //             common: {
    //                 schema: {
    //                     type: "string"
    //                 }
    //             }
    //         }, schemaInitialized: ({schema}) => {
    //             expect(schema.properties.foo.items.properties.baz.type).to.equal("string")
    //             expect(schema.properties.bar.type).to.equal("string")
    //             done()
    //         }
    //     });
    // })

    it("should resolve in refs", done => {
        const schema = {
            $ref: "#/definitions/extraNestedRef",
            definitions: {
                stringRef: {
                    type: 'string'
                },
                nestedRef: {
                    $ref: '#/definitions/stringRef'
                },
                extraNestedRef: {
                    $ref: '#/definitions/nestedRef',
                    title: 'foo',
                }
            }
        };

        createFormComponent({
            schema, defaults: {
                common: {
                    schema: {
                        type: "string"
                    }
                },
                type: {
                    string: {
                        configSchema: {
                            type: "text"
                        }
                    }
                },
                widget: {
                    string: {
                        text: {
                            schema: {
                                format: "bar"
                            }
                        }
                    }
                }
            }, schemaInitialized: ({schema, configSchema}) => {
                expect(schema.format).to.equal("bar")
                expect(configSchema.widget.type).to.equal("text")
                done()
            }
        });
    })

    it("should support user defined rules", done => {
        const schema = {
            enum: []
        };

        createFormComponent({
            schema, defaults: {
                rules: [({schema}) => schema?.enum && {configSchema: {widget: "select"}}]
            }, schemaInitialized: ({configSchema}) => {
                expect(configSchema.widget.type).to.equal("select")
                done()
            }
        });
    })

    it("should support defaults for user defined rules", done => {
        const schema = {
            enum: []
        };

        createFormComponent({
            schema, defaults: {
                common: {
                    schema: {
                        type: "string"
                    }
                },
                widget: {
                    string: {
                        select: {
                            schema: {
                                title: "bar"
                            }
                        }
                    }
                },
                rules: [({schema}) => schema?.enum && {configSchema: {widget: "select"}}]
            }, schemaInitialized: ({schema, configSchema}) => {
                expect(configSchema.widget.type).to.equal("select")
                expect(schema.title).to.equal("bar")
                done()
            }
        });
    })

    describe("framework defaults", () => {
        it("default type is string", done => {
            const schema = {};

            createFormComponent({
                schema, schemaInitialized: ({schema}) => {
                    expect(schema.type).to.equal("string")
                    done()
                }
            });
        })

        it("default string widget is text", done => {
            const schema = {};

            createFormComponent({
                schema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.widget.type).to.equal("text")
                    done()
                }
            });
        })

        it("default enum widget is select", done => {
            const schema = {enum: []};

            createFormComponent({
                schema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.widget.type).to.equal("select")
                    done()
                }
            });
        })

        it("canonization for widget", done => {
            const configSchema = {widget: "text"};

            createFormComponent({
                configSchema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.widget.type).to.equal("text")
                    done()
                }
            });
        })

        it("canonization for title", done => {
            const configSchema = {title: "foo"};

            createFormComponent({
                configSchema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.title.text).to.equal("foo")
                    done()
                }
            });
        })

        it("canonization for description", done => {
            const configSchema = {description: "foo"};

            createFormComponent({
                configSchema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.description.text).to.equal("foo")
                    done()
                }
            });
        })

        it("canonization for help", done => {
            const configSchema = {help: "foo"};

            createFormComponent({
                configSchema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.help.text).to.equal("foo")
                    done()
                }
            });
        })

        it("canonization for errors", done => {
            const configSchema = {error: ["foo"]};

            createFormComponent({
                configSchema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.error.text.length).to.equal(1)
                    done()
                }
            });
        })

        it("default title class name", () => {
            const schema = {title: "foo"};

            const {node} = createFormComponent({schema});
            expect(node.getElementsByClassName("jform-title").length).to.equal(1)

        })

        it("default description class name", () => {
            const schema = {description: "foo"};

            const {node} = createFormComponent({schema});
            expect(node.getElementsByClassName("jform-description").length).to.equal(1)

        })

        it("default class for errors", () => {
            const schema = {};

            const {node} = createFormComponent({schema, errors: [1]});
            expect(node.getElementsByClassName("jform-errors").length).to.equal(1)

        })

        it("default class for error item", () => {
            const schema = {};

            const {node} = createFormComponent({schema, errors: [1, 2]});
            expect(node.getElementsByClassName("jform-error").length).to.equal(2)

        })

        it("default class for help", () => {
            const configSchema = {help: "foo"};

            const {node} = createFormComponent({configSchema});
            expect(node.getElementsByClassName("jform-help").length).to.equal(1)

        })

        it("default class and mark for required", () => {
            const configSchema = {
                title: {
                    text: "Foo",
                    required: {
                        display: true
                    }
                }
            };

            const {node} = createFormComponent({configSchema});
            expect(node.getElementsByClassName("jform-label-required")[0].textContent).to.equal("*")
        })

        it("default class for layout", () => {
            const configSchema = {};

            const {node} = createFormComponent({configSchema});
            expect(node.getElementsByClassName("jform-field-layout-root").length).to.equal(1)
        })

        it("default class for hidden if error", () => {
            const configSchema = {};

            const {node} = createFormComponent({configSchema, errors: ["1"]});
            expect(node.getElementsByClassName("error-field").length).to.equal(1)
        })

        it("default class for hidden", () => {
            const configSchema = {hidden: true};

            const {node} = createFormComponent({configSchema});
            expect(node.getElementsByClassName("jform-hidden").length).to.equal(1)
        })

        it("default widget for boolean is checkbox", done => {
            const schema = {type: "boolean"};

            const {node} = createFormComponent({
                schema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.widget.type).to.equal("checkbox");
                    done();
                }
            });
        })

        it("default class for boolean", () => {
            const schema = {type: "boolean"};

            const {node} = createFormComponent({schema});
            expect(node.getElementsByClassName("boolean-field").length).to.equal(1)
        })

        it("default class for select widget", () => {
            const schema = {enum: ["foo", "bar"]};

            const {node} = createFormComponent({schema});
            expect(node.getElementsByClassName("select-widget").length).to.equal(1)
        })

        it("default class for checkbox widget", () => {
            const schema = {type: "boolean"};

            const {node} = createFormComponent({schema});
            expect(node.getElementsByClassName("checkbox-widget").length).to.equal(1)
        })

        it("default customized layout for checkbox widget", () => {
            const schema = {type: "boolean"};

            const {node} = createFormComponent({schema});
            expect(node.querySelectorAll("label > input").length).to.equal(1)
        })

        it("default layout for grid", done => {
            const schema = {type: "object"};

            const {node} = createFormComponent({
                schema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.widget.layout).to.eql({md: 12});
                    done();
                }
            });
        })

        it("default field layout for grid", done => {
            const schema = {type: "object"};

            const {node} = createFormComponent({
                schema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.layout.render).to.eql([
                        {
                            title: {}
                        },
                        {
                            description: {}
                        },
                        {
                            children: {}
                        }
                    ]);
                    done();
                }
            });
        })

        it("default common field layout", done => {
            const schema = {type: "string"};

            const {node} = createFormComponent({
                schema, schemaInitialized: ({configSchema}) => {
                    expect(configSchema.layout.render).to.eql([
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
                    ]);
                    done();
                }
            });
        })
    })

    it("should not affect const schemas schema mutation", done => {
        const schema = {
            const: true
        };
        const configSchema = {
            widget: () => "bar"
        }

        createFormComponent({
            schema, configSchema, defaults: {
                common: {
                    schema: {
                        type: "string"
                    }
                }
            }, schemaInitialized: ({schema, configSchema}) => {
                expect(schema.type).to.be.equals("boolean")
                expect(configSchema.className).to.be.equals("form-control")
                expect(schema.const).to.be.true
                done();
            }
        });
    })

});