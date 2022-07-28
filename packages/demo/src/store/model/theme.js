import {action, computed} from "easy-peasy";
import userDefaults from "../defaults/user"
import bootstrapDefaults from "../defaults/bootstrap"
import styles from "../defaults/styles"

import "./theme.css"

export default {
    defaultsKey: "Пользовательские стили",
    stylesKey: null,

    templates: [
        {
            title: "Пользовательские стили",
            value: userDefaults
        },
        {
            title: "Bootstrap",
            value: bootstrapDefaults
        }
    ],

    styles: styles,

    defaultTypes: computed(state => {
        return state.templates.map(template => template.title);
    }),

    stylesTypes: computed(state => {
        return Object.keys(state.styles);
    }),

    selectedDefaults: computed(state => {
        return (state.templates.find(template => template.title === state.defaultsKey) || {value: {}}).value;
    }),

    selectedStyles: computed(state => {
        if (state.stylesKey && state.defaultsKey === "Bootstrap") {
            return state.styles[state.stylesKey].stylesheet;
        }
        return null;
    }),

    setDefaults: action((state, payload) => {
        state.defaultsKey = payload;
        if(payload !== "Bootstrap") {
            state.stylesKey = "";
        }
    }),

    setStyles: action((state, payload) => {
        state.stylesKey = payload;
    })


};