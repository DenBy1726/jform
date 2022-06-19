import React, {PropsWithChildren, useMemo} from "react"
import {SchemaProps} from "@jform/core";
import {retrieveSchema} from "./reference";


export default function Schema(props: PropsWithChildren<SchemaProps>) {
    const {template, schema, data} = props;

    const FieldTemplate: React.FunctionComponent = template?.common?.field?.layout || (() => <></>)

    const computedSchema = useMemo(() => retrieveSchema(schema, schema, data), [schema, data]);

    return <FieldTemplate>
        {JSON.stringify(computedSchema)} - {data}
    </FieldTemplate>;
}