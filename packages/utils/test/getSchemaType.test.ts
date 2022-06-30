import {getSchemaType} from '../src';

const cases: { schema: object; expected: string }[] = [
    {
        schema: {type: 'string'},
        expected: 'string',
    },
    {
        schema: {type: 'number'},
        expected: 'number',
    },
    {
        schema: {type: 'integer'},
        expected: 'integer',
    },
    {
        schema: {type: 'object'},
        expected: 'object',
    },
    {
        schema: {type: 'array'},
        expected: 'array',
    },
    {
        schema: {type: 'boolean'},
        expected: 'boolean',
    },
    {
        schema: {type: 'null'},
        expected: 'null',
    },
    {
        schema: {const: 'foo'},
        expected: 'string',
    },
    {
        schema: {const: 1},
        expected: 'number',
    },
    {
        schema: {type: ['string', 'null']},
        expected: 'string',
    },
    {
        schema: {type: ['null', 'number']},
        expected: 'number',
    },
    {
        schema: {type: ['integer', 'null']},
        expected: 'integer',
    },
    {
        schema: {properties: {}},
        expected: 'object',
    },
    {
        schema: {},
        expected: 'string',
    },
    {
        schema: {additionalProperties: {}},
        expected: 'object',
    },
    {
        schema: {enum: ['foo']},
        expected: 'string',
    },
    {
        schema: {enum: [1]},
        expected: 'number',
    },
    {
        schema: {enum: [false]},
        expected: 'boolean',
    },
    {
        schema: {enum: []},
        expected: 'string',
    }
];

describe('getSchemaType()', () => {
    for (const test of cases) {
        it(`${JSON.stringify(test.schema)} should guess type of ${test.expected}`, () => {
            expect(getSchemaType(test.schema)).toEqual(test.expected);
        })
    }
});