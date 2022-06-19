import React, {Component} from "react";
import Schema from "./schema";
import {FormProps} from "@jform/core";
import {merge} from "lodash"
import defaultTemplate from "./defaultTemplate";

export default class Form extends Component<FormProps> {

    render() {
        let {data, schema, template} = this.props;

        template = merge(template, defaultTemplate);


        return <Schema data={data} schema={schema} template={template}>
            {data}
        </Schema>
    }
}