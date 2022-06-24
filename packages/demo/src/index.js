import React from "react";
import {render} from "react-dom";
import Form from "@jform/core"


//schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"]}}

render(
    <Form schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"], placeholder: "Gg"}}>
        <input value="value"></input>
    </Form>
    , document.getElementById("app"));