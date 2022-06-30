import {WidgetProps} from "../index";
import {SelectOption} from "@jform/utils/index";

export interface BooleanWidgetProps extends WidgetProps<boolean> {
    options?: SelectOption<string>[],
}