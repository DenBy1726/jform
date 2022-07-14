import {WidgetProps} from "../index";
import {SelectOption} from "@jform/utils";

export interface BooleanWidgetProps extends WidgetProps<boolean> {
    options?: SelectOption<string>[],
}