import {WidgetProps} from "../index";
import {SelectOption} from "@jform/utils";

export interface StringWidgetProps extends WidgetProps<string> {
    options?: SelectOption<string>[],
    disabledOptions?: string[]
}

