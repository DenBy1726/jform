import {JSONSchema7, JSONSchema7Definition} from "json-schema";
import {isObject} from "lodash";
import {resolveCondition} from "./handlers/if";
import {stubExistingAdditionalProperties} from "./handlers/additionalProperties";
import {resolveProperties} from "./handlers/properties";
import {resolveAllOf, resolveAllOfMerge} from "./handlers/allOf";
import {resolveDependenciesRecursive} from "./handlers/dependencies";
import {resolveReference} from "@jform/utils/index";

const handlers = {
    $ref: resolveReference,
    dependencies: resolveDependenciesRecursive,
    allOf_before: resolveAllOf,
    if: resolveCondition,
    properties: resolveProperties,
    allOf_after: resolveAllOfMerge,
    additionalProperties: stubExistingAdditionalProperties
}

export function retrieveSchema<T = any>(schema: JSONSchema7Definition, rootSchema: JSONSchema7, data?: T): JSONSchema7 {
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