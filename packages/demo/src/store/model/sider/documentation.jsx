export default [
    {label: "Схема", key: "/documentation/schema"},
    {
        label: "Визуальная схема", key: "/documentation/configSchema",
        children: [
            {label: "Элементы", key: "/documentation/elements"},
            {label: "Верстка", key: "/documentation/layout"},
            {label: "Стилизация", key: "/documentation/styles"}
        ]
    },
    {
        label: "Типы", key: "/documentation/types",
        children: [
            {label: "Строка", key: "/documentation/string"},
            {label: "Логическое", key: "/documentation/boolean"},
            {label: "Объект", key: "/documentation/object"}
        ]
    },
    {label: "События", key: "/documentation/events"},
    {label: "Умолчания", key: "/documentation/defaults"}
]