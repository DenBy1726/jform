import React from "react"
import {expect} from "chai";
import {createFormComponent, createSandbox} from "../../../test_utils";
import {Simulate} from "react-dom/test-utils";
import sinon from "sinon";

describe("Object type", () => {

    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("schema", () => {
        const schema = {
            type: "object",
            title: "my object",
            description: "my description",
            required: ["foo"],
            default: {
                foo: "hey",
                bar: true,
            },
            properties: {
                foo: {
                    title: "Foo",
                    type: "string",
                },
                bar: {
                    type: "boolean",
                },
            },
        };

        it("should render a fieldset with given id", () => {
            const {node} = createFormComponent({
                schema, configSchema: {
                    layout: {
                        id: "root"
                    }
                }
            });

            const fieldset = node.querySelectorAll("fieldset");
            expect(fieldset).to.have.lengthOf(1);
            expect(fieldset[0].id).eql("root");
        });

        it("should render a widget with given id", () => {
            const {node} = createFormComponent({
                schema, configSchema: {
                    id: "root"
                }
            });

            const fieldset = node.querySelectorAll(".grid-widget");
            expect(fieldset).to.have.lengthOf(1);
            expect(fieldset[0].id).eql("root");
        });

        it("should render a fieldset legend with given id", () => {
            const {node} = createFormComponent({
                schema, configSchema: {
                    title: {
                        id: "title"
                    }
                }
            });

            expect(node.querySelector("#title").textContent).eql("my object");
        });

        it("should render a hidden object", () => {
            const {node} = createFormComponent({
                schema,
                configSchema: {
                    hidden: true,
                },
            });
            expect(node.querySelector(".jform-hidden")).to.exist;
        });

        it("should render a customized title", () => {
            const CustomTitleField = ({text}) => <div id="custom">{text}</div>;

            const {node} = createFormComponent({
                schema,
                template: {
                    type: {
                        object: {
                            title: CustomTitleField
                        }
                    }
                }
            });
            expect(node.querySelector("#custom").textContent).to.eql("my object");
        });

        it("should render a default property label", () => {
            const {node} = createFormComponent({
                schema, configSchema: {
                    $bar: {
                        title: {
                            useName: true
                        }
                    }
                }
            });

            expect(node.querySelector(".boolean-field label").textContent).eql("bar");
        });

        it("should render a string property", () => {
            const {node} = createFormComponent({schema});

            expect(node.querySelectorAll("input[type=text]")).to.have.lengthOf(1);
        });

        it("should render a boolean property", () => {
            const {node} = createFormComponent({schema});

            expect(node.querySelectorAll("input[type=checkbox]")).to.have.lengthOf(1);
        });

        it("should handle a default object value", () => {
            const {node} = createFormComponent({schema});

            expect(node.querySelector(".form-field input[type=text]").value).eql("hey");
            expect(node.querySelector(".form-field input[type=checkbox]").checked).eql(true);
        });

        it("should handle required values", () => {
            const {node} = createFormComponent({schema});

            // Required field is <input type="text" required="">
            expect(node.querySelector("input[type=text]").getAttribute("required")).eql("");
            expect(node.querySelector(".string-field label").textContent).eql("Foo*");
        });

        it("should fill fields with form data", () => {
            const {node} = createFormComponent({
                schema,
                data: {
                    foo: "ho",
                    bar: false,
                },
            });

            expect(node.querySelector(".form-field input[type=text]").value).eql("ho");
            expect(node.querySelector(".form-field input[type=checkbox]").checked).eql(false);
        });

        it("should handle object fields change events", () => {
            const onChange = sandbox.spy();
            const {node} = createFormComponent({schema, onChange});

            Simulate.change(node.querySelector("input[type=text]"), {
                target: {value: "changed"},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, {foo: "changed"});
        });

        it("should handle object fields with blur events", () => {
            const onBlur = sandbox.spy();
            const {node} = createFormComponent({schema, onBlur});

            const input = node.querySelector("input[type=text]");
            Simulate.blur(input, {target: {}});

            expect(onBlur.calledOnce).to.be.true;
        });

        it("should handle focus fields with focus events", () => {
            const onFocus = sandbox.spy();
            const {node} = createFormComponent({schema, onFocus});

            const input = node.querySelector("input[type=text]");
            Simulate.focus(input, {target: {}});

            expect(onFocus.calledOnce).to.be.true;
        });

        it("should change content of value input to boolean false", () => {
            const onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    ...schema,
                    additionalProperties: true,
                }, onChange, data: {first: true},
            });

            Simulate.change(node.querySelector(".additional-item .form-field"), {
                target: {checked: false},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, {first: false});
        });

        it("should change content of value input to null", () => {
            const onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    ...schema,
                    additionalProperties: true,
                }, onChange,
                data: {first: "str"},
            });

            Simulate.change(node.querySelector(".additional-item .form-field"), {
                target: {value: null},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, {first: null});
        });

    });

    describe("fields ordering", () => {
        const schema = {
            type: "object",
            properties: {
                foo: {type: "string"},
                bar: {type: "string"},
                baz: {type: "string"},
                qux: {type: "string"},
            },
        };

        it("should use provided order", () => {
            const {node} = createFormComponent({
                schema,
                configSchema: {
                    order: ["baz", "qux", "bar", "foo"],
                },
                defaults: {
                    common: {
                        configSchema: {
                            title: {
                                useName: true
                            }
                        }
                    }
                }
            });
            const labels = [].map.call(node.querySelectorAll(".string-field .jform-title"), l => l.textContent);

            expect(labels).eql(["baz", "qux", "bar", "foo"]);
        });

        it("should insert unordered properties at wildcard position", () => {
            const {node} = createFormComponent({
                schema,
                configSchema: {
                    order: ["baz", "*", "foo"],
                },
                defaults: {
                    common: {
                        configSchema: {
                            title: {
                                useName: true
                            }
                        }
                    }
                }
            });
            const labels = [].map.call(node.querySelectorAll(".string-field .jform-title"), l => l.textContent);

            expect(labels).eql(["baz", "bar", "qux", "foo"]);
        });

        it("should use provided order also if order list contains extraneous properties", () => {
            const {node} = createFormComponent({
                schema,
                configSchema: {
                    order: ["baz", "qux", "bar", "wut?", "foo", "huh?"],
                }, defaults: {
                    common: {
                        configSchema: {
                            title: {
                                useName: true
                            }
                        }
                    }
                }
            });

            const labels = [].map.call(node.querySelectorAll(".string-field .jform-title"), l => l.textContent);

            expect(labels).eql(["baz", "qux", "bar", "foo"]);
        });

        it("should throw when order list misses an existing property", () => {
            expect(() => createFormComponent({
                schema,
                configSchema: {
                    order: ["baz", "bar"],
                },
            })).to.throw(
                /does not contain properties 'foo', 'qux'/
            );
        });

        it("should throw when more than one wildcard is present", () => {
            expect(() => createFormComponent({
                schema,
                configSchema: {
                    order: ["baz", "*", "bar", "*"],
                },
            })).to.throw(
                /contains more than one wildcard/
            );
        })

        it("should order referenced schema definitions", () => {
            const refSchema = {
                definitions: {
                    testdef: {type: "string"},
                },
                type: "object",
                properties: {
                    foo: {$ref: "#/definitions/testdef"},
                    bar: {$ref: "#/definitions/testdef"},
                },
            };

            const {node} = createFormComponent({
                schema: refSchema,
                configSchema: {
                    order: ["bar", "foo"],
                }, defaults: {
                    common: {
                        configSchema: {
                            title: {
                                useName: true
                            }
                        }
                    }
                }
            });
            const labels = [].map.call(node.querySelectorAll(".string-field .jform-title"), l => l.textContent);
            expect(labels).eql(["bar", "foo"]);
        });

        it("should order referenced object schema definition properties", () => {
            const refSchema = {
                definitions: {
                    testdef: {
                        type: "object",
                        properties: {
                            foo: {type: "string"},
                            bar: {type: "string"},
                        },
                    },
                },
                type: "object",
                properties: {
                    root: {$ref: "#/definitions/testdef"},
                },
            };

            const {node} = createFormComponent({
                schema: refSchema,
                configSchema: {
                    $root: {
                        order: ["bar", "foo"],
                    },
                },
                defaults: {
                    common: {
                        configSchema: {
                            title: {
                                useName: true
                            }
                        }
                    }
                }
            });
            const labels = [].map.call(node.querySelectorAll(".string-field .jform-title"), l => l.textContent);

            expect(labels).eql(["bar", "foo"]);
        });

        it("should render the widget with the expected id", () => {
            const schema = {
                type: "object",
                properties: {
                    foo: {type: "string"},
                    bar: {type: "string"},
                },
            };

            const {node} = createFormComponent({
                schema,
                configSchema: {
                    order: ["bar", "foo"],
                    $foo: {
                        id: "foo"
                    },
                    $bar: {
                        id: "bar"
                    }
                },
            });

            const ids = [].map.call(node.querySelectorAll("input[type=text]"), node => node.id);
            expect(ids).eql(["bar", "foo"]);
        });

    });

    describe("additionalProperties", () => {

        const schema = {
            type: "object",
            additionalProperties: {
                type: "string",
            },
        };

        it("should automatically add a property field if in formData", () => {
            const {node} = createFormComponent({
                schema,
                data: {first: "1"},
            });

            expect(node.querySelectorAll(".string-field")).to.have.lengthOf(1);
        });

        it("should apply configSchema to additionalProperties", () => {
            const {node} = createFormComponent({
                schema,
                configSchema: {
                    additionalProperties: {
                        title: "CustomName",
                    },
                },
                data: {
                    property1: "test",
                },
            });
            const labels = node.querySelectorAll(".jform-title");
            expect(labels[0].textContent).eql("CustomName");
        });

        //todo: validation schema
        //
        // it("should not throw validation errors if additionalProperties is undefined", () => {
        //     const undefinedAPSchema = {
        //         ...schema,
        //         properties: { second: { type: "string" } },
        //     };
        //     delete undefinedAPSchema.additionalProperties;
        //     const { node, onSubmit, onError } = createFormComponent({
        //         schema: undefinedAPSchema,
        //         formData: { nonschema: 1 },
        //     });
        //
        //     submitForm(node);
        //     sinon.assert.calledWithMatch(onSubmit.lastCall, {
        //         formData: { nonschema: 1 },
        //     });
        //
        //     sinon.assert.notCalled(onError);
        // });

        //todo: validation schema
        //
        // it("should throw a validation error if additionalProperties is false", () => {
        //     const { node, onSubmit, onError } = createFormComponent({
        //         schema: {
        //             ...schema,
        //             additionalProperties: false,
        //             properties: { second: { type: "string" } },
        //         },
        //         formData: { nonschema: 1 },
        //     });
        //     submitForm(node);
        //     sinon.assert.notCalled(onSubmit);
        //     sinon.assert.calledWithMatch(onError.lastCall, [
        //         {
        //             message: "is an invalid additional property",
        //             name: "additionalProperties",
        //             params: { additionalProperty: "nonschema" },
        //             property: "['nonschema']",
        //             schemaPath: "#/additionalProperties",
        //             stack: "['nonschema'] is an invalid additional property",
        //         },
        //     ]);
        // });

        it("should still obey properties if additionalProperties is defined", () => {
            const {node} = createFormComponent({
                schema: {
                    ...schema,
                    properties: {
                        definedProperty: {
                            type: "string",
                        },
                    },
                },
            });

            expect(node.querySelectorAll(".string-field")).to.have.lengthOf(1);
        });

        it("should render a label for the additional property key", () => {
            const {node} = createFormComponent({
                schema,
                configSchema: {
                    additionalProperties: {
                        title: {
                            text: "title",
                            id: "first"
                        }
                    }
                },
                data: {first: 1},
            });

            expect(node.querySelector("#first").textContent).eql("title");
        });

        it("should render a label for the additional property with support of define label", () => {
            const {node} = createFormComponent({
                schema,
                configSchema: {
                    additionalProperties: {
                        title: {
                            text: ({name}) => ({
                                first: "first",
                                middle: "middle",
                                last: "last",
                            }[name]),
                            id: ({name}) => ({
                                first: "first",
                                middle: "middle",
                                last: "last",
                            }[name])
                        }
                    }
                },
                data: {first: 1, middle: 2, last: 3},
            });

            expect(node.querySelector("#first").textContent).eql("first");
            expect(node.querySelector("#middle").textContent).eql("middle");
            expect(node.querySelector("#last").textContent).eql("last");

        });

        it("should render a label for the additional property key if additionalProperties is true", () => {
            const {node} = createFormComponent({
                schema: {...schema, additionalProperties: true},
                data: {first: "1"},
                configSchema: {
                    additionalProperties: {
                        title: {
                            useName: true,
                            id: ({name}) => name
                        }
                    }
                },
            });

            expect(node.querySelector("#first").textContent).eql("first");
        });

        it("should not render a label for the additional property key if additionalProperties is false", () => {
            const {node} = createFormComponent({
                schema: {...schema, additionalProperties: false},
                data: {first: 1},
                configSchema: {
                    additionalProperties: {
                        title: {
                            useName: true,
                        },
                        id: ({name}) => name
                    }
                },
            });

            expect(node.querySelector("#first")).eql(null);
        });

        it("should render a text input for the additional property", () => {
            const {node} = createFormComponent({
                schema,
                data: {first: "first"},
                configSchema: {
                    additionalProperties: {
                        title: {
                            useName: true,

                        },
                        id: "first"
                    }
                },
            });

            expect(node.querySelector("#first").value).eql("first");
        });

        it("should have an expand button", () => {
            const {node} = createFormComponent({
                schema, eventSchema: {
                    onAddKey: () => {
                    }
                }
            });

            expect(node.querySelector("div.actions-item button")).not.eql(null);
        });

        it("should not have an expand button if expandable not allowed", () => {
            const {node} = createFormComponent({
                schema: {type: "object"}, eventSchema: {
                    onAddKey: () => {
                    }
                }
            });

            expect(node.querySelector("div.actions-item button")).to.be.null;
        });

        it("should add a new property when clicking the expand button", () => {
            const onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema, onChange, eventSchema: {
                    onAddKey: () => ({newKey: "New Value"})
                }
            });

            Simulate.click(node.querySelector(".actions-item button"));

            sinon.assert.calledWithMatch(onChange.lastCall, {newKey: "New Value"});
        });

        it("should not provide an expand button if length equals maxProperties", () => {
            const {node} = createFormComponent({
                schema: {maxProperties: 1, ...schema},
                data: {first: 1},
                eventSchema: {
                    onAddKey: () => ({newKey: "New Value"})
                }
            });

            expect(node.querySelector(".actions-item button")).to.be.null;
        });

        it("should provide an expand button if length is less than maxProperties", () => {
            const {node} = createFormComponent({
                schema: {maxProperties: 2, ...schema},
                data: {first: 1},
                eventSchema: {
                    onAddKey: () => ({newKey: "New Value"})
                }
            });

            expect(node.querySelector(".actions-item button")).not.eql(null);
        });

        it("should have delete button", () => {
            const {node} = createFormComponent({
                schema, eventSchema: {
                    onRemoveKey: ({removeKey}) => removeKey()
                }, data: {first: 1},
            });

            expect(node.querySelector(".remove-key-button")).to.not.be.null
        });

        it("delete button should delete key-value pair", () => {
            const {node} = createFormComponent({
                schema,
                eventSchema: {
                    onRemoveKey: ({removeKey}) => removeKey()
                }, data: {first: 1},
            });

            expect(node.querySelector(".text-widget").value).to.eql("1");
            Simulate.click(node.querySelector(".remove-key-button"));

            expect(node.querySelector(".text-widget")).to.not.exist;
        });

        it("delete button should delete correct pair", () => {
            const {node} = createFormComponent({
                schema, eventSchema: {
                    onRemoveKey: ({removeKey}) => removeKey()
                }, configSchema: {
                    additionalProperties: {
                        title: {
                            useName: true
                        }
                    }
                },
                data: {first: 1, second: 2, third: 3},
            });

            expect(node.querySelectorAll(".remove-key-button").length).to.eql(3);
            Simulate.click(node.querySelectorAll(".remove-key-button")[1]);
            expect([].map.call(node.querySelectorAll(".jform-title"), l => l.textContent)).to.eql(["first", "third"]);
            expect(node.querySelectorAll(".remove-key-button").length).to.eql(2);
        });

        it("deleting content of value input should not delete pair", () => {
            const onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema, onChange,
                configSchema: {
                    additionalProperties: {
                        title: {
                            useName: true
                        }
                    }
                },
                data: {first: 1},
            });

            Simulate.change(node.querySelector(".text-widget"), {
                target: {value: ""},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, {first: undefined});
        });
    })

    describe("grid", () => {
        const schema = {
            type: "object",
            properties: {
                foo: {
                    type: "string"
                },
                bar: {
                    type: "string"
                },
                baz: {
                    type: "string"
                }
            }

        }
        it("should render fields in a grid", () => {
            const {node} = createFormComponent({
                schema,
            });

            expect(node.querySelectorAll("[class*='Container'] > [class*='Row'] > [class*='Col'] > input")).to.have.lengthOf(3);
        })
        it("should support reordering via layout fields in a grid", () => {
            const {node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: [
                                {
                                    bar: {},
                                },
                                {
                                    baz: {}
                                },
                                {
                                    foo: {}
                                }
                            ]
                        },
                        $foo: {
                            id: "foo"
                        },
                        $bar: {
                            id: "bar"
                        },
                        $baz: {
                            id: "baz"
                        }
                    }
            });

            expect([...node.querySelectorAll("[class*='Container'] > [class*='Row'] > [class*='Col'] > input")].map(x => x.id)).to.eql(["bar", "baz", "foo"]);
        })

        it("should support custom layout fields in a grid", () => {
            const {node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: [
                                {
                                    bar: {},
                                    baz: {}
                                },
                                {
                                    foo: {}
                                }
                            ]
                        },
                        $foo: {
                            id: "foo"
                        },
                        $bar: {
                            id: "bar"
                        },
                        $baz: {
                            id: "baz"
                        }
                    }
            });

            expect(node.querySelectorAll(".grid-widget > [class*='Row'] ")).to.have.lengthOf(2);
            expect(node.querySelectorAll(".grid-widget > [class*='Row'] ")[0].querySelectorAll("[class*='Container'] > [class*='Row'] > [class*='Col'] > input")).to.have.lengthOf(2);
            expect(node.querySelectorAll(".grid-widget > [class*='Row'] ")[1].querySelectorAll("[class*='Container'] > [class*='Row'] > [class*='Col'] > input")).to.have.lengthOf(1);
        })

        it("should support customization for layout fields in a grid", () => {
            const {node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: [
                                {
                                    bar: {
                                        md: 6,
                                        offset: 6
                                    },
                                    baz: {}
                                },
                                {
                                    foo: {}
                                }
                            ]
                        },
                        $foo: {
                            id: "foo"
                        },
                        $bar: {
                            id: "bar"
                        },
                        $baz: {
                            id: "baz"
                        }
                    }
            });

            const uniqueCssClass = "." + node.querySelector(".grid-item").className.split(" ").find(x => x.includes("-Col"));
            const styles = [...document.styleSheets].reverse().find(x => x.cssRules[0].cssRules[0].selectorText === uniqueCssClass)
            expect(styles.cssRules[0].cssRules[0].style.flex).to.eql("0 0 50.000000%");
        })

        it("should support optional rendering for layout fields in a grid", () => {
            const {comp, node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: [
                                {
                                    bar: {
                                        optional: ({isFilled}) => isFilled("baz")
                                    },
                                    baz: {}
                                },
                                {
                                    foo: {}
                                }
                            ]
                        },
                        $foo: {
                            id: "foo"
                        },
                        $bar: {
                            id: "bar"
                        },
                        $baz: {
                            id: "baz"
                        }
                    },
                data: {}
            });


            expect(node.querySelector(".grid-item").style.display).to.equal("none");
            Simulate.change(node.querySelector("#baz"), {
                target:{
                    value: "hdfhfgh"
                }
            });
            expect(node.querySelector(".grid-item").style.display).to.equal("");

        })

        it("should support custom render for schema field", () => {
            const {comp, node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: [
                                {
                                    bar: {
                                        render: (props) => {
                                            const {data} = props
                                            const {baz, foo, bar} = data

                                            return (
                                                <div id="custom-render">
                                                    <h3>{bar} {baz} {foo}</h3>
                                                </div>
                                            )
                                        }
                                    },
                                    baz: {}
                                },
                                {
                                    foo: {}
                                }
                            ]
                        },
                        $foo: {
                            id: "foo"
                        },
                        $bar: {
                            id: "bar"
                        },
                        $baz: {
                            id: "baz"
                        }
                    },
                data: {
                    bar: "1",
                    baz: "2",
                    foo: "3"
                }
            });


            expect(node.querySelector("#custom-render > h3").textContent).to.equal("1 2 3");
        })

        it("should support custom render for not schema field", () => {
            const {comp, node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: [
                                {
                                    bar: {},
                                    baz: {},
                                    custom: {
                                        render: (props) => {
                                            const {data} = props
                                            const {baz, foo, bar} = data

                                            return (
                                                <div id="custom-render">
                                                    <h3>{bar} {baz} {foo}</h3>
                                                </div>
                                            )
                                        }
                                    }
                                },
                                {
                                    foo: {}
                                }
                            ]
                        },
                        $foo: {
                            id: "foo"
                        },
                        $bar: {
                            id: "bar"
                        },
                        $baz: {
                            id: "baz"
                        }
                    },
                data: {
                    bar: "1",
                    baz: "2",
                    foo: "3"
                }
            });


            expect(node.querySelector("#custom-render > h3").textContent).to.equal("1 2 3");
        })

        it("should support default render config changes", () => {
            const {node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: {
                                md: 3
                            }
                        }
                    },
                data: {}
            });


            const css = "." + node.querySelector(".grid-item").className.split(" ").find(x => x.includes("-Col"));
            const style = [...document.styleSheets].reverse().find(x => x.cssRules[0].cssRules[0].selectorText === css)
            expect(style.cssRules[0].cssRules[0].style.flex).to.equal("0 0 25.000000%")
        })

        it("should omit  missed properties in layout", () => {
            const {node} = createFormComponent({
                schema,
                configSchema:
                    {
                        widget: {
                            layout: [
                                {
                                    bar: {
                                        optional: ({isFilled}) => isFilled("baz")
                                    }
                                },
                                {
                                    foo: {}
                                }
                            ]
                        },
                        $foo: {
                            id: "foo"
                        },
                        $bar: {
                            id: "bar"
                        },
                        $baz: {
                            id: "baz"
                        }
                    },
                data: {}
            });

            expect(node.querySelector("#foo")).not.to.be.null;
            expect(node.querySelector("#bar")).not.to.be.null;
            expect(node.querySelector("#baz")).to.be.null;

        })
    })

});