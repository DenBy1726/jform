import {JSONSchema7, JSONSchema7TypeName} from "json-schema";

declare module '@jform/utils' {
    export function findSchemaDefinition(name: string, rootSchema: JSONSchema7): JSONSchema7;

    export function guessType(value: any): JSONSchema7TypeName;

    export function getSchemaType(schema: JSONSchema7): JSONSchema7TypeName | JSONSchema7TypeName[];

    export function mergeSchemas(obj1: { [k: string]: any }, obj2: { [k: string]: any }): object;

    export function isObject(thing: any): boolean;

    export function traverse(schema: JSONSchema7, configSchema: object, handler: Function): JSONSchema7;

    export function resolveReference(schema: JSONSchema7, rootSchema: JSONSchema7): JSONSchema7;

}