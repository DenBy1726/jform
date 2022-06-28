import {JSchema} from "@jform/core";
import {JSONSchema7TypeName} from "json-schema";
import {canonizationRules} from "./canonize/rules";
import {applyDefaults} from "./schema"
import {canonizeDefaults} from "./canonize/canonize";
import getDefaults from "./config"
import {computeInitials} from "./data";

export interface Defaults {
    common?: JSchema,
    type?: { [k in JSONSchema7TypeName]?: JSchema },
    widget?: { [k in JSONSchema7TypeName]?: { [v: string]: JSchema } },
    rules?: ((arg: JSchema) => JSchema | undefined)[]
}

export {canonizationRules, applyDefaults, canonizeDefaults, computeInitials}
export default getDefaults;