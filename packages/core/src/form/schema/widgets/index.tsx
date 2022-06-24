import {Widgets} from "@jform/core";
import {cloneDeep} from "lodash";
import text from "./string/text";
import select from "./string/select";

const defaultWidgets: Widgets = {
    string: {
        text: text,
        select: select
    },
    number: {},
    integer: {},
    boolean: {},
    object: {},
    array: {},
    null: {}
};

export default (): Widgets => cloneDeep(defaultWidgets);