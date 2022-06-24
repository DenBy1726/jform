import traverse from "@json-schema-tools/traverse";
import {JSONSchema7} from "json-schema";
import {findSchemaDefinition} from "./findSchemaDefinition";

interface RefCache {
    [k: string]: JSONSchema7;
}

/**
 * Options that can be passed to the derefencer constructor.
 */
interface DereferencerOptions {
    /**
     * If true, resolved non-local references will also be dereferenced using the same options.
     */
    recursive?: boolean;
    /**
     * Preseed the dereferencer with resolved refs
     */
    refCache?: RefCache;
    rootSchema?: JSONSchema7;
}


const copyOrNot = (s1: any, s2: JSONSchema7) => {
    if (
        s1.$ref !== undefined &&
        Object.keys(s1).length > 1 &&
        (s2 !== true && s2 !== false)
    ) {
        const reflessCopy = {
            ...s2,
            ...s1
        };
        delete reflessCopy.$ref;
        return reflessCopy;
    } else {
        return s2;
    }
}

/**
 * When instantiated, represents a fully configured dereferencer. When constructed, references are pulled out.
 * No references are fetched until .resolve is called.
 */
class Dereferencer {
    public refs: string[];
    private schema: JSONSchema7;
    public refCache: RefCache = {};

    constructor(schema: JSONSchema7, private options: DereferencerOptions = {}) {
        if (this.options.recursive === undefined) {
            this.options.recursive = true;
        }

        if (this.options.rootSchema === undefined) {
            this.options.rootSchema = schema;
        }

        if (schema !== true && schema !== false && schema.$id) {
            this.options.rootSchema = schema;
        }

        if (this.options.refCache) {
            this.refCache = this.options.refCache;
        }

        this.schema = schema; // shallow copy breaks recursive
        this.refs = this.collectRefs();
    }

    /**
     * Fetches the schemas for all the refs in the configured input schema(s)
     *
     * @returns a promise that will resolve a fully dereferenced schema, where all the
     *          promises for each ref has been resolved as well.
     *
     *
     */
    public resolve(): JSONSchema7 {
        const refMap: { [s: string]: JSONSchema7 } = {};

        if (this.schema === true || this.schema === false) {
            return this.schema;
        }

        if (this.refs.length === 0) {
            return this.schema;
        }

        const unfetchedRefs = this.refs.filter((r) => refMap[r] === undefined);

        for (const ref of unfetchedRefs) {
            let fetched: JSONSchema7;
            if (this.refCache[ref] !== undefined) {
                fetched = this.refCache[ref];
            } else if (ref === "#") {
                if (this.options.rootSchema === undefined) {
                    throw new Error("options.rootSchema was not provided, but one of the schemas references '#'");
                }
                fetched = this.options.rootSchema;
            } else {
                fetched = findSchemaDefinition(ref, this.options.rootSchema);
            }

            if (this.options.recursive === true && fetched !== true && fetched !== false && ref !== "#") {
                const subDerefferOpts = {
                    ...this.options,
                    refCache: this.refCache,
                };

                //@ts-ignore
                const subDereffer = new Dereferencer(fetched, subDerefferOpts);

                if (subDereffer.refs.length !== 0) {
                    const subFetchedProm = subDereffer.resolve();
                    // if there are props other than $ref present on the fetched schema,
                    // we have to break referential integrity, creating a new schema all together.
                    refMap[ref] = copyOrNot(fetched, subFetchedProm);
                } else {
                    refMap[ref] = fetched;
                }
            } else {
                refMap[ref] = fetched;
            }

            this.refCache[ref] = refMap[ref];
        }

        if (this.schema.$ref !== undefined) {
            this.schema = copyOrNot(this.schema, refMap[this.schema.$ref]);
        } else {
            traverse(this.schema, (s) => {
                if (s === true || s === false) {
                    return s;
                }
                if (s.$ref !== undefined) {
                    const reffedSchema = refMap[s.$ref];
                    return copyOrNot(s, reffedSchema);
                }
                return s;
            }, {mutable: true});
        }

        return this.schema;
    }

    /**
     * First-pass traversal to collect all the refs that we can find. This allows us to
     * optimize the async work required as well.
     */
    public collectRefs(): string[] {
        const refs: string[] = [];

        traverse(this.schema, (s) => {
            if (s === true || s === false) {
                return s;
            }
            if (s.$ref && refs.indexOf(s.$ref) === -1) {
                if (typeof s.$ref !== "string") {
                    throw new Error("Found an improperly formatted $ref in schema. $ref must be a string");
                }

                refs.push(s.$ref);
            }
            return s;
        });

        return refs;
    }
}

export const resolveReference = (schema: JSONSchema7, rootSchema: JSONSchema7): JSONSchema7 => {
    return new Dereferencer(schema, {rootSchema}).resolve();

}