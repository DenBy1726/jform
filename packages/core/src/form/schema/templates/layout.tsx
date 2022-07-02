import React, {FunctionComponent, PropsWithChildren, ReactElement, useContext, useMemo} from "react"
import {ConfigSchema, FieldError, FieldHidden, FieldStaticInfo, FieldTitle, HtmlConfigurable} from "@jform/core";
import {DescriptionProps, ErrorProps, HelpProps, TitleProps} from "./index";
import {JFormContext} from "../../Form";
import {JSONSchema7TypeName} from "json-schema";
import {isArray} from "lodash";


export interface FieldLayoutProps extends HtmlConfigurable {
    title: FieldTitle,
    description: FieldStaticInfo<string, DescriptionProps>,
    help: FieldStaticInfo<string, HelpProps>,
    errors: FieldError,
    hidden?: FieldHidden,
    configSchema?: ConfigSchema,
    name?: string,
    type: JSONSchema7TypeName,
    render: (arg: any) => ReactElement,
    errorClassName: string,
    rootClassName: string,
}

const computeItem = (cfg: object, props: object, name: string) => {
    switch (typeof cfg) {
        case "function":
            return cfg(props);
        case "object":
            if (isArray(cfg)) {
                return cfg
            } else {
                //@ts-ignore
                return computeDynamicConfigurable(cfg, props[name])
            }
        default:
            return cfg;
    }
}

const computeDynamicConfigurable = (dyna: object, props: any): HtmlConfigurable | null => {
    if (dyna === null) {
        return null;
    }
    return Object.entries(dyna).map(([_name, cfg]) => ({[_name]: computeItem(cfg, props, _name)})).reduce((a, b) => ({...a, ...b}));
}

const getFieldItemHandler = (item: FieldStaticInfo<any, any>, _def: FunctionComponent, type?: FunctionComponent): FunctionComponent<any> => {
    const {template, ...otherProps} = item;
    if (template) {
        return (props) => template({...props, ...otherProps});
    } else {
        const def = type || _def;
        return (props) => {
            let merged = {...props, ...otherProps};
            let mergedItem = computeDynamicConfigurable(item, merged);
            return def({...merged, ...mergedItem})
        }
    }
}

export const layoutRender = ({Title, Description, children, Errors, Help}: any) => <><Title/> <Description/> {children}
    <Errors/> <Help/></>;

export default (props: PropsWithChildren<FieldLayoutProps>) => {
    const {
        title,
        description,
        help,
        errors,
        hidden,
        children,
        name,
        type,
        className = "",
        errorClassName = "",
        rootClassName = "",
        style,
        id,
        tag: Tag = "div",
        render = layoutRender
    } = props;

    const {template} = useContext(JFormContext);

    const TitleField: FunctionComponent<TitleProps> = useMemo(() =>
        getFieldItemHandler(title, template!.common!.field!.title as FunctionComponent, template?.type?.[type]?.title), [title]);
    const DescriptionField: FunctionComponent<DescriptionProps> = useMemo(() =>
        getFieldItemHandler(description, template!.common!.field!.description, template?.type?.[type]?.description), [description]);
    const HelpField: FunctionComponent<HelpProps> = useMemo(() =>
        getFieldItemHandler(help, template!.common!.field!.help, template?.type?.[type]?.help), [help]);
    const ErrorsField: FunctionComponent<ErrorProps> = useMemo(() =>
        getFieldItemHandler(errors, template!.common!.field!.error, template?.type?.[type]?.error), [errors]);

    if (hidden?.enable === true) {
        const {className = "", id, style} = hidden;
        return <div className={className} id={id} style={style}>{children}</div>;
    }

    let errorClass = "";
    //@ts-ignore
    if (errors?.display !== false && errors?.text?.length > 0) {
        errorClass = errorClassName;
    }

    return (
        //@ts-ignore
        <Tag
            className={`${[name ? undefined : rootClassName, className, errorClass].filter(x => x && x.length > 0).join(" ")}`}
            style={style} id={id}>
            {
                render({
                    Title: title.display !== false && (() => <TitleField key="title" name={name}/>),
                    Description: description.display !== false && (() => <DescriptionField key="description"/>),
                    children,
                    Errors: errors.display !== false && (() => <ErrorsField key="errors"/>),
                    Help: help.display !== false && (() => <HelpField key="help"/>)
                })}
        </Tag>
    );
}