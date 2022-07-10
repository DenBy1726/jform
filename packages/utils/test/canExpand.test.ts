import {canExpand} from '../src';
import {JSONSchema7} from "json-schema";

describe('canExpand()', () => {
    it('no additional properties', () => {
        expect(canExpand({}, {}, () => {
        })).toBe(false);
    });
    it('has additional properties', () => {
        const schema: JSONSchema7 = {
            additionalProperties: {
                type: 'string',
            },
        };
        expect(canExpand(schema, {}, () => {
        })).toBe(true);
    });
    it('has not event', () => {
        const schema: JSONSchema7 = {
            additionalProperties: {
                type: 'string',
            },
        };
        expect(canExpand(schema, {})).toBe(false);
    });
    it('does not exceed maxProperties', () => {
        const schema: JSONSchema7 = {
            maxProperties: 1,
            additionalProperties: {
                type: 'string',
            },
        };
        expect(canExpand(schema, {}, () => {
        })).toBe(true);
    });
    it('already exceeds maxProperties', () => {
        const schema: JSONSchema7 = {
            maxProperties: 1,
            additionalProperties: {
                type: 'string',
            },
        };
        const data = {
            foo: 'bar',
        };
        expect(canExpand(schema, data, () => {})).toBe(false);
    });
});