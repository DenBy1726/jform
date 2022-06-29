import React from "react";
import {render} from "react-dom";
import Form from "@jform/core"


//schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"]}}

render(
    <Form onSubmit={console.log}
          schema={{ title: "Boolean", description: "boolean description"}}
          configSchema={{help: "Help", error: ["1", "2", "3"], placeholder: "Gg"}}
          eventSchema={{
              onChange: console.log
          }}
          onChange={console.log} onBlur={() => console.log("blur")} onFocus={() => console.log("focus")}/>
    , document.getElementById("app"));