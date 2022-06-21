import {isObject} from "@jform/utils/index";
import {JSONSchema7} from "json-schema";
import {retrieveSchema} from "../reference";

export const resolveProperties = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 => {
    const properties = {};

    //@ts-ignore
    Object.entries(schema.properties).forEach(([propName,propSchema]) => {
        //@ts-ignore
        const rawPropData = data && data[propName];
        const propData = isObject(rawPropData) ? rawPropData : {};
        const resolvedPropSchema = retrieveSchema(propSchema, rootSchema, propData);

        //@ts-ignore
        properties[propName] = resolvedPropSchema;

        if (propSchema !== resolvedPropSchema && schema.properties !== properties) {
            schema = {...schema, properties};
        }
    });
    return schema;
}