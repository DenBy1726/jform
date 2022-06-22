import React from "react";
import {render} from "react-dom";
import Form from "@jform/core"

render(
    <Form data="hello world 22" schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"]}}>
        <input value="value"></input>
    </Form>
    , document.getElementById("app"));