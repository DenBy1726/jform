import {JSONSchema7TypeName} from "json-schema";

export const guessType = (value: any): JSONSchema7TypeName => {
    if (Array.isArray(value)) {
        return 'array';
    }
    if (typeof value === 'string') {
        return 'string';
    }
    if (value == null) {
        return 'null';
    }
    if (typeof value === 'boolean') {
        return 'boolean';
    }
    if (!isNaN(value)) {
        return 'number';
    }
    if (typeof value === 'object') {
        return 'object';
    }
    // Default to string if we can't figure it out
    return 'string';
}
