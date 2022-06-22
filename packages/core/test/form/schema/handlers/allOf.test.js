import {expect} from "chai";
import {retrieveSchema} from "../../../../src/form/schema/reference"

describe("allOf", () => {

    it("should overlap complex type for most common", () => {
        const schema = {
            type: "object",
            properties: {
                foo: {
                    allOf: [{type: ["string", "number", "null"]}, {type: "string"}],
                },
            },
        };

        const resultSchema = retrieveSchema(schema, schema);
        expect(resultSchema.properties.foo.type).to.equals("string");
    });

    it("should be able to handle incompatible types and not crash", () => {
        const schema = {
            type: "object",
            properties: {
                foo: {
                    allOf: [{type: "string"}, {type: "boolean"}],
                },
            },
        };

        const resultSchema = retrieveSchema(schema, schema);
        expect(resultSchema.properties.foo.type).be.undefined;
    });
});