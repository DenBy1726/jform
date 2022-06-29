import React from "react"
import {expect} from "chai";
import {createFormComponent, createSandbox} from "../../../test_utils";
import {Simulate} from "react-dom/test-utils";
import sinon from "sinon";

describe("String type", () => {

    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("should render a string field with a label", () => {
        const {node} = createFormComponent({
            schema: {
                type: "string",
                enum: ["foo", "bar"],
                title: "foo",
            },
        });

        expect(node.querySelector("label").textContent).eql("foo");
    });


    describe("widget", () => {
        it("should support function widget declaration", () => {
            const {node} = createFormComponent({
                schema: {type: "string"},
                configSchema: {widget: () => <div id="match">Foo</div>}
            });
            expect(node.querySelector("#match").textContent).to.equal("Foo")
        })

        it("error on unknown widget", () => {
            expect(() => {
                const {node} = createFormComponent({
                    schema: {type: "string"},
                    configSchema: {widget: "bar"}
                });
            }).to.throw('No widget "bar" for type string');
        })
    })

    describe("text widget", () => {
        it("should render a string field", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                },
            });

            expect(node.getElementsByTagName("input").length).to.equals(1);
        });
        it("should render a string field with a label", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    title: "foo",
                },
            });

            expect(node.getElementsByTagName("label")[0].textContent).to.equal("foo");
        });

        it("should render a string field with a description", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    description: "bar",
                },
            });

            expect(node.querySelector(".jform-description").textContent).to.equal("bar");
        });

        it("should assign a default value", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    default: "plop",
                },
            });

            expect(node.querySelectorAll(".jform-field-layout-root input")[0].value).to.equals("plop");
            expect(node.querySelectorAll(".jform-field-layout-root > datalist > option").length).to.equals(0);

        });

        it("should render a string field with examples", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    examples: ["Firefox", "Chrome", "Vivaldi"],
                },
            });

            expect(node.querySelectorAll(".jform-field-layout-root > datalist > option").length).to.equals(3);
        });

        it("should render a string with examples that includes the default value", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    default: "Firefox",
                    examples: ["Chrome", "Vivaldi"],
                },
            });
            expect(node.querySelectorAll(".jform-field-layout-root input")[0].value).to.equals("Firefox");
            expect(node.querySelectorAll(".jform-field-layout-root > datalist > option").length).to.equals(3);
        });

        it("should render a string with examples that overlaps with the default value", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    default: "Firefox",
                    examples: ["Firefox", "Chrome", "Vivaldi"],
                },
            });
            expect(node.querySelectorAll(".jform-field-layout-root input")[0].value).to.equals("Firefox");
            expect(node.querySelectorAll(".jform-field-layout-root > datalist > option").length).to.equals(3);
        });

        it("should handle an empty string change event", () => {
            let onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema: {type: "string"},
                data: "x",
                onChange
            });

            Simulate.change(node.querySelector("input"), {
                target: {value: ""},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, "");
        });

        it("should handle an empty string change event with custom empty", () => {
            let onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema: {type: "string"},
                configSchema: {empty: "default"},
                data: "x",
                onChange
            });

            Simulate.change(node.querySelector("input"), {
                target: {value: ""},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, "default");
        });

        it("should handle an empty string change event with defaults set", () => {
            let onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    default: "a",
                },
                onChange
            });

            Simulate.change(node.querySelector("input"), {
                target: {value: ""},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, "");
        });

        it("should fill field with data", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                },
                data: "plip",
            });

            expect(node.querySelector("input").value).eql("plip");
        });

        it("should render the widget with the expected id", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                }, configSchema: {
                    id: "root"
                }
            });

            expect(node.querySelector("input").id).eql("root");
        });

        it("should render customized TextWidget (1)", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                },
                widgets: {
                    string: {
                        text: (props) => <input {...props} id="custom"/>
                    },
                },
            });

            expect(node.querySelector("#custom")).to.exist;
        });
    })

    describe("select widget", () => {
        it("should render a string field", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"]
                },
            });
            expect(node.querySelectorAll("select")).to.have.lengthOf(1);
        });

        it("should render a string field for an enum without a type", () => {
            const {node} = createFormComponent({
                schema: {
                    enum: ["foo", "bar"],
                },
            });

            expect(node.querySelectorAll("select")).to.have.lengthOf(1);
        });

        it("should render empty option", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                },
            });

            expect(node.querySelectorAll("option")[0].value).eql("");
        });

        it("should render empty option with placeholder text", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                },
                configSchema: {
                    placeholder: "Test",
                },
            });

            expect(node.querySelectorAll("option")[0].textContent).eql("Test");
        });

        it("should assign a default value", () => {
            const onSubmit = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                    default: "bar",
                }, onSubmit
            });

            Simulate.click(node.querySelector("button"), {});

            sinon.assert.calledWithMatch(onSubmit.lastCall, "bar");
        });

        it("should reflect undefined value into the dom as empty option", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                },
            });

            Simulate.change(node.querySelector("select"), {
                target: {},
            });

            expect(node.querySelector("select").value).eql("");
        });

        it("should reflect null in change event if empty option selected", () => {
            const onChange = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                }, onChange
            });

            Simulate.change(node.querySelector("select"), {
                target: {value: ""},
            });

            sinon.assert.calledWithMatch(onChange.lastCall, null);
        });

        it("should reflect the change into the dom", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                },
            });

            Simulate.change(node.querySelector("select"), {
                target: {value: "foo"},
            });

            expect(node.querySelector("select").value).eql("foo");
        });

        it("should reflect undefined value into the dom as empty option", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                },
            });

            Simulate.change(node.querySelector("select"), {
                target: {value: ""},
            });

            expect(node.querySelector("select").value).eql("");
        });

        it("should fill field with data", () => {
            const onSubmit = sandbox.spy();
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["foo", "bar"],
                },
                data: "bar",
                onSubmit
            });
            Simulate.click(node.querySelector("button"), {})

            sinon.assert.calledWithMatch(onSubmit.lastCall, "bar");
        });

        it("should render the widget with the expected id", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: ["a", "b"],
                },
                configSchema: {
                    id: "root"
                }
            });

            expect(node.querySelector("select").id).eql("root");
        });

        it("should render customized SelectWidget", () => {
            const {node} = createFormComponent({
                schema: {
                    type: "string",
                    enum: [],
                },
                widgets: {
                    string: {
                        select: (props) => <input {...props} id="custom"/>
                    },
                },
            });

            expect(node.querySelector("#custom")).to.exist;
        });

        it("should render a select element and the option's length is equal the enum's length, if set the enum and the default value is empty.", () => {
            const schema = {
                type: "string",
                enum: ["", "1"],
                default: ""
            };

            const {node} = createFormComponent({
                schema,
            });

            const options = node.querySelectorAll("option");
            expect(options[0].innerHTML).eql("");
            expect(options.length).eql(2);
        });

        it("should render only one empty option when the default value is empty.", () => {
            const schema = {
                type: "string",
                enum: [""],
                default: ""
            };

            const {node} = createFormComponent({
                schema,
            });

            const options = node.querySelectorAll("option");
            expect(options[0].innerHTML).eql("");
            expect(options.length).eql(1);
        });


    })

})