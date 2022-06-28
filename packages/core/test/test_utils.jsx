import React from "react";
import sinon from "sinon";
import {renderIntoDocument, act, Simulate} from "react-dom/test-utils";
import {findDOMNode, render} from "react-dom";

import Form from "../src";
import {cloneDeep} from "lodash";

export function createComponent(Component, props) {
    // const onChange = sinon.spy();
    // const onError = sinon.spy();
    // const onSubmit = sinon.spy();
    const comp = renderIntoDocument(
            <Component
                //         onSubmit={onSubmit}
                // onError={onError}
                // onChange={onChange}
                {...props}
            />
    );
    const node = findDOMNode(comp).parentNode;
    // return { comp, node, onChange, onError, onSubmit };
    return {comp, node};

}

export class TestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = cloneDeep(this.props);
    }
    render() {
        return <Form {...this.state} ></Form>
    }
}

export function createFormComponent(props) {
    return createComponent(TestForm, {...props});
}

export function createSandbox() {
    const sandbox = sinon.createSandbox();
    return sandbox;
}

export function setProps(node, newProps) {
    render(
        <div><Form  {...newProps} /></div>
        , node);
}

export function submitForm(node) {
    act(() => {
        Simulate.submit(node);
    });
}