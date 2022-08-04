import {
    COMPONENTS_BOOLEAN_CHECKBOX_PATH,
    COMPONENTS_BOOLEAN_PATH, COMPONENTS_BOOLEAN_SELECT_PATH, COMPONENTS_OBJECT_GRID_PATH,
    COMPONENTS_OBJECT_PATH,
    COMPONENTS_STRING_PATH, COMPONENTS_STRING_SELECT_PATH,
    COMPONENTS_STRING_TEXT_PATH
} from "routes/constants";

export default [
    {
        label: "string", key: COMPONENTS_STRING_PATH,
        children: [
            {label: "text", key: COMPONENTS_STRING_TEXT_PATH},
            {label: "select", key: COMPONENTS_STRING_SELECT_PATH}
        ]
    },
    {
        label: "boolean", key: COMPONENTS_BOOLEAN_PATH,
        children: [
            {label: "checkbox", key: COMPONENTS_BOOLEAN_CHECKBOX_PATH},
            {label: "select", key: COMPONENTS_BOOLEAN_SELECT_PATH},
        ]
    },
    {
        label: "object", key: COMPONENTS_OBJECT_PATH,
        children: [
            {label: "grid", key: COMPONENTS_OBJECT_GRID_PATH},
        ]
    }
]