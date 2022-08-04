import React from "react"
import {Editor} from "components/common/editor/Editor";
import config from "./config"
import {Link} from "react-router-dom";
import {SOLUTIONS_PATH} from "routes/constants";

export const Home = () => {
    return <div>
        <h1 style={{
            textAlign: "center",
            paddingBottom: "0.3em",
            fontSize: "2em",
            borderBottom: "1px solid hsla(210,18%,87%,1)"
        }}>JForm</h1>
        <h3 style={{textAlign: "center"}}>
            <a href="http://facebook.github.io/react/">React</a>
            {" компонент для декларативного построения форм на базе "}
            <a href="http://json-schema.org/">JsonSchema</a>
        </h3>
        <h1 style={{
            paddingBottom: "0.3em",
            fontSize: "2em",
            borderBottom: "1px solid hsla(210,18%,87%,1)"
        }}>Поддержка</h1>
        <ul>
            <li>Генерация из JsonSchema с поддержкой <a href="https://json-schema.org/draft-07/json-schema-release-notes.html">Draft 7</a></li>
            <li><Link to={SOLUTIONS_PATH + "/0"}>Динамическая верстка</Link></li>
        </ul>
        <h1 style={{
            paddingBottom: "0.3em",
            fontSize: "2em",
            borderBottom: "1px solid hsla(210,18%,87%,1)"
        }}>Установка</h1>
        npm install @jform/core
        <h1 style={{
            paddingBottom: "0.3em",
            fontSize: "2em",
            borderBottom: "1px solid hsla(210,18%,87%,1)"
        }}>Использование</h1>

        <Editor {...config} height={350} show={{code: true}} useTabs={false}
                formProps={{...config, onSubmit: console.log}}/>
    </div>
}