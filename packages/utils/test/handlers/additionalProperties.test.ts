//@ts-nocheck
import {retrieveSchema} from "../../src"
import {JSONSchema7} from "json-schema";

describe("additional properties", () => {

    it("should not touch schema if extra data doesn't present", () => {
        const schema: JSONSchema7 = {
            type: "object",
            properties: {
                foo: { type: "string"},
                bar: { type: "string"},
                baz: { type: "string"},
            },
            additionalProperties: {
                type: "string"
            }
        };

        const resultSchema = retrieveSchema(schema, schema, {bar: "1", baz: "2"});
        expect(schema).toEqual(resultSchema);
    });

    it("should not touch schema if extra data is primitive", () => {
        const schema: JSONSchema7 = {
            type: "object",
            properties: {
                foo: { type: "string"},
                bar: { type: "string"},
                baz: { type: "string"},
            },
            additionalProperties: {
                type: "string"
            }
        };

        const resultSchema = retrieveSchema(schema, schema, "bar");
        expect(schema).toEqual(resultSchema);
    });

    it("should not touch schema if schema not of object type", () => {
        const schema: JSONSchema7 = {
            type: "string",
            additionalProperties: {
                type: "string"
            }
        };

        const resultSchema = retrieveSchema(schema, schema, "bar");
        expect(schema).toEqual(resultSchema);
    });

    it("should merge additional properties to schema according to data", () => {
        const schema: JSONSchema7 = {
            type: "object",
            properties: {
                foo: { type: "string"},
            },
            additionalProperties: {
                type: "string"
            }
        };

        const resultSchema = retrieveSchema(schema, schema, {bar: "1", baz: "2"});
        expect(resultSchema.properties.bar.type).toEqual("string");
        expect(resultSchema.properties.baz.type).toEqual("string");
    });

    it("should guess type if no present", () => {
        const schema = {
            type: "object",
            properties: {
                foo: { type: "string"},
            },
            additionalProperties: true
        };

        const resultSchema = retrieveSchema(schema, schema, {bar: "1", baz: 2});
        expect(resultSchema.properties.bar.type).toEqual("string");
        expect(resultSchema.properties.baz.type).toEqual("number");
    });

    it("should resolve ref", () => {
        const schema = {
            type: "object",
            properties: {
                foo: { type: "string"},
            },
            definitions: {
                us: {
                    properties: {
                        zip_code: {
                            type: "string"
                        },
                    },
                }
            },
            additionalProperties: {
                $ref: "#/definitions/us"
            }
        };

        const resultSchema = retrieveSchema(schema, schema, {bar: {"zip_code": "1"}, baz: {"zip_code": "2"}});
        expect(resultSchema.properties.bar.properties.zip_code).not.toBeNull();
        expect(resultSchema.properties.baz.properties.zip_code).not.toBeNull();
    });
});