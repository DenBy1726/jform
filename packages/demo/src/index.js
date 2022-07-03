import React from "react";
import {render} from "react-dom";
import Form from "@jform/core"


//schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"]}}

render(
    <Form onSubmit={console.log}
          schema={{
              type: "object",
              additionalProperties: {
                  type: "string",
              }
          }}
          data={{foo: "foo", "bar": "bar", baz: "baz"}}
          configSchema={{help: "Help", error: ["1", "2", "3"], placeholder: "Gg", $foo: {autofocus: true}}}
          eventSchema={{
              onRemoveKey: ({removeKey}) => removeKey(),
              onAddKey: () => ({1: "1"})
          }}
          onChange={console.log} onBlur={() => console.log("blur")} onFocus={() => console.log("focus")}/>
    , document.getElementById("app"));