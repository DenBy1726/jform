import React from "react"
import {IFrame} from "../common/iframe/IFrame";
import {Form} from "../common/Form";
import {useStoreState} from "easy-peasy";
import {withErrorBoundary, useErrorBoundary} from "./error/ErrorBoundary";

export const DemoForm = withErrorBoundary(({height, ...props}) => {
    const selectedStyles = useStoreState(state => state.theme.selectedStyles)
    const [error, resetError] = useErrorBoundary();
    if (error) {
        setTimeout(() => resetError(), 1000)
        return error.toString();
    }
    return <IFrame height={height}>
        <link rel="stylesheet" href={selectedStyles}/>
        <Form {...props}/>
    </IFrame>
})