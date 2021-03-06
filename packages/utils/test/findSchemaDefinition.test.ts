import {JSONSchema7} from "json-schema";
import {findSchemaDefinition} from "../src";

const schema: JSONSchema7 = {
    type: 'object',
    definitions: {
        stringRef: {
            type: 'string'
        },
        nestedRef: {
            $ref: '#/definitions/stringRef'
        },
        extraNestedRef: {
            $ref: '#/definitions/stringRef',
            title: 'foo',
        }
    }
};

const EXTRA_EXPECTED = { type: 'string', title: 'foo' };

describe('findSchemaDefinition()', () => {
    it('throws error when ref is malformed', () => {
        expect(() => findSchemaDefinition('definitions/missing')).toThrowError(
            'Could not find a definition for definitions/missing'
        );
    });
    it('throws error when ref does not exist', () => {
        expect(() => findSchemaDefinition('#/definitions/missing', schema)).toThrowError(
            'Could not find a definition for /definitions/missing'
        );
    });
    it('returns the string ref from its definition', () => {
        expect(findSchemaDefinition('#/definitions/stringRef', schema)).toBe(schema.definitions!.stringRef);
    });
    it('returns the string ref from its nested definition', () => {
        expect(findSchemaDefinition('#/definitions/nestedRef', schema)).toBe(schema.definitions!.stringRef);
    });
    it('returns a combined schema made from its nested definition with the extra props', () => {
        expect(findSchemaDefinition('#/definitions/extraNestedRef', schema)).toEqual(EXTRA_EXPECTED);
    });
});