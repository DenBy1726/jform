import {JSchema} from "@jform/core";

const strOrFunc = (arg: any): boolean => {
    return typeof arg === "string" || typeof arg === "function";
}

const arrayOrFunc = (arg: any): boolean => {
    return Array.isArray(arg) || typeof arg === "function";
}

export const canonizationRules: ((arg: JSchema) => JSchema | undefined)[] = [
    ({configSchema}) => strOrFunc(configSchema?.widget) ? {configSchema: {widget: {type: configSchema?.widget}}} as JSchema : undefined,
    ({configSchema}) => strOrFunc(configSchema?.help) ? {configSchema: {help: {text: configSchema?.help}}} as JSchema : undefined,
    ({configSchema}) => strOrFunc(configSchema?.description) ? {configSchema: {description: {text: configSchema?.description}}} as JSchema : undefined,
    ({configSchema}) => strOrFunc(configSchema?.title) ? {configSchema: {title: {text: configSchema?.title}}} as JSchema : undefined,
    ({configSchema}) => arrayOrFunc(configSchema?.error) ? {configSchema: {error: {text: configSchema?.error}}} as JSchema : undefined,
    ({configSchema}) => configSchema?.hidden === true ? {configSchema: {hidden: {enable: true}}} as JSchema : undefined
]