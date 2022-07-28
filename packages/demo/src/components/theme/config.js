export default (setDefaults, defaultTypes, setStyles, stylesTypes, data) => ({
    schema: {
        type: "object",
        properties: {
            defaults: {
                title: "Умолчания",
                enum: defaultTypes
            },
            styles: {
                title: "Стили",
                enum: stylesTypes
            }
        }
    },
    configSchema: {
        $styles: {
            empty: "",
            hidden: data.defaults !== "Bootstrap"
        }
    },
    eventSchema: {
        $defaults: {
            onChange: x => setDefaults(x)
        },
        $styles:{
            onChange: x => setStyles(x)
        }
    }
})