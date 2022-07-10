import React from "react"
import {getWidget} from '../src';

describe('getWidget()', () => {

    it(`should support widget as function`, () => {
        const widget = getWidget('string', () => <>bar</>, {});
        const result = widget({}, {});
        expect(result?.props?.children).toEqual('bar');
    })

    it(`should find definition by type`, () => {
        const widget = getWidget('string', 'bar', {
            string: {
                bar: () => <>bar</>
            }
        });
        const result = widget({}, {});
        expect(result?.props?.children).toEqual('bar');
    })

    it(`should throw if not found`, () => {
        expect(() => getWidget('string', 'bar', {})).toThrow('No widget \"bar\" for type string');
    })

    it(`should throw if not found with more informative message`, () => {
        expect(() => getWidget('string', 'bar', {
            string: {
                baz: () => {
                },
                foo: () => {
                }
            }
        })).toThrow('No widget \"bar\" for type string. Supported: baz,foo');
    })

    it(`should throw if no widgets specified`, () => {
        expect(() => getWidget('string', 'bar', undefined)).toThrow('No widget \"bar\" for type string');
    })

    it(`should access widget default for type if widget property not set`, () => {
        const widget = getWidget('string', undefined, {
            string: {
                bar: () => <>bar</>
            }
        }, {
            type: {
                string: {
                    configSchema: {
                        widget: {
                            type: "bar"
                        }
                    }
                }
            }
        });
        const result = widget({}, {});
        expect(result?.props?.children).toEqual('bar');
    })

});