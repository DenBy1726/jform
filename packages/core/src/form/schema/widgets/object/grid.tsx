import {ObjectWidgetProps} from "./index";
import React from "react";
import Schema from "../../Schema";
import {JSONSchema7} from "json-schema";
import {Container, Row, Col} from 'react-grid';


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

const canExpand = (schema: JSONSchema7, data: any, handler: Function) => {
    if (!handler) {
        return false;
    }
    if (!schema.additionalProperties) {
        return false;
    }

    if (schema.maxProperties !== undefined) {
        return Object.keys(data).length < schema.maxProperties;
    }
    return true;
}

const styles = {
    breakpoints: {xs: 0, sm: 576, md: 768, lg: 992, xl: 1200},
    containerMaxWidths: {sm: 540, md: 720, lg: 960, xl: 1140},
    columns: 24,
    gutterWidth: 0
};

const defaultLayout = (properties: any) => Object.keys(properties).map(x => ({[x]: {md: 12}}))

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

    //@ts-ignore
    const {
        itemClassName,
        additionalItemClassName,
        actionsClassName,
        actionClassName,
        addKeyButton,
        removeKeyButton,
        layout = defaultLayout(properties)
    } = widget;
    const {onAddKey, onRemoveKey} = events;

    //@ts-ignore
    return <Container styles={styles} autoFocus={autofocus} required={required} disabled={disabled}
                      className={className} id={id}
                      style={style}>
        {
            layout.map((row: any, index: any) => {
                return <Row styles={styles} key={index}>
                    {
                        Object.keys(row).map((name: any) => {
                            if (properties[name]) {
                                const rowProps = row[name]
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

                                return <Col styles={styles} {...rowProps} key={name} style={style}
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
                        })
                    }
                </Row>
            })
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