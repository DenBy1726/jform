import {mergeSchemas} from "@jform/utils/index";
import {merge} from "lodash";
import {canonizationRules} from "./rules";
import {Defaults} from "form/defaults";

export const canonizeDefaults = (defaults: Defaults): Defaults => {
    canonizationRules.forEach(rule => {
        defaults.common = mergeSchemas(defaults.common, rule({...defaults.common}));
        for (let typeKey in defaults.type) {
            //@ts-ignore
            defaults.type[typeKey] = mergeSchemas(defaults.type[typeKey], rule({...defaults.type[typeKey]}));
        }
        for (let widgetKey in defaults.widget) {
            //@ts-ignore
            for (let widgetElementKey in defaults.widget[widgetKey]) {
                //@ts-ignore
                defaults.widget[widgetKey][widgetElementKey] = mergeSchemas(defaults.widget[widgetKey][widgetElementKey], rule({...defaults.widget[widgetKey][widgetElementKey]}));
            }
        }
    })
    defaults.rules = defaults.rules?.map(rule => {
        return (arg: any) => {
            //@ts-ignore
            const result = rule({...arg})
            return canonizationRules.map(x => x({...result})).reduce((a, b) => merge(a, b))
        }
    })
    return defaults;
}