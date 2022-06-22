import React, {PropsWithChildren, useMemo} from "react";
import Schema from "./schema";
import {FormProps} from "@jform/core";
import {merge} from "lodash"
import getDefaultTemplate from "./schema/defaultTemplate";

export default function Form(props: PropsWithChildren<FormProps>) {
    let {data, schema, template, ...other} = props;

    const computedTemplate = useMemo(() => merge(getDefaultTemplate(), template), [template]);
    const computedSchema = useMemo(() => merge({}, schema), [schema]);

    return <Schema data={data} schema={computedSchema} template={computedTemplate} {...other}/>
}
