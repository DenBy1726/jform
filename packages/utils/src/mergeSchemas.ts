import {isArray, mergeWith, union} from "lodash";
import {isObject} from "./isObject";
import {getSchemaType} from "./getSchemaType";

const customizer = (a: any, b: any, key: string, object: any, source: any): any => {
    if (key === "required" && isArray(a) && isArray(b)) {
        if(getSchemaType(object) === 'object' || getSchemaType(source) === 'object') {
            return union(a, b);
        }
    }
    if (key.endsWith("lassName") && typeof a === 'string' && typeof b === 'string') {
        return union(a.split(" "), b.split(" ")).join(" ");
    }
    if (isArray(a) && isObject(b)) {
        return b;
    }
    if (isObject(a) && isArray(b)) {
        return b;
    }
    if (isArray(a) && isArray(b)) {
        return b;
    }
    return undefined;
}

export const mergeSchemas = (arg: any, ...args: any[]): object => {
    return mergeWith(arg, ...args, customizer);
}
