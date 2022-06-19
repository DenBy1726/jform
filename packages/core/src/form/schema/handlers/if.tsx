//@ts-nocheck
import {JSONSchema7} from "json-schema";
import Ajv from "ajv";
import {retrieveSchema} from "form/schema/reference";
import {ID_PREFIX} from "form/schema/constant";

export const createAjvInstance = (): Ajv => {
    return new Ajv({
        allErrors: true,
        multipleOfPrecision: 8
    });
}

let ajv = createAjvInstance()

export const withIdRefPrefix = (schemaNode: JSONSchema7) => {
    let obj: JSONSchema7 = schemaNode;
    if (schemaNode.constructor === Object) {
        obj = {...schemaNode};
        for (const key in obj) {
            const value: any = obj[key];
            if (
                key === "$ref" &&
                typeof value === "string" &&
                value.startsWith("#")
            ) {
                obj[key] = ID_PREFIX + value;
            } else {
                obj[key] = withIdRefPrefix(value);
            }
        }
    } else if (Array.isArray(schemaNode)) {
        obj = [...schemaNode];
        for (var i = 0; i < obj.length; i++) {
            obj[i] = withIdRefPrefix(obj[i]);
        }
    }
    return obj;
}

export const isValid = (schema: JSONSchema7, data: any, rootSchema: JSONSchema7) => {
    try {
        // add the rootSchema ROOT_SCHEMA_PREFIX as id.
        // then rewrite the schema ref's to point to the rootSchema
        // this accounts for the case where schema have references to models
        // that lives in the rootSchema but not in the schema in question.
        return ajv
            .addSchema(rootSchema, ID_PREFIX)
            .validate(withIdRefPrefix(schema), data);
    } catch (e) {
        return false;
    } finally {
        // make sure we remove the rootSchema from the global ajv instance
        ajv.removeSchema(ID_PREFIX);
    }
}

export const resolveCondition = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 => {
    let {if: expression, then, else: otherwise, ...resolvedSchemaLessConditional} = schema;

    const conditionalSchema = isValid(expression as JSONSchema7, data, rootSchema) ? then : otherwise;

    if (conditionalSchema) {
        return retrieveSchema(
            mergeSchemas(
                resolvedSchemaLessConditional,
                retrieveSchema(conditionalSchema, rootSchema, data)
            ), rootSchema, data
        );
    } else {
        return retrieveSchema(resolvedSchemaLessConditional, rootSchema, data);
    }
};