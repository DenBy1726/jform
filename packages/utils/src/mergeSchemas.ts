import {getSchemaType} from "./getSchemaType";
import {union} from "lodash";
import {isObject} from "./isObject";

export const mergeSchemas = (obj1: { [k: string]: any }, obj2: { [k: string]: any }): object => {
    const acc = Object.assign({}, obj1); // Prevent mutation of source object.
    return Object.keys(obj2).reduce((acc, key) => {
        const left = obj1 ? obj1[key] : {},
            right = obj2[key];
        if (obj1 && obj1.hasOwnProperty(key) && isObject(right)) {
            acc[key] = mergeSchemas(left, right);
        } else if (
            obj1 &&
            obj2 &&
            (getSchemaType(obj1) === 'object' || getSchemaType(obj2) === 'object') &&
            key === 'required' &&
            Array.isArray(left) &&
            Array.isArray(right)
        ) {
            // Don't include duplicate values when merging 'required' fields.
            acc[key] = union(left, right);
        } else {
            acc[key] = right;
        }
        return acc;
    }, acc);
}
