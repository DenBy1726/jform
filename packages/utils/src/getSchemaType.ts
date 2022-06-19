import {guessType} from "./guessType";
import {JSONSchema7} from "json-schema";

export const getSchemaType = (schema: JSONSchema7): string | string[] => {
    let {type} = schema;

    if (!type) {
        if (schema.const) {
            return guessType(schema.const);
        }
        if (schema.enum) {
            if (schema.enum.length > 0) {
                return guessType(schema.enum[0]);
            } else {
                return "string";
            }
        }
        if(schema.properties || schema.additionalProperties) {
            return "object"
        }
    }

    if (Array.isArray(type) && type.length === 2 && type.includes('null')) {
        type = type.find(type => type !== 'null');
    }

    return type || 'string';
}