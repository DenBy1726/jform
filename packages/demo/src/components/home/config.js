const schema =  {
    "title": "Форма регистрации",
    "description": "Пример формы",
    "type": "object",
    "required": ["firstName","agree"],
    "properties": {
        "firstName": {
            "type": "string",
            "title": "Имя"
        },
        "sex": {
            "type": "string",
            "title": "Пол",
            "enum": ["Мужской", "Женский"],
            "default": "Мужской"
        },
        "agree": {
            "type": "boolean",
            "title": "Согласие на обработку персональных данных",
            "const": true
        }
    }
};

const code = `import JForm from "@jform/core"

const schema = {
    "title": "Форма регистрации",
    "description": "Пример формы",
    "type": "object",
    "required": ["firstName","lastName"],
    "properties": {
        "firstName": {
            "type": "string",
            "title": "Имя"
        },
        "sex": {
            "type": "string",
             "title": "Пол",
            "enum": ["Мужской", "Женский"]
        },
        "agree": {
            "type": "boolean",
            "title": "Согласие на обработку персональных данных",
            "const": true
        }
    }
}

const App = () => (
 <JForm schema={schema}/>
)`

export default {
    schema,
    code
}