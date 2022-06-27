import {JSONSchema7} from "json-schema";

export const toConstant = (schema: JSONSchema7): any => {
    if (Array.isArray(schema.enum) && schema.enum.length === 1) {
        return schema.enum[0];
    } else if (schema.const) {
        return schema.const;
    } else {
        throw new Error("schema cannot be inferred as a constant");
    }
}