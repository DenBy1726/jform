import {JSONSchema7} from "json-schema";

export const canExpand = (schema: JSONSchema7, data: any, handler?: Function) => {
    if (!handler) {
        return false;
    }
    if (!schema.additionalProperties) {
        return false;
    }

    if (schema.maxProperties !== undefined) {
        return Object.keys(data).length < schema.maxProperties;
    }
    return true;
}