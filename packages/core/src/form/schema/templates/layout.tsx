import React, {FunctionComponent, PropsWithChildren, useContext, useMemo} from "react"
import {ConfigSchema, FieldError, FieldHidden, FieldStaticInfo, FieldTitle, HtmlConfigurable} from "types";
import {DescriptionProps, ErrorProps, HelpProps, TitleProps} from "./index";
import {JFormContext} from "../../Form";
import {JSONSchema7TypeName} from "json-schema";
import {isArray} from "lodash";
//@ts-ignore
import {Container, Row, Col} from 'react-grid';
import {renderLayout} from "@jform/utils";


export interface FieldLayoutProps extends HtmlConfigurable {
    title: FieldTitle,
    description: FieldStaticInfo<string, DescriptionProps>,
    help: FieldStaticInfo<string, HelpProps>,
    errors: FieldError,
    hidden?: FieldHidden,
    configSchema?: ConfigSchema,
    name?: string,
    type: JSONSchema7TypeName,
    render: any,
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

export const defaultLayoutStyles = () => ({
    breakpoints: {xs: 0, sm: 576, md: 768, lg: 992, xl: 1200},
    containerMaxWidths: {sm: 540, md: 720, lg: 960, xl: 1140},
    columns: 12,
    gutterWidth: 0
});

export const defaultLayout = (properties: any, config = ({md: 12})) => Object.keys(properties).map(x => ({[x]: {...config}}))

export const defaultLayoutRender = [
    {
        title: {},
        children: {}
    },
    {
        description: {}
    },
    {
        help: {}
    },
    {
        errors: {}
    }
]

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
        render
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
        return <div className={className} id={id} style={style}/>;
    }

    let errorClass = "";
    //@ts-ignore
    if (errors?.display !== false && errors?.text?.length > 0) {
        errorClass = errorClassName;
    }

    const rowElements: any = {
        title: title.display !== false && (() => <TitleField key="title" name={name}/>),
        description: description.display !== false && (() => <DescriptionField key="description"/>),
        errors: errors.display !== false && (() => <ErrorsField key="errors"/>),
        help: help.display !== false && (() => <HelpField key="help"/>),
        children: () => children
    }

    let _render;
    if (typeof render === "function") {
        _render = render({
            Title: rowElements.title,
            Description: rowElements.description,
            children: rowElements.children(),
            Errors: rowElements.errors,
            Help: rowElements.help
        })
    } else {
        _render = renderLayout(render || defaultLayout(rowElements),
            (name, rowProps) => <Col styles={defaultLayoutStyles()} {...rowProps}
                                     key={name || "root"}>{rowElements[name]()}</Col>,
            ((children, index) => <Row styles={defaultLayoutStyles()} key={index}>{children}</Row>))
    }

    return (
        //@ts-ignore
        <Tag
            className={`${[name ? undefined : rootClassName, className, errorClass].filter(x => x && x.length > 0).join(" ")}`}
            style={style} id={id}>
            <Container styles={defaultLayoutStyles()}>
                {_render}
            </Container>
        </Tag>
    );
}