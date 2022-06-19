import React, { Component } from "react";

interface FormProps {
    data: string,
    schema: string
}

export default class Form extends Component<FormProps> {

    render() {
        const {data} = this.props;
        return <div>
            {data}
        </div>
    }
}