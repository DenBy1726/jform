import {JSONSchema7} from "json-schema";
import {resolveReference} from "../src";

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

describe('resolveReferences()', () => {
    it('should resolve', () => {
        const refSchema = {...schema, $ref: '#/definitions/extraNestedRef'}
        let resolved = resolveReference(refSchema,refSchema);
        expect(resolved.title).toEqual('foo');
    });
});