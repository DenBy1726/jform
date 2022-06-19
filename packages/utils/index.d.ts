import {JSONSchema7} from "json-schema";

declare module '@jform/utils' {
    export function findSchemaDefinition(name: string, rootSchema: JSONSchema7): JSONSchema7;

    export function guessType(value: any): string;

    export function getSchemaType(schema: JSONSchema7): string | string[];

    export function mergeSchemas(obj1: { [k: string]: any }, obj2: { [k: string]: any }): object;

    export function isObject(thing: any): boolean;
}


