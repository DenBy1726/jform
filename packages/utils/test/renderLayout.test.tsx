import React from "react"
import {renderLayout} from '../src';

describe('renderLayout()', () => {
    it('should render rows', () => {
        const layout = renderLayout([{},{},{}], () => <div/>, () => <div/>)
        expect(layout.length).toEqual(3);
    });

    it('should render columns', () => {
        const layout = renderLayout([{a: {}, b: {}}], () => <div/>, (children, i) => <div key={i}>{children}</div>)
        expect(layout.length).toEqual(1);
        expect(layout[0].props.children.length).toEqual(2);
    });

});