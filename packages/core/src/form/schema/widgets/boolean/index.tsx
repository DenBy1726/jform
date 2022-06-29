import {WidgetProps} from "../index";
import {SelectOption} from "@jform/utils/index";
import checkboxLayout from "./checkboxLayout"

export interface BooleanWidgetProps extends WidgetProps<boolean> {
    options?: SelectOption<string>[],
}

export {checkboxLayout}