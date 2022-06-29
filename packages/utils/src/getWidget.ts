import {FunctionComponent} from "react";

export const getWidget = <T extends any>(type: string, widget: string | FunctionComponent<T>, widgets: any): FunctionComponent<T> => {
    if (typeof widget === "function") {
        return widget;
    }
    if (widgets?.[type]?.[widget]) {
        return widgets[type][widget];
    } else {
        throw new Error(`No widget "${widget}" for type ${type}. Supported: ${Object.keys(widgets[type]).join(",")}`);
    }
}