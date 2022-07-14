import {JSONSchema7} from "json-schema";
import {retrieveSchema} from "./index";
import {mergeSchemas, isObject, findSchemaDefinition} from "../index";
import {isValid} from "./if";

const resolveReference = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 =>  {
    const $refSchema = findSchemaDefinition(schema.$ref as string, rootSchema);
    const {$ref, ...localSchema} = schema;
    return retrieveSchema({...$refSchema, ...localSchema}, rootSchema, data);
}

const withExactlyOneSubschema = (schema: JSONSchema7, rootSchema: JSONSchema7, data: any, dependencyKey: string, oneOf: JSONSchema7[]) => {
    const validSubschemas = oneOf.filter(subschema => {
        if (!subschema.properties) {
            return false;
        }
        const {[dependencyKey]: conditionPropertySchema} = subschema.properties;
        if (conditionPropertySchema) {
            const conditionSchema: JSONSchema7 = {
                type: "object",
                properties: {
                    [dependencyKey]: conditionPropertySchema,
                },
            };
            return isValid(conditionSchema, data, rootSchema);
        }
        return false;
    });
    if (validSubschemas.length !== 1) {
        console.warn("ignoring oneOf in dependencies because there isn't exactly one subschema that is valid");
        return schema;
    }
    const subschema = validSubschemas[0];
    const {
        // @ts-ignore
        [dependencyKey]: conditionPropertySchema,
        ...dependentSubschema
    } = subschema.properties;
    const dependentSchema = {...subschema, properties: dependentSubschema};
    return mergeSchemas({}, schema, retrieveSchema(dependentSchema, rootSchema, data));
}

const withDependentSchema = (schema: JSONSchema7, rootSchema: JSONSchema7, data: any, dependencyKey: string, dependencyValue: JSONSchema7) => {
    let {oneOf, ...dependentSchema} = retrieveSchema(dependencyValue, rootSchema, data);
    schema = mergeSchemas({}, schema, dependentSchema);
    // Since it does not contain oneOf, we return the original schema.
    if (oneOf === undefined) {
        return schema;
    } else if (!Array.isArray(oneOf)) {
        throw new Error(`invalid: it is some ${typeof oneOf} instead of an array`);
    }
    // Resolve $refs inside oneOf.
    const resolvedOneOf = (oneOf as JSONSchema7[]).map(subschema => subschema.$ref ? resolveReference(subschema, rootSchema, data) : subschema);
    return withExactlyOneSubschema(schema, rootSchema, data, dependencyKey, resolvedOneOf);
}

const processDependencies = (dependencies: { [k: string]: any }, resolvedSchema: JSONSchema7, rootSchema: JSONSchema7, data: any): JSONSchema7 => {
    // Process dependencies updating the local schema properties as appropriate.
    for (const dependencyKey in dependencies) {
        // Skip this dependency if its trigger property is not present.
        if (data[dependencyKey] === undefined) {
            continue;
        }
        // Skip this dependency if it is not included in the schema (such as when dependencyKey is itself a hidden dependency.)
        if (resolvedSchema.properties && !(dependencyKey in resolvedSchema.properties)) {
            continue;
        }
        const {
            [dependencyKey]: dependencyValue,
            ...remainingDependencies
        } = dependencies;
        if (Array.isArray(dependencyValue)) {
            resolvedSchema = withDependentProperties(resolvedSchema, dependencyValue);
        } else if (isObject(dependencyValue)) {
            resolvedSchema = withDependentSchema(resolvedSchema, rootSchema, data, dependencyKey, dependencyValue);
        }
        return processDependencies(remainingDependencies, resolvedSchema, rootSchema, data);
    }
    return resolvedSchema;
}

const withDependentProperties = (schema: JSONSchema7, additionallyRequired: any[]) => {
    if (!additionallyRequired) {
        return schema;
    }
    const required = Array.isArray(schema.required)
        ? Array.from(new Set([...schema.required, ...additionallyRequired]))
        : additionallyRequired;
    return {...schema, required: required};
}

export function getMatchingOption<T = any>(data: T, options: any[], rootSchema: JSONSchema7): number {
    // For performance, skip validating subschemas if formData is undefined. We just
    // want to get the first option in that case.
    if (data === undefined) {
        return 0;
    }
    for (let i = 0; i < options.length; i++) {
        const option = options[i];

        // If the schema describes an object then we need to add slightly more
        // strict matching to the schema, because unless the schema uses the
        // "requires" keyword, an object will match the schema as long as it
        // doesn't have matching keys with a conflicting type. To do this we use an
        // "anyOf" with an array of requires. This augmentation expresses that the
        // schema should match if any of the keys in the schema are present on the
        // object and pass validation.
        if (option.properties) {
            // Create an "anyOf" schema that requires at least one of the keys in the
            // "properties" object
            const requiresAnyOf = {
                anyOf: Object.keys(option.properties).map(key => ({
                    required: [key],
                })),
            };

            let augmentedSchema;

            // If the "anyOf" keyword already exists, wrap the augmentation in an "allOf"
            if (option.anyOf) {
                // Create a shallow clone of the option
                const {...shallowClone} = option;

                if (!shallowClone.allOf) {
                    shallowClone.allOf = [];
                } else {
                    // If "allOf" already exists, shallow clone the array
                    shallowClone.allOf = shallowClone.allOf.slice();
                }

                shallowClone.allOf.push(requiresAnyOf);

                augmentedSchema = shallowClone;
            } else {
                augmentedSchema = Object.assign({}, option, requiresAnyOf);
            }

            // Remove the "required" field as it's likely that not all fields have
            // been filled in yet, which will mean that the schema is not valid
            delete augmentedSchema.required;

            if (isValid(augmentedSchema, data, rootSchema)) {
                return i;
            }
        } else if (isValid(option, data, rootSchema)) {
            return i;
        }
    }
    return 0;
}

export const _resolveDependencies = <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 => {
    // Drop the dependencies from the source schema.
    let {dependencies = {}, ...resolvedSchema} = schema;
    if (resolvedSchema.oneOf !== undefined) {
        resolvedSchema =
            resolvedSchema.oneOf[getMatchingOption(data, resolvedSchema.oneOf, rootSchema)] as JSONSchema7;
    } else if (resolvedSchema.anyOf !== undefined) {
        resolvedSchema =
            resolvedSchema.anyOf[getMatchingOption(data, resolvedSchema.anyOf, rootSchema)] as JSONSchema7;
    }
    return processDependencies(dependencies, resolvedSchema, rootSchema, data);
}

export default <T extends any>(schema: JSONSchema7, rootSchema: JSONSchema7, data: T): JSONSchema7 => {
    const resolvedSchema = _resolveDependencies(schema, rootSchema, data);
    return retrieveSchema(resolvedSchema, rootSchema, data);
}