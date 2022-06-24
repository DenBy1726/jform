//@ts-nocheck
import {traverse} from '../src';
import {JSONSchema7} from "json-schema";
import _ from "lodash";

describe('traverse()', () => {

    const schema: JSONSchema7 = {
        title: "baz",
        type: "object",
        properties: {
            foo: {
                title: "foo",
                type: "array",
                items: {type: "string"}
            },
            bar: {
                title: "bar",
                anyOf: [
                    {title: "stringerific", type: "string"},
                    {title: "numberoo", type: "number"}
                ]
            }
        }
    };


    const configSchema = {};
    const barSchema = {
        $foo: "foo"
    };

    it('should not touch if return undefined', () => {

        const schemaCopy1 = _.cloneDeep(schema);
        const schemaCopy2 = _.cloneDeep(schema);

        const configSchemaCopy1 = _.cloneDeep(configSchema);
        const configSchemaCopy2 = _.cloneDeep(configSchema);

        const barSchemaCopy1 = _.cloneDeep(barSchema);
        const barSchemaCopy2 = _.cloneDeep(barSchema);

        traverse(schemaCopy1, {configSchemaCopy1, barSchemaCopy1}, (schema, {configSchema, barSchema}) => {
        })

        expect(schemaCopy1).toEqual(schemaCopy2);
        expect(configSchemaCopy1).toEqual(configSchemaCopy2);
        expect(barSchemaCopy1).toEqual(barSchemaCopy2);
    })

    it('should mutate if return (1)', () => {
        const schemaCopy1 = _.cloneDeep(schema);
        const configSchemaCopy1 = _.cloneDeep(configSchema);
        const barSchemaCopy1 = _.cloneDeep(barSchema);

        traverse(schemaCopy1, {configSchemaCopy1, barSchemaCopy1}, (schema, {configSchemaCopy1, barSchemaCopy1}) => {
            schema.touched = true;
            return {schema, configSchemaCopy1: configSchemaCopy1 || {}, barSchemaCopy1: barSchemaCopy1 || 42}
        })

        expect(schemaCopy1.properties.bar.touched).toEqual(true);
        expect(configSchemaCopy1.$bar.$0).not.toBeUndefined();
        expect(barSchemaCopy1.$foo).toEqual("foo");
        expect(barSchemaCopy1.$bar.$0).toEqual(42);

    })

});

