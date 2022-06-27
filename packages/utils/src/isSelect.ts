import {isConstant, retrieveSchema} from './index';
import {JSONSchema7} from "json-schema";


export const isSelect = (_schema: JSONSchema7): boolean => {
    const schema = retrieveSchema(_schema, _schema);
    const altSchemas = schema.oneOf || schema.anyOf;
    if (Array.isArray(schema.enum)) {
        return true;
    } else if (Array.isArray(altSchemas)) {
        return altSchemas.every(altSchemas => isConstant(altSchemas as JSONSchema7));
    }
    return false;
}