import {toConstant} from '../src';

describe('toConstant()', () => {

    it(`should extract const from one element enum`, () => {
        expect(toConstant({enum: ["1"]})).toEqual("1");
    })

    it(`should extract const from "const" prop`, () => {
        expect(toConstant({const: 1})).toEqual(1);
    })

    it(`should throw error if cannot infer const from schema`, () => {
        expect(() => toConstant({type: "string"})).toThrow("schema cannot be inferred as a constant");
    })

});