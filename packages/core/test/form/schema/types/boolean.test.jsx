import React from "react"
import {createFormComponent, createSandbox} from "../../../test_utils";
import {expect} from "chai";
import {Simulate} from "react-dom/test-utils";
import sinon from "sinon";

describe("Boolean type", () => {

    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should render a boolean field", () => {
        const {node} = createFormComponent({
            schema: {
                type: "boolean",
            },
        });

        expect(node.querySelectorAll("input[type=checkbox]")).to.have.lengthOf(1);
    });

    it("should render a boolean field with the expected id", () => {
        const {node} = createFormComponent({
            schema: {
                type: "boolean",
            },
            configSchema: {
                id: "root"
            }
        });

        expect(node.querySelector("input[type=checkbox]").id).eql("root");
    });

    it("should render a boolean field with a label", () => {
        const {node} = createFormComponent({
            schema: {
                type: "boolean",
                title: "foo",
            },
        });

        expect(node.querySelector("label > .jform-title").textContent).eql("foo");
    });

    describe("HTML5 required attribute", () => {
        it("should not render a required attribute for simple required fields", () => {
            const {node} = createFormComponent({
                schema: {type: "boolean"}, configSchema: {
                    title: {
                        text: "Foo",
                        required: {
                            display: true
                        }
                    }
                }
            });

            expect(node.querySelector("input[type=checkbox]").required).eql(false);
        });

        it("should add a required attribute if the schema uses const with a true value", () => {
            const {node} = createFormComponent({
                schema: {
                    const: true
                }
            });

            expect(node.querySelector("input[type=checkbox]").required).eql(true);
        });

        it("should add a required attribute if the schema uses an enum with a single value of true", () => {
            const {node} = createFormComponent({
                schema: {
                    enum: [true]
                },
            });

            expect(node.querySelector("select").required).eql(true);
        });

        it("should add a required attribute if the schema uses an anyOf with a single value of true", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "boolean",
                    anyOf: [{const: true}],
                },
            });

            expect(node.querySelector("input[type=checkbox]").required).eql(true);
        });

        it("should add a required attribute if the schema uses a oneOf with a single value of true", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "boolean",
                    oneOf: [{const: true}]
                }
            });

            expect(node.querySelector("input[type=checkbox]").required).eql(true);
        });

        it("should add a required attribute if the schema uses an allOf with a value of true", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "boolean",
                    allOf: [{const: true}]
                }
            });

            expect(node.querySelector("input[type=checkbox]").required).eql(true);
        });

    });

    it("should render a description", () => {
        const {node} = createFormComponent({
            schema: {
                type: "boolean",
                description: "my description",
            },
        });

        expect(node.querySelector(".jform-description").textContent).eql("my description");
    });

    it("should assign a default value", () => {
        const {node} = createFormComponent({
            schema: {
                type: "boolean",
                default: true,
            },
        });

        expect(node.querySelector("input").checked).eql(true);
    });

    it("data should default to undefined", () => {
        const onSubmit = sandbox.spy();
        const {node} = createFormComponent({
            schema: {type: "boolean"}, onSubmit
        });
        Simulate.click(node.querySelector("button"), {});
        sinon.assert.calledWithMatch(onSubmit.lastCall, undefined);
    });

    it("should handle a change event", () => {
        const onChange = sandbox.spy();
        const {node} = createFormComponent({
            schema: {
                type: "boolean",
                default: false,
            }, onChange
        });

        Simulate.change(node.querySelector("input"), {
            target: {checked: true},
        });
        sinon.assert.calledWithMatch(onChange.lastCall, true);
    });

    it("should fill field with data", () => {
        const {node} = createFormComponent({
            schema: {
                type: "boolean",
            },
            data: true,
        });

        expect(node.querySelector("input").checked).eql(true);
    });

    describe("Select widget", () => {

        it("should support enumNames for select", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "boolean"
                },
                configSchema: {
                    enumNames: ["Yes", "No"]
                },
                data: true
            });

            const labels = [].map.call(
                node.querySelectorAll("option"),
                label => label.textContent
            );
            expect(labels).eql(["", "Yes", "No"]);
        });

        it("should handle a focus event with select", () => {
            const onFocus = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    type: "boolean",
                    default: false,
                },
                configSchema: {
                    widget: "select",
                },
                onFocus,
            });

            const element = node.querySelector("select");
            Simulate.focus(element, {});
            sinon.assert.calledOnce(onFocus);
        });

        it("should handle a blur event with select", () => {
            const onBlur = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    type: "boolean",
                    default: false,
                },
                configSchema: {
                    widget: "select",
                },
                onBlur,
            });

            const element = node.querySelector("select");
            Simulate.blur(element, {
                target: {
                    value: false,
                },
            });
            sinon.assert.calledOnce(onBlur);
        });

        it("should render a field that contains an enum of booleans", () => {
            const {node} = createFormComponent({
                schema: {
                    enum: [true, false]
                },
            });

            expect(node.querySelectorAll("select")).to.have.lengthOf(1);
        });

        it("should infer the value from an enum on change", () => {
            const onChange = sinon.spy();
            const {node} = createFormComponent({
                schema: {
                    enum: [true, false],
                },
                onChange,
            });

            expect(node.querySelectorAll("select")).to.have.lengthOf(1);
            const $select = node.querySelector("select");
            expect($select.value).eql("");

            Simulate.change($select, {target: {value: "true"}});
            expect(node.querySelector("select").value).eql("true");
            expect(onChange.lastCall.args[0]).eql(true);
        });


    })
});
