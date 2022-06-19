import {JSONSchema7} from "json-schema";
import jsonpointer from "jsonpointer";
import {omit} from "lodash";

export const findSchemaDefinition = (ref: string, rootSchema: JSONSchema7 = {}): JSONSchema7 => {
    if (ref?.startsWith('#')) {
        ref = decodeURIComponent(ref.substring(1));
    } else {
        throw new Error(`Could not find a definition for ${ref}.`);
    }
    const current: JSONSchema7 = jsonpointer.get(rootSchema, ref);
    if (current === undefined) {
        throw new Error(`Could not find a definition for ${ref}.`);
    }
    if (current.$ref) {
        const subSchema = findSchemaDefinition(current.$ref!, rootSchema);
        if (Object.keys(current).length > 1) {
            return {...omit(current, ["$ref"]), ...subSchema};
        }
        return subSchema;
    }
    return current;
}
