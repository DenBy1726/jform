import {JSONSchema7} from "json-schema";
import {
    resolveDependencies,
    getMatchingOption,
    isObject,
    mergeSchemas,
    getSchemaType,
    retrieveSchema,
    findSchemaDefinition
} from "@jform/utils";

const _computeInitials = (_schema: JSONSchema7, parentDefaults: any, rootSchema: JSONSchema7, _data: any = {}): any => {
    let schema = isObject(_schema) ? _schema : {};
    const data = isObject(_data) ? _data : {};
    let defaults = parentDefaults;
    if (schema.$ref) {
        // Use referenced schema defaults for this node.
        const refSchema = findSchemaDefinition(schema.$ref, rootSchema);
        return _computeInitials(
            refSchema,
            defaults,
            rootSchema,
            data
        )
    } else if (schema.dependencies) {
        const resolvedSchema = resolveDependencies(schema, rootSchema, data);
        return _computeInitials(
            resolvedSchema,
            defaults,
            rootSchema,
            data
        );
    } else if (isObject(defaults) && isObject(schema.default)) {
        defaults = mergeSchemas(defaults, schema.default);
    } else if (schema.oneOf) {
        schema = schema.oneOf[getMatchingOption(undefined, schema.oneOf, rootSchema)] as JSONSchema7;
    } else if (schema.anyOf) {
        schema = schema.anyOf[getMatchingOption(undefined, schema.anyOf, rootSchema)] as JSONSchema7;
    }
    // Not defaults defined for this node, fallback to generic typed ones.
    if (defaults === undefined) {
        defaults = schema.default;
    }

    switch (getSchemaType(schema)) {
        // We need to recur for object schema inner default values.
        case "object":
            return Object.keys(schema.properties || {}).reduce((acc, key) => {
                // Compute the defaults for this node, with the parent defaults we might
                // have from a previous run: defaults[key].
                let computedDefault = _computeInitials(
                    schema.properties?.[key] as JSONSchema7,
                    (defaults || {})[key],
                    rootSchema,
                    (data || {})?.[key]
                );
                if (computedDefault !== undefined) {
                    //@ts-ignore
                    acc[key] = computedDefault;
                }
                return acc;
            }, {});
        case "array":
            // Inject defaults into existing array defaults
            if (Array.isArray(defaults)) {
                defaults = defaults.map((item, idx) => {
                    //@ts-ignore
                    return _computeInitials(schema.items?.[idx] || schema.additionalItems || {}, item, rootSchema);
                });
            }

            // Deeply inject defaults into already existing form data
            if (Array.isArray(data)) {
                defaults = data.map((item, idx) => {
                    return _computeInitials(
                        schema.items as JSONSchema7,
                        (defaults || {})[idx],
                        rootSchema,
                        item
                    );
                });
            }
    }
    return defaults;
};

const mergeDefaultsWithFormData = (defaults: any, data: any): any => {
    if (Array.isArray(data)) {
        if (!Array.isArray(defaults)) {
            defaults = [];
        }
        return data.map((value, idx) => {
            if (defaults[idx]) {
                return mergeDefaultsWithFormData(defaults[idx], value);
            }
            return value;
        });
    } else if (isObject(data)) {
        const acc = Object.assign({}, defaults); // Prevent mutation of source object.
        return Object.keys(data).reduce((acc, key) => {
            acc[key] = mergeDefaultsWithFormData(
                defaults ? defaults[key] : {},
                data[key]
            );
            return acc;
        }, acc);
    } else {
        return data;
    }
}

export const computeInitials = (_schema: JSONSchema7, rootSchema: JSONSchema7, data: any) => {
    const schema = retrieveSchema(_schema, rootSchema, data);
    const defaults = _computeInitials(schema, _schema.default, rootSchema, data);
    if (data == null) {
        return defaults;
    } else if (!data) {
        return data;
    } else if (isObject(data) || Array.isArray(data)) {
        return mergeDefaultsWithFormData(defaults, data);
    } else {
        return data || defaults;
    }
}