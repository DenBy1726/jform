import React from "react";
import {render} from "react-dom";
import Form from "@jform/core"


//schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"]}}

render(
    <Form data="ff" schema={{title: "Title", description: "description"}}
          configSchema={{help: "Help", error: ["1", "2", "3"], placeholder: "Gg"}}/>
    , document.getElementById("app"));