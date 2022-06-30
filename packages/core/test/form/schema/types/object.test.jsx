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

            const legend = node.querySelector("fieldset > legend");

            expect(legend.textContent).eql("my object");
            expect(legend.id).eql("title");
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
            const CustomTitleField = ({title}) => <div id="custom">{title}</div>;

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
            expect(node.querySelector("fieldset > #custom").textContent).to.eql("my object");
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

            expect(node.querySelector(".form-control input[type=text]").value).eql("hey");
            expect(node.querySelector(".form-control input[type=checkbox]").checked).eql(true);
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

            expect(node.querySelector(".form-control input[type=text]").value).eql("ho");
            expect(node.querySelector(".form-control input[type=checkbox]").checked).eql(false);
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
                            foo: { type: "string" },
                            bar: { type: "string" },
                        },
                    },
                },
                type: "object",
                properties: {
                    root: { $ref: "#/definitions/testdef" },
                },
            };

            const { node } = createFormComponent({
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
                    foo: { type: "string" },
                    bar: { type: "string" },
                },
            };

            const { node } = createFormComponent({
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

});