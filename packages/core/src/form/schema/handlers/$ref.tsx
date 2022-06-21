import {JSONSchema7} from "json-schema";
import {retrieveSchema} from "../reference";
import {findSchemaDefinition} from "@jform/utils/index"


export const resolveReference = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 =>  {
    const $refSchema = findSchemaDefinition(schema.$ref as string, rootSchema);
    const {$ref, ...localSchema} = schema;
    return retrieveSchema({...$refSchema, ...localSchema}, rootSchema, data);
}