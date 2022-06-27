import {toConstant} from "./index";
import {JSONSchema7} from "json-schema";

export interface SelectOption<T> {
    schema?: JSONSchema7,
    label: string,
    value: T,
}

interface ConfigWithEnums {
    [k: string]: any,
    enumNames?: string[]
}

export const getOptions = <T extends any>(schema: JSONSchema7, configSchema?: ConfigWithEnums): SelectOption<T>[] | undefined => {
    if (schema.enum) {
        return schema.enum.map((value, i) => {
            const label = (configSchema?.enumNames && configSchema?.enumNames[i]) || String(value);
            return {label, value} as SelectOption<T>;
        });
    } else {
        const altSchemas = schema.oneOf || schema.anyOf;
        return altSchemas?.map(schema => {
            const value = toConstant(schema as JSONSchema7);
            const label = (schema as JSONSchema7).title || String(value);
            return {
                schema,
                label,
                value,
            } as SelectOption<T>;
        });
    }
}