import {ConfigSchema, JSchema} from "types";
import {traverse, mergeSchemas, resolveReference} from "@jform/utils";
import {JSONSchema7, JSONSchema7TypeName} from "json-schema";
import {canonizationRules, Defaults} from "./";
import {defaultRules} from "./config";
import {cloneDeep} from "lodash";


const _applyDefaults = (_schema: JSchema, defaults: Defaults): Required<JSchema> => {
    let {schema, ...additional} = cloneDeep(_schema);
    schema = resolveReference(schema as JSONSchema7, schema as JSONSchema7);
    const rules = [...(defaults?.rules || []), ...(defaultRules || []), ...canonizationRules];
    // @ts-ignore
    schema = traverse(schema as JSONSchema7, additional, (schema, other) => {
        return rules.map(x => x({schema, ...other})).reduce((a, b) => mergeSchemas(a, b))
    });
    //@ts-ignore
    schema = traverse(schema as JSONSchema7, additional, (schema, other) => {
        let type = schema.type as JSONSchema7TypeName;
        let mergeCases: any = {defined: {schema, ...other}, common: defaults.common};

        if (defaults?.type?.[type]) {
            const {schema: mergeSchema, configSchema, ...mergeOther} = defaults.type[type] || {};
            mergeCases.type = {schema: mergeSchema, configSchema, ...mergeOther};

            //@ts-ignore
            const futureWidget = (other?.configSchema as ConfigSchema)?.widget?.type || configSchema?.widget?.type;

            if (typeof futureWidget === 'string' && defaults?.widget?.[type]?.[futureWidget]) {
                const {schema: mergeSchema, ...mergeOther} = defaults?.widget?.[type]?.[futureWidget] || {};
                mergeCases.widget = {schema: mergeSchema, ...mergeOther};
            }
        }
        //for const schema not merge schema
        const isTruthSchema = schema === true;
        if (schema.const || isTruthSchema) {
            if (mergeCases?.common?.schema) {
                mergeCases.common.schema = undefined;
            }
            if (mergeCases?.type?.schema) {
                mergeCases.type.schema = undefined;
            }
            if (mergeCases?.widget?.schema) {
                mergeCases.widget.schema = undefined;
            }
        }
        ({schema, ...other} = Object.keys(mergeCases.defined)
            .map(x => ({
                    [x]: mergeSchemas(
                        {},
                        mergeCases?.common?.[x],
                        mergeCases?.type?.[x],
                        mergeCases?.widget?.[x],
                        mergeCases?.defined?.[x],
                    )
                }
            ))
            .reduce((a, b) => ({...a, ...b})));
        if (isTruthSchema) {
            //@ts-ignore
            schema = true;
        }
        return {schema, ...other};
    })
    return {schema, ...additional} as Required<JSchema>;
};

export const applyDefaults = (props: JSchema, defaults: Defaults): Required<JSchema> => {
    return _applyDefaults(props, defaults);
}