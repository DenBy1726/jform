import {getOptions} from '../src';

describe('getOptions()', () => {

    it(`should collect data from enum`, () => {
        expect(getOptions({enum: [1, 2, 3]})).toEqual([
            {
                label: "1",
                value: 1
            },
            {
                label: "2",
                value: 2
            },
            {
                label: "3",
                value: 3
            }
        ]);
    })

    it(`should support labels from  config`, () => {
        expect(getOptions({enum: [1, 2, 3]}, {enumNames: ["foo", "bar", "baz"]})).toEqual([
            {
                value: 1,
                label: "foo"
            },
            {
                value: 2,
                label: "bar"
            },
            {
                value: 3,
                label: "baz"
            }
        ]);
    })

    it(`should extract from oneOf schema`, () => {
        expect(getOptions({
            oneOf: [
                {
                    title: "foo",
                    const: 1
                },
                {
                    title: "bar",
                    const: 2
                },
                {
                    title: "baz",
                    const: 3
                },
            ]
        })).toEqual([
            {
                value: 1,
                label: "foo",
                schema: {
                    title: "foo",
                    const: 1
                }
            },
            {
                value: 2,
                label: "bar",
                schema: {
                    title: "bar",
                    const: 2
                }
            },
            {
                value: 3,
                label: "baz",
                schema: {
                    title: "baz",
                    const: 3
                }
            }
        ]);
    })

    it(`should extract from oneOf schema`, () => {
        expect(getOptions({
            anyOf: [
                {
                    title: "foo",
                    const: 1
                },
                {
                    title: "bar",
                    const: 2
                },
                {
                    title: "baz",
                    const: 3
                },
            ]
        })).toEqual([
            {
                value: 1,
                label: "foo",
                schema: {
                    title: "foo",
                    const: 1
                }
            },
            {
                value: 2,
                label: "bar",
                schema: {
                    title: "bar",
                    const: 2
                }
            },
            {
                value: 3,
                label: "baz",
                schema: {
                    title: "baz",
                    const: 3
                }
            }
        ]);
    })


});