import React from "react"
import {FormTemplate} from "@jform/core";
import layout from "./layout";
import title from "./title";
import {cloneDeep} from "lodash";
import help from "./help";
import description from "./description";
import error from "./error";

const defaultTemplate: FormTemplate = {
    common: {
        field: {
            layout: layout,
            title: title,
            description: description,
            help: help,
            error: error,
            state: {
                view: ({children}) => <>{children}</>,
                loading: ({children}) => <>{children}</>,
            }
        },
        actions: ({children}) => <>{children}</>,
        button: ({children}) => <>{children}</>,
        error: ({children}) => <>{children}</>,
        tip: ({children}) => <>{children}</>
    }
}

export default (): FormTemplate => cloneDeep(defaultTemplate);