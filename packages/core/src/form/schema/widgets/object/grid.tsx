import {ObjectWidgetProps} from "./index";
import React from "react";
import Schema from "../../Schema";
//@ts-ignore
import {Col, Container, Row} from 'react-grid';
import {canExpand, renderLayout} from "@jform/utils";
import {defaultLayout, defaultLayoutStyles} from "../../templates/layout";
import {isArray} from "lodash";


const handleRemoveKey = (handler: Function, name: string, data: object, onChange: Function) => {
    return () => {
        const result = handler({
            name, data, removeKey: () => {
                //@ts-ignore
                const {[name]: removed, ...result} = data;
                return result;
            }
        });
        onChange(result);
    }
}

const handleAddKey = (handler: Function, data: object, onChange: Function) => {
    return () => {
        const item = handler();
        onChange({...data, ...item});
    }
}

const GridWidget = (props: ObjectWidgetProps) => {
    const {
        autofocus,
        disabled,
        properties = {},
        className,
        required,
        id,
        style,
        widget,
        events,
        schema,
        value: data,
        onChange: onChangeObject
    } = props;

    const {
        itemClassName,
        additionalItemClassName,
        actionsClassName,
        actionClassName,
        addKeyButton,
        removeKeyButton,
        layout = defaultLayout(properties)
    }: any = widget;
    const {onAddKey, onRemoveKey} = events;

    let _layout;
    if(isArray(layout)) {
        _layout = layout;
    } else {
        _layout = defaultLayout(properties, layout);
    }

    //@ts-ignore
    return <Container styles={defaultLayoutStyles()} autoFocus={autofocus} required={required} disabled={disabled}
                      className={className} id={id}
                      style={style}>
        {
            renderLayout(_layout, ((name, rowProps) => {
                const {optional, render, ...other} = rowProps;
                let _style = style || {};

                //@ts-ignore
                const isFilled = (fieldName: string) => !!(data[fieldName] && data[fieldName].length)
                //@ts-ignore
                const isTrue = (fieldName: string) => (data[fieldName])

                const optionalApi = {
                    isFilled,
                    isTrue
                }

                if (optional && !optional({data, ...optionalApi})) {
                    _style = {display: 'none'}
                }
                if (render) {
                    const UIComponent = render;
                    return (
                        <Col {...other} key={name} style={_style}>
                            <UIComponent
                                /*
                                @ts-ignore */
                                data={data} key={name} name={name} required={required} schema={schema}
                                configSchema={props.configSchema}
                                {...(properties?.[name] || {})}
                            />
                        </Col>
                    )
                } else if (properties[name]) {
                    const {
                        onChange,
                        onBlur,
                        onFocus,
                        value,
                        schema,
                        required,
                        configSchema,
                        eventSchema,
                        readSchema,
                        isAdditional
                    } = properties[name];

                    return <Col styles={defaultLayoutStyles()} {...other} key={name} style={_style}
                                className={[itemClassName, isAdditional && additionalItemClassName].filter(x => x && x.length > 0).join(" ")}>
                        <Schema
                            key={name}
                            name={name}
                            required={required}
                            schema={schema}
                            configSchema={configSchema}
                            eventSchema={eventSchema}
                            readSchema={readSchema}
                            data={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            onFocus={onFocus}
                        >
                            {isAdditional && onRemoveKey &&
                                <button className={removeKeyButton}
                                        onClick={handleRemoveKey(onRemoveKey, name, data, onChangeObject)}>Delete</button>
                            }
                        </Schema>
                    </Col>

                } else {
                    return null;
                }
            }), ((children, index) => {
                return <Row styles={defaultLayoutStyles()} key={index}>{children}</Row>;
            }))
        }
        {
            canExpand(schema, data, onAddKey) &&
            <div className={actionsClassName}>
                <p className={actionClassName}>
                    <button className={addKeyButton} onClick={handleAddKey(onAddKey, data, onChangeObject)}>Add
                    </button>
                </p>
            </div>
        }
    </Container>
}

export default GridWidget;