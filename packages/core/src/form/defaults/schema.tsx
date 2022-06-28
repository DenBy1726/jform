import {ConfigSchema, JSchema} from "@jform/core";
import {traverse} from "@jform/utils/traverse";
import {JSONSchema7} from "json-schema";
import {merge} from "lodash";
import {getSchemaType} from "@jform/utils/getSchemaType";
import {mergeSchemas} from "@jform/utils/mergeSchemas";
import {FormProps} from "form/Form";
import {canonizationRules, Defaults} from "./";


const _applyDefaults = (_schema: JSchema, defaults: Defaults): JSchema => {
    let {schema, ...additional} = _schema;
    const rules = [...(defaults?.rules || []), ...canonizationRules];
    // @ts-ignore
    schema = traverse(schema as JSONSchema7, additional, (schema, other) => {
        return rules.map(x => x({schema, ...other})).reduce((a, b) => merge(a, b))
    });
    //@ts-ignore
    schema = traverse(schema as JSONSchema7, additional, (schema, other) => {
        let type = getSchemaType(schema);
        let mergeCases: any = {defined: {schema, ...other}, common: defaults.common};

        if (Array.isArray(type)) {
            type = type[0];
        }
        if (defaults?.type?.[type]) {
            const {schema: mergeSchema, configSchema = {}, ...mergeOther} = defaults.type[type] || {};
            mergeCases.type = {schema: mergeSchema, configSchema, ...mergeOther};

            const futureType = type || defaults.common?.schema?.type;
            //@ts-ignore
            const futureWidget = (other?.configSchema as ConfigSchema)?.widget?.type || configSchema?.widget?.type;

            if (typeof futureWidget === 'string' && defaults?.widget?.[futureType]?.[futureWidget]) {
                const {schema: mergeSchema, ...mergeOther} = defaults?.widget?.[futureType]?.[futureWidget] || {};
                mergeCases.widget = {schema: mergeSchema, ...mergeOther};
            }
        }
        ({schema, ...other} = Object.keys(mergeCases.defined)
            .map(x => ({
                    [x]: mergeSchemas(
                        mergeCases?.common?.[x],
                        mergeCases?.type?.[x],
                        mergeCases?.widget?.[x],
                        mergeCases?.defined?.[x],
                    )
                }
            ))
            .reduce((a, b) => ({...a, ...b})));
        return {schema, ...other};
    })
    return {schema, ...additional};
};

export const applyDefaults = (props: FormProps, defaults: Defaults): JSchema => {
    let {schema, configSchema, eventSchema, readSchema} = props;
    return _applyDefaults({schema, configSchema, eventSchema, readSchema}, defaults || {});
}