<h1 align="center">JForm</h1> 

 <p align="center">
   <a href="http://facebook.github.io/react/">React</a>
            компонент для декларативного построения форм на базе
            <a href="http://json-schema.org/">JsonSchema</a>
</p>

## Поддержка
<p>
        <ul>
            <li>Генерация из JsonSchema с поддержкой <a href="https://json-schema.org/draft-07/json-schema-release-notes.html">Draft 7</a></li>
            <li>Динамическая верстка</li>
        </ul>
</p>

## Установка

```npm install @jform/core```

## Использование   


```jsx
import JForm from "@jform/core"

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
)
```

[![](./assets/demo.jpg)](https://denby1726.github.io/jform)

[Документация](https://denby1726.github.io/jform)