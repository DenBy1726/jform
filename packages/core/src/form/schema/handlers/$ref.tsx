import {JSONSchema7} from "json-schema";
import {retrieveSchema} from "form/schema/reference";
import {findSchemaDefinition} from "@jform/utils/index"


export const resolveReference = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 =>  {
    // Retrieve the referenced schema definition.
    const $refSchema = findSchemaDefinition(schema.$ref, rootSchema);
    // Drop the $ref property of the source schema.
    const {$ref, ...localSchema} = schema;
    // Update referenced schema definition with local schema properties.
    return retrieveSchema(
        {...$refSchema, ...localSchema},
        rootSchema,
        data
    );
}