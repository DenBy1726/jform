//@ts-nocheck
import {isSelect } from '../src';

describe('isSelect()', () => {

    it('should be false if items is undefined', () => {
        const schema = {};
        expect(isSelect(schema)).toBe(false);
    });

    describe('schema items enum is not an array', () => {
        it('should be false if oneOf/anyOf schemas are not all constants', () => {
            const schema = {
                anyOf: [{ type: 'string', enum: ['Foo'] }, { type: 'string' }],
            };
            expect(isSelect(schema)).toBe(false);
        });

        it('should be true if oneOf/anyOf schemas are all constants', () => {
            const schema = {
                oneOf: [{ type: 'string', enum: ['Foo'] }, { type: 'string', enum: ['Foo'] }],
            };
            expect(isSelect(schema)).toBe(true);
        });
    });

    it('should retrieve reference schema definitions', () => {
        const schema = {
            definitions : {
                FooItem: { type: 'string', enum: ['foo'] },
            },
            $ref: '#/definitions/FooItem',
        };
        expect(isSelect(schema)).toBe(true);
    });
});