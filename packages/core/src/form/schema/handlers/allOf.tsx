import mergeAllOf from "json-schema-merge-allof";
import {JSONSchema7} from "json-schema";
import {retrieveSchema} from "form/schema/reference";

// @ts-ignore
export const resolveAllOfMerge = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 => {
    try {
        return mergeAllOf({
            ...schema,
            allOf: schema.allOf,
        });
    } catch (e) {
        const {allOf, ...resolvedSchemaWithoutAllOf} = schema;
        return resolvedSchemaWithoutAllOf;
    }
}

export const resolveAllOf = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 =>  {
    return {
        ...schema,
        //@ts-ignore
        allOf: schema.allOf.map(allOfSubschema => retrieveSchema(allOfSubschema, rootSchema, data)),
    };
}


