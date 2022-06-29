import {JSONSchema7} from "json-schema";

export const schemaRequiresTrueValue = (schema: JSONSchema7): boolean => {
    // Check if const is a truthy value
    if (schema.const) {
        return true;
    }

    // Check if an enum has a single value of true
    if (schema.enum && schema.enum.length === 1 && schema.enum[0] === true) {
        return true;
    }

    // If anyOf has a single value, evaluate the subschema
    if (schema.anyOf && schema.anyOf.length === 1) {
        return schemaRequiresTrueValue(schema.anyOf[0] as JSONSchema7);
    }

    // If oneOf has a single value, evaluate the subschema
    if (schema.oneOf && schema.oneOf.length === 1) {
        return schemaRequiresTrueValue(schema.oneOf[0] as JSONSchema7);
    }

    // Evaluate each subschema in allOf, to see if one of them requires a true
    // value
    if (schema.allOf) {
        return (schema.allOf as JSONSchema7[]).some(schemaRequiresTrueValue);
    }

    return false;
}