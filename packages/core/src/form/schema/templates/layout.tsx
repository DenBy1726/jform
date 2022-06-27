import React, {PropsWithChildren} from "react"
import {FieldError, FieldHidden, FieldStaticInfo, FieldTitle, HtmlConfigurable} from "@jform/core";
import {DescriptionProps, HelpProps, TitleProps, ErrorProps} from "./index";


export interface FieldLayoutProps extends HtmlConfigurable {
    title: React.FunctionComponent<TitleProps>,
    description: React.FunctionComponent<DescriptionProps>,
    help: React.FunctionComponent<HelpProps>,
    errors: React.FunctionComponent<ErrorProps>,
    titleProps: FieldTitle,
    descriptionProps: FieldStaticInfo<string, DescriptionProps>,
    helpProps: FieldStaticInfo<string, HelpProps>,
    errorsProps: FieldError,
    hidden?: FieldHidden,
    errorClassName?: string
}


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
        className = "",
        errorClassName = "",
        style,
        id
    } = props;

    const Title = title;
    const Description = description;
    const Help = help;
    const Errors = errors;

    if (hidden?.enable === true) {
        const {className = "", id, style} = hidden;
        return <div className={className} id={id} style={style}>{children}</div>;
    }

    let errorClass = "";
    //@ts-ignore
    if (errorsProps?.display !== false && errorsProps?.text?.length > 0) {
        errorClass = errorClassName;
    }

    return (
        <div className={`${[className, errorClass].filter(x => x?.length > 0).join(" ")}`} style={style} id={id}>
            {titleProps.display !== false && <Title {...titleProps} />}
            {descriptionProps.display !== false && <Description {...descriptionProps}/>}
            {children}
            {errorsProps.display !== false && <Errors {...errorsProps}/>}
            {helpProps.display !== false && <Help {...helpProps}/>}
        </div>
    );
}