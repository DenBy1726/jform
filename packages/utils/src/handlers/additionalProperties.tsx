//@ts-nocheck
import {JSONSchema7} from "json-schema";
import {guessType, isObject, retrieveSchema} from "../index";

export const ADDITIONAL_PROPERTY_FLAG = "__additional_property";

//add additional data definitions to schema
export default <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 => {
    // Clone the schema so we don't ruin the consumer's original
    schema = {...schema};
    if (schema.properties) {
        schema.properties = {...schema.properties};
    }

    data = isObject(data) ? data : {};

    Object.keys(data).forEach(key => {
        if (schema.properties[key]) {
            // No need to stub, our schema already has the property
            return;
        }

        let additionalProperties;
        if (schema.additionalProperties.$ref) {
            additionalProperties = retrieveSchema({$ref: schema.additionalProperties.$ref} as JSONSchema7, rootSchema, data);
        } else if (schema.additionalProperties.type) {
            additionalProperties = {...schema.additionalProperties};
        } else {
            additionalProperties = {type: guessType(data[key])};
        }

        // The type of our new key should match the additionalProperties value;
        schema.properties[key] = additionalProperties;
        // Set our additional property flag so we know it was dynamically added
        schema.properties[key][ADDITIONAL_PROPERTY_FLAG] = true;
    });

    return schema;
}