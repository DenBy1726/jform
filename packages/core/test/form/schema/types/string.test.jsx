import React from "react"
import {expect} from "chai";
import {createFormComponent, createSandbox} from "../../../test_utils";

describe("String type", () => {

    let sandbox;
    beforeEach(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe("layout", () => {
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
            }).to.throw("No widget bar for type string");
        })
    })

    describe("text widget", () => {
        it("should render a string field", () => {
            const { node } = createFormComponent({
                schema: {
                    type: "string",
                },
            });

            expect(node.getElementsByTagName("input").length).to.equals(1);
        });
        it("should render a string field with a label", () => {
            const { node } = createFormComponent({
                schema: {
                    type: "string",
                    title: "foo",
                },
            });

            expect(node.getElementsByTagName("label")[0].textContent).to.equal("foo");
        });

        it("should render a string field with a description", () => {
            const { node } = createFormComponent({
                schema: {
                    type: "string",
                    description: "bar",
                },
            });

            expect(node.querySelector(".jform-description").textContent).to.equal("bar");
        });

        it("should assign a default value", () => {
            const { node } = createFormComponent({
                schema: {
                    type: "string",
                    default: "plop",
                },
            });

            expect(node.querySelectorAll(".jform-field-layout-root input")[0].value).to.equals("plop");
            expect(node.querySelectorAll(".jform-field-layout-root > datalist > option").length).to.equals(0);

        });

        it("should render a string field with examples", () => {
            const { node } = createFormComponent({
                schema: {
                    type: "string",
                    examples: ["Firefox", "Chrome", "Vivaldi"],
                },
            });

            expect(node.querySelectorAll(".jform-field-layout-root > datalist > option").length).to.equals(3);
        });

        it("should render a string with examples that includes the default value", () => {
            const { node } = createFormComponent({
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
            const { node } = createFormComponent({
                schema: {
                    type: "string",
                    default: "Firefox",
                    examples: ["Firefox", "Chrome", "Vivaldi"],
                },
            });
            expect(node.querySelectorAll(".jform-field-layout-root input")[0].value).to.equals("Firefox");
            expect(node.querySelectorAll(".jform-field-layout-root > datalist > option").length).to.equals(3);
        });


    })
})