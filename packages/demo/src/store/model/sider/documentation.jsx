import {
    DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH,
    DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH,
    DOCUMENTATION_CONFIG_SCHEMA_PATH,
    DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH, DOCUMENTATION_DEFAULTS_PATH, DOCUMENTATION_EVENTS_PATH,
    DOCUMENTATION_SCHEMA_PATH,
    DOCUMENTATION_TYPES_BOOLEAN_PATH, DOCUMENTATION_TYPES_OBJECT_PATH,
    DOCUMENTATION_TYPES_PATH,
    DOCUMENTATION_TYPES_STRING_PATH
} from "routes/constants";

export default [
    {label: "Схема", key: DOCUMENTATION_SCHEMA_PATH},
    {
        label: "Визуальная схема", key: DOCUMENTATION_CONFIG_SCHEMA_PATH,
        children: [
            {label: "Элементы", key: DOCUMENTATION_CONFIG_SCHEMA_ELEMENTS_PATH},
            {label: "Верстка", key: DOCUMENTATION_CONFIG_SCHEMA_LAYOUT_PATH},
            {label: "Стилизация", key: DOCUMENTATION_CONFIG_SCHEMA_STYLES_PATH}
        ]
    },
    {
        label: "Типы", key: DOCUMENTATION_TYPES_PATH,
        children: [
            {label: "Строка", key: DOCUMENTATION_TYPES_STRING_PATH},
            {label: "Логическое", key: DOCUMENTATION_TYPES_BOOLEAN_PATH},
            {label: "Объект", key: DOCUMENTATION_TYPES_OBJECT_PATH}
        ]
    },
    {label: "События", key: DOCUMENTATION_EVENTS_PATH},
    {label: "Умолчания", key: DOCUMENTATION_DEFAULTS_PATH}
]