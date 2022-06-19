import React from "react"
import {FormTemplate} from "@jform/core";

const defaultTemplate: FormTemplate = {
    common: {
        field: {
            layout: ({children}) => <>{children}</>,
            title: ({children}) => <>{children}</>,
            description: ({children}) => <>{children}</>,
            help: ({children}) => <>{children}</>,
            error: ({children}) => <>{children}</>,
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

export default defaultTemplate;