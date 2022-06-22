import React, {PropsWithChildren} from "react"
import {FieldLayoutProps} from "@jform/core";

export default (props: PropsWithChildren<FieldLayoutProps>) => {
    const {
        title,
        titleProps,
        description,
        descriptionProps,
        help,
        helpProps,
        errors,
        errorsProps,
        hidden,
        children,
    } = props;

    const Title = title;
    const Description = description;
    const Help = help;
    const Errors = errors;

    if (hidden) {
        return <div className="jform-hidden">{children}</div>;
    }

    return (
        <div className="jform-field-layout-root">
            {titleProps.display !== false && <Title {...titleProps} />}
            {descriptionProps.display !== false && <Description {...descriptionProps}/>}
            {children}
            {errorsProps.display !== false && <Errors {...errorsProps}/>}
            {helpProps.display !== false && <Help {...helpProps}/>}
        </div>
    );
}