import {expect} from "chai";
import {retrieveSchema} from "../../../../src/form/schema/reference"
import {cloneDeep} from "lodash";

describe("dependencies", () => {

    describe("properties dependencies", () => {
        describe("unidirectional", () => {
            const schema = {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string"
                    },
                    "credit_card": {
                        "type": "number"
                    },
                    "billing_address": {
                        "type": "string"
                    }
                },
                "required": ["name"],
                "dependencies": {
                    "credit_card": ["billing_address"]
                }
            }

            it("should not touch when dependency is not present, but drop dependency keyword", () => {
                const resultSchema = retrieveSchema(schema, schema, {});
                const _schema = cloneDeep(schema);
                delete _schema.dependencies;
                expect(_schema).to.deep.equal(resultSchema);
            });

            it("should add dependent required, when dependency is present", () => {
                const resultSchema = retrieveSchema(schema, schema, {credit_card: 1});
                expect(resultSchema.required).to.have.lengthOf(2);
            });

        })

        describe("bidirectional", () => {
            const schema = {
                "type": "object",
                "properties": {
                    "credit_card": {
                        "type": "number"
                    },
                    "billing_address": {
                        "type": "string"
                    }
                },
                "dependencies": {
                    "credit_card": ["billing_address"],
                    "billing_address": ["credit_card"]
                }
            }

            it("should not touch when dependency is not present, but drop dependency keyword", () => {
                const resultSchema = retrieveSchema(schema, schema, {});
                const _schema = cloneDeep(schema);
                delete _schema.dependencies;
                expect(_schema).to.deep.equal(resultSchema);
            });

            it("should add dependent required, when dependency is present (1)", () => {
                const resultSchema = retrieveSchema(schema, schema, {credit_card: 1});
                expect(resultSchema.required).to.be.lengthOf(1);
                expect(resultSchema.required).to.include.members(["billing_address"]);
            });

            it("should add dependent required, when dependency is present (2)", () => {
                const resultSchema = retrieveSchema(schema, schema, {billing_address: 1});
                expect(resultSchema.required).to.have.lengthOf(1);
                expect(resultSchema.required).to.include.members(["credit_card"]);
            });

            it("should add dependent required, when dependency is present (3)", () => {
                const resultSchema = retrieveSchema(schema, schema, {credit_card: 1, billing_address: 1});
                expect(resultSchema.required).to.have.lengthOf(2);
                expect(resultSchema.required).to.include.members(["credit_card", "billing_address"]);
            });

        })
    })

    describe("schema dependencies", () => {
        const schema = {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "credit_card": {
                    "type": "number"
                }
            },
            "required": ["name"],
            "dependencies": {
                "credit_card": {
                    "properties": {
                        "billing_address": {
                            "type": "string"
                        }
                    },
                    "required": ["billing_address"]
                }
            }
        }

        describe("single", () => {
            it("should not touch when dependency is not present, but drop dependency keyword", () => {
                const resultSchema = retrieveSchema(schema, schema, {});
                const _schema = cloneDeep(schema);
                delete _schema.dependencies;
                expect(_schema).to.deep.equal(resultSchema);
            });

            it("should add dependent subschema, when dependency is present", () => {
                const resultSchema = retrieveSchema(schema, schema, {credit_card: 1});
                expect(resultSchema.properties.billing_address.type).to.equals("string");
                expect(resultSchema.required).to.have.lengthOf(2);
            });
        });

        const personSchema = {
            "definitions": {
                "person": {
                    "title": "Person",
                    "type": "object",
                    "properties": {
                        "Do you have any pets?": {
                            "type": "string",
                            "enum": [
                                "No",
                                "Yes: One",
                                "Yes: More than one"
                            ]
                        }
                    },
                    "required": ["Do you have any pets?"],
                    "dependencies": {
                        "Do you have any pets?": {
                            "oneOf": [
                                {
                                    "properties": {
                                        "Do you have any pets?": {
                                            "enum": [
                                                "No"
                                            ]
                                        }
                                    }
                                },
                                {
                                    "properties": {
                                        "Do you have any pets?": {
                                            "enum": [
                                                "Yes: One"
                                            ]
                                        },
                                        "How old is your pet?": {
                                            "type": "number"
                                        }
                                    },
                                    "required": [
                                        "How old is your pet?"
                                    ]
                                },
                                {
                                    "properties": {
                                        "Do you have any pets?": {
                                            "enum": [
                                                "Yes: More than one"
                                            ]
                                        },
                                        "Do you want to get rid of any?": {
                                            "type": "boolean"
                                        }
                                    },
                                    "required": [
                                        "Do you want to get rid of any?"
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        }

        describe("conditional", () => {

            const conditional = {
                "$ref": "#/definitions/person",
                ...personSchema
            }

            it("should drop dependency keyword", () => {
                const resultSchema = retrieveSchema(conditional, conditional, {});
                expect(resultSchema.dependencies).to.be.undefined;
            });

            it("should not add if data not match", () => {
                const resultSchema = retrieveSchema(conditional, conditional, {});
                expect(Object.keys(resultSchema.properties)).to.have.lengthOf(1)
            });

            it("should add if data match (1)", () => {
                const resultSchema = retrieveSchema(conditional, conditional, {"Do you have any pets?": "No"});
                expect(Object.keys(resultSchema.properties)).to.have.lengthOf(1)
            });

            it("should add if data match (2)", () => {
                const resultSchema = retrieveSchema(conditional, conditional, {"Do you have any pets?": "Yes: One"});
                expect(Object.keys(resultSchema.properties)).to.have.lengthOf(2)
                expect(resultSchema.properties["How old is your pet?"]).not.to.be.undefined
            });

            it("should add if data match (3)", () => {
                const resultSchema = retrieveSchema(conditional, conditional, {"Do you have any pets?": "Yes: More than one"});
                expect(Object.keys(resultSchema.properties)).to.have.lengthOf(2)
                expect(resultSchema.properties["Do you want to get rid of any?"]).not.to.be.undefined
            });
        });
    });
});