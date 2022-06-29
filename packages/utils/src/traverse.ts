import {JSONSchema7} from "json-schema";
import _traverse from "@json-schema-tools/traverse";
import _ from "lodash"

const ignore = {
    additionalItems: true,
    items: true,
    contains: true,
    additionalProperties: true,
    propertyNames: true,
    not: true,
    if: true,
    then: true,
    else: true,
    allOf: true,
    anyOf: true,
    oneOf: true,
    $defs: true,
    definitions: true,
    properties: true,
    patternProperties: true,
    dependencies: true,
    "^\d+$": true
};

const ignorePaths = Object.keys(ignore).join('|');

export const traverse = (_schema: JSONSchema7, _additionalSchemas: { [k: string]: {} }, handler: (arg0: JSONSchema7, arg1: { [k: string]: {} }) => { [k: string]: {} }): JSONSchema7 => {
    return _traverse(_schema || {}, (schemaOrSubschema: JSONSchema7, _b: boolean, _path: string) => {
        const propertyPath = _path.replace(new RegExp(ignorePaths, "g"), "").split("/")
            .filter(x => x !== "")
            .map(x => "$" + x);

        let _additionalSubSchemas;
        if (propertyPath.length > 0) {
            _additionalSubSchemas = Object.entries(_additionalSchemas).map(([k, v]) => ({[k]: _.get(v, propertyPath)}))
                .reduce((a, b) => ({...a, ...b}));
        } else {
            _additionalSubSchemas = _additionalSchemas;
        }
        const mutation = handler(schemaOrSubschema, _additionalSubSchemas);
        if (mutation) {
            const {schema = schemaOrSubschema, ..._mutatedSubschemas} = mutation;
            if(propertyPath.length === 0) {
                _.merge(_additionalSchemas, _mutatedSubschemas);
            }
            else {
                Object.entries(_mutatedSubschemas).forEach(([k, v]) => _.set(_additionalSchemas[k], propertyPath, v))
            }
            return schema;
        }
        return schemaOrSubschema;
    }, {bfs: true, mutable: true});
}