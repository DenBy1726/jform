import {default as resolveAdditional} from "./additionalProperties"
import {resolveAllOfMerge, resolveAllOf} from "./allOf"
import {default as resolveDependencies} from "./dependencies"
import {default as resolveCondition} from "./if"
import {default as resolveProperties} from "./properties"
import {JSONSchema7, JSONSchema7Definition} from "json-schema";
import {isObject} from "lodash";
import {resolveReference} from "../index";

const handlers = {
    $ref: resolveReference,
    dependencies: resolveDependencies,
    allOf_before: resolveAllOf,
    if: resolveCondition,
    properties: resolveProperties,
    allOf_after: resolveAllOfMerge,
    additionalProperties: resolveAdditional
}

export const retrieveSchema =  <T extends any>(schema: JSONSchema7Definition, rootSchema: JSONSchema7, data?: T): JSONSchema7 => {
    if (!isObject(schema)) {
        return {};
    }

    let resolvedSchema = schema;
    Object.entries(handlers).forEach(([key, handler]) => {
        const field = key.split("_")[0];
        //@ts-ignore
        if (resolvedSchema[field]) {
            resolvedSchema = handler(resolvedSchema, rootSchema, data);
        }
    })

    return resolvedSchema;
}