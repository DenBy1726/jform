import React from "react"
import {FormTemplate} from "@jform/core";
import layout from "./templates/layout";
import title from "./templates/title";
import {cloneDeep} from "lodash";
import help from "./templates/help";
import description from "./templates/description";
import error from "./templates/error";

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