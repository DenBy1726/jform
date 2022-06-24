import React, {FunctionComponent, PropsWithChildren} from "react"
import {JSONSchema7TypeName} from "json-schema";
import string from "./string";

const types : { [k in JSONSchema7TypeName as string]: FunctionComponent<PropsWithChildren<any>>} = {
    string: string,
    number: ({children}) => <>{children}</>,
    integer: ({children}) => <>{children}</>,
    boolean: ({children}) => <>{children}</>,
    object: ({children}) => <>{children}</>,
    array: ({children}) => <>{children}</>,
    null: ({children}) => <>{children}</>
};

export default types;