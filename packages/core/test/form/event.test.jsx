import React from "react"
import {createFormComponent, createSandbox, setProps} from "../test_utils";
import {expect} from "chai";
import sinon from "sinon";
import {Simulate} from "react-dom/test-utils";

describe("events", () => {

    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    });
    afterEach(() => {
        sandbox.restore();
    });

    describe("Blur handler", () => {
        it("should call provided blur handler on form input blur event", () => {
            const schema = {type: "string"};
            const formData = "";

            const onBlur = sandbox.spy();
            const {node} = createFormComponent({schema, formData, onBlur});

            const input = node.querySelector("input");
            Simulate.blur(input, {});

            sinon.assert.calledOnce(onBlur);
        });

        it("should call field level event before form level", () => {
            const schema = {type: "string"};
            const formData = "";

            const onBlur = sandbox.spy()
            const fieldBlur = sandbox.spy()

            const eventSchema = {
                onBlur: fieldBlur
            }

            const {node} = createFormComponent({schema, formData, onBlur, eventSchema});

            const input = node.querySelector("input");
            Simulate.blur(input, {});

            sinon.assert.calledOnce(onBlur);
            sinon.assert.calledOnce(fieldBlur);
            expect(fieldBlur.calledBefore(onBlur)).to.be.true
        });

        it("should handle blur event", () => {
            const onBlur = sandbox.spy()
            const {node} = createFormComponent({
                schema: {type: "string"}, onBlur
            });
            Simulate.blur(node.querySelector("input"), {});
            sinon.assert.calledOnce(onBlur);
        })

    });

    describe("Focus handler", () => {
        it("should call provided focus handler on form input focus event", () => {
            const schema = {
                type: "string"
            };
            const formData = "";
            const onFocus = sandbox.spy();
            const {node} = createFormComponent({schema, formData, onFocus});

            const input = node.querySelector("input");
            Simulate.focus(input, {});

            sinon.assert.calledOnce(onFocus);
        });

        it("should call field level event before form level", () => {
            const schema = {type: "string"};
            const formData = "";

            const onFocus = sandbox.spy()
            const fieldFocus = sandbox.spy()

            const eventSchema = {
                onFocus: fieldFocus
            }

            const {node} = createFormComponent({schema, formData, onFocus, eventSchema});

            const input = node.querySelector("input");
            Simulate.focus(input, {});

            sinon.assert.calledOnce(onFocus);
            sinon.assert.calledOnce(fieldFocus);
            expect(fieldFocus.calledBefore(onFocus)).to.be.true
        });

        it("should handle focus event", () => {
            const onFocus = sandbox.spy()
            const {node} = createFormComponent({
                schema: {type: "string"}, onFocus
            });
            Simulate.focus(node.querySelector("input"), {});
            sinon.assert.calledOnce(onFocus);
        })

    });

    describe("Change handler", () => {

        it("should call provided change handler on form input change event", () => {
            const schema = {
                type: "string"
            };
            const formData = "";
            const onChange = sandbox.spy();
            const {node} = createFormComponent({schema, formData, onChange});

            const input = node.querySelector("input");
            Simulate.change(input, {
                target: {
                    value: "bar"
                }
            });

            expect(onChange.calledWith("bar")).to.be.true
        });

        it("should call field level event before form level", () => {
            const schema = {type: "string"};

            const onChange = sandbox.spy()
            const fieldChange = sandbox.spy()

            const eventSchema = {
                onChange: fieldChange
            }

            const {node} = createFormComponent({schema, onChange, eventSchema});

            const input = node.querySelector("input");
            Simulate.change(input, {
                target: {
                    value: "bar"
                }
            });

            sinon.assert.calledOnce(onChange);
            sinon.assert.calledOnce(fieldChange);
            expect(fieldChange.calledBefore(onChange)).to.be.true;
            expect(onChange.calledWith("bar")).to.be.true;
            expect(fieldChange.calledWith("bar")).to.be.true;
        });



    });

    describe("Submit handler", () => {

        it("should not display submit button if event not provided", () => {
            const {node} = createFormComponent({});
            expect(node.getElementsByTagName("button").length).to.equals(0);
        })

        it("should display submit button if event provided", () => {
            const {node} = createFormComponent({onSubmit: console.log});
            expect(node.getElementsByTagName("button").length).to.equals(1);
        })

        it("should fire event when button is clicked", () => {
            const onSubmit = sandbox.spy()
            const {node} = createFormComponent({onSubmit});
            const button = node.querySelector("button");
            Simulate.click(button, {});
            sinon.assert.calledOnce(onSubmit);
        })

        it("should fire event when button is clicked with data", done => {
            const {node} = createFormComponent({
                schema: {type: "string"}, onSubmit: value => {
                    expect(value).to.be.equals("bar")
                    done();
                }
            });
            const button = node.querySelector("button");
            const input = node.querySelector("input");

            Simulate.change(input, {
                target: {
                    value: "bar"
                }
            });
            Simulate.click(button, {});
        })

        it("default submit value is undefined", done => {
            const {node} = createFormComponent({
                schema: {type: "string"}, onSubmit: value => {
                    expect(value).to.be.undefined
                    done();
                }
            });
            const button = node.querySelector("button");
            Simulate.click(button, {});
        })

        it("submit should use schema defaults", done => {
            const {node} = createFormComponent({
                schema: {type: "string", default: "foo"}, onSubmit: value => {
                    expect(value).to.be.equals("foo")
                    done();
                }
            });
            const button = node.querySelector("button");
            Simulate.click(button, {});
        })
    })

    it("should support extra events", () => {
        const schema = {type: "string"};
        const configSchema = {widget: "foo"};

        const formData = "";

        const onFooBar = sandbox.spy()

        const eventSchema = {
            onFooBar,
            $field: {
                onChange: () => {
                }
            }
        }

        const widgets = {
            string: {
                foo: ({events, $field}) => {
                    if ($field === undefined) {
                        events.onFooBar();
                    }
                    return "foo";
                }
            }
        }

        createFormComponent({widgets, schema, formData, configSchema, eventSchema});

        sinon.assert.calledOnce(onFooBar);
    });
});