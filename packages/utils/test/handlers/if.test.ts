//@ts-nocheck
import {retrieveSchema} from "../../src"

describe("if", () => {

    const schema = {
        type: "object",
        properties: {
            street_address: {
                type: "string",
            },
            country: {
                enum: ["United States of America", "Canada"],
            },
        },
        if: {
            properties: {country: {const: "United States of America"}},
        },
        then: {
            properties: {zipcode: {type: "string"}},
        },
        else: {
            properties: {postal_code: {type: "string"}},
        },
    };

    const schemaWithRef = {
        type: "object",
        properties: {
            country: {
                enum: ["United States of America", "Canada"],
            },
        },
        if: {
            properties: {
                country: {
                    const: "United States of America",
                },
            },
        },
        then: {
            $ref: "#/definitions/us",
        },
        else: {
            $ref: "#/definitions/other",
        },
        definitions: {
            us: {
                properties: {
                    zip_code: {
                        type: "string",
                    },
                },
            },
            other: {
                properties: {
                    postal_code: {
                        type: "string",
                    },
                },
            },
        },
    };

    it("should pick then when condition is true", () => {
        const formData = {
            country: "United States of America",
        };

        const resultSchema = retrieveSchema(schema, schema, formData);

        expect(resultSchema.properties.zipcode).not.toBeNull();
        expect(resultSchema.properties.postal_code).toBeUndefined();
    });

    it("should pick else when condition is false", () => {
        const formData = {
            country: "France",
        };
        const resultSchema = retrieveSchema(schema, schema, formData);

        expect(resultSchema.properties.zipcode).toBeUndefined();
        expect(resultSchema.properties.postal_code).not.toBeNull();
    });

    it("An empty formData will make the conditional evaluate to true because no properties are required in the if statement", () => {
        const formData = {};
        const resultSchema = retrieveSchema(schema, schema, formData);

        // An empty formData will make the conditional evaluate to true because no properties are required in the if statement
        // Please see https://github.com/epoberezkin/ajv/issues/913
        expect(resultSchema.properties.zipcode).not.toBeNull();
        expect(resultSchema.properties.postal_code).toBeUndefined();
    });

    it("should pick then when condition is true with reference", () => {
        const formData = {
            country: "United States of America",
        };
        const resultSchema = retrieveSchema(schemaWithRef, schemaWithRef, formData);

        expect(resultSchema.properties.zipcode).not.toBeNull();
        expect(resultSchema.properties.postal_code).toBeUndefined();
    });

    it("should pick else when condition is false with reference", () => {
        const formData = {
            country: "France",
        };
        const resultSchema = retrieveSchema(schemaWithRef, schemaWithRef, formData);

        expect(resultSchema.properties.zipcode).toBeUndefined();
        expect(resultSchema.properties.postal_code).not.toBeNull();
    });

    describe("allOf if then else", () => {
        const schemaWithAllOf = {
            type: "object",
            properties: {
                street_address: {
                    type: "string",
                },
                country: {
                    enum: [
                        "United States of America",
                        "Canada",
                        "United Kingdom",
                        "France",
                    ],
                },
            },
            allOf: [
                {
                    if: {
                        properties: {country: {const: "United States of America"}},
                    },
                    then: {
                        properties: {zipcode: {type: "string"}},
                    },
                },
                {
                    if: {
                        properties: {country: {const: "United Kingdom"}},
                    },
                    then: {
                        properties: {postcode: {type: "string"}},
                    },
                },
                {
                    if: {
                        properties: {country: {const: "France"}},
                    },
                    then: {
                        properties: {telephone: {type: "string"}},
                    },
                },
            ],
        };

        it("should pick correctly when condition is true in allOf (1)", () => {
            const formData = {
                country: "United States of America",
            };
            const resultSchema = retrieveSchema(schemaWithAllOf, schemaWithAllOf, formData);

            expect(resultSchema.properties.zipcode).not.toBeNull();
            expect(resultSchema.properties.postcode).toBeUndefined();
            expect(resultSchema.properties.telephone).toBeUndefined();
        });

        it("should pick correctly when condition is false in allOf (1)", () => {
            const formData = {
                country: "",
            };
            const resultSchema = retrieveSchema(schemaWithAllOf, schemaWithAllOf, formData);

            expect(resultSchema.properties.zipcode).toBeUndefined();
            expect(resultSchema.properties.postcode).toBeUndefined();
            expect(resultSchema.properties.telephone).toBeUndefined();
        });

        it("should render correctly when condition is true in allof (2)", () => {
            const formData = {
                country: "United Kingdom",
            };
            const resultSchema = retrieveSchema(schemaWithAllOf, schemaWithAllOf, formData);

            expect(resultSchema.properties.postcode).not.toBeNull();
            expect(resultSchema.properties.zipcode).toBeUndefined();
            expect(resultSchema.properties.telephone).toBeUndefined();
        });

        it("should render correctly when condition is true in allof (3)", () => {
            const formData = {
                country: "France",
            };
            const resultSchema = retrieveSchema(schemaWithAllOf, schemaWithAllOf, formData);

            expect(resultSchema.properties.postcode).toBeUndefined();
            expect(resultSchema.properties.zipcode).toBeUndefined();
            expect(resultSchema.properties.telephone).not.toBeNull();
        });

        const schemaWithAllOfRef = {
            type: "object",
            properties: {
                street_address: {
                    type: "string",
                },
                country: {
                    enum: [
                        "United States of America",
                        "Canada",
                        "United Kingdom",
                        "France",
                    ],
                },
            },
            definitions: {
                unitedkingdom: {
                    properties: {postcode: {type: "string"}},
                },
            },
            allOf: [
                {
                    if: {
                        properties: {country: {const: "United Kingdom"}},
                    },
                    then: {
                        $ref: "#/definitions/unitedkingdom",
                    },
                },
            ],
        };

        it("should pick correctly when condition is true when then contains a reference", () => {
            const formData = {
                country: "United Kingdom",
            };
            const resultSchema = retrieveSchema(schemaWithAllOfRef, schemaWithAllOfRef, formData);

            expect(resultSchema.properties.postcode).not.toBeNull();
            expect(resultSchema.properties.zipcode).toBeUndefined();
            expect(resultSchema.properties.telephone).toBeUndefined();
        });
    });
});