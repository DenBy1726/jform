import {FunctionComponent} from "react";

export const getWidget = <T extends any>(type: string, widget?: string | FunctionComponent<T>, widgets?: any, defaults?: any): FunctionComponent<T> => {
    if (typeof widget === "function") {
        return widget;
    }
    let foundWidget = widget;
    if(foundWidget === undefined && defaults !== undefined && type !== undefined) {
        foundWidget = defaults?.type?.[type]?.configSchema?.widget?.type;
    }
    if (widgets?.[type]?.[foundWidget || "undefined"]) {
        return widgets[type][foundWidget || "undefined"];
    } else {
        if(widgets?.[type]) {
            throw new Error(`No widget "${foundWidget}" for type ${type}. Supported: ${Object.keys(widgets[type]).join(",")}`);
        } else {
            throw new Error(`No widget "${foundWidget}" for type ${type}}`);
        }
    }
}