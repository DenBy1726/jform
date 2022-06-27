import {JSONSchema7} from "json-schema";

export function isConstant(schema: JSONSchema7): boolean {
    return (Array.isArray(schema.enum) && schema.enum.length === 1) || (schema.const !== undefined);
}