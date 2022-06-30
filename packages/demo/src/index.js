import React from "react";
import {render} from "react-dom";
import Form from "@jform/core"


//schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"]}}

render(
    <Form onSubmit={console.log}
          schema={{
              type: "object",
              title: "my object",
              description: "my description",
              required: ["foo"],
              default: {
                  foo: "hey",
                  bar: true,
              },
              properties: {
                  foo: {
                      title: "Foo",
                      type: "string",
                  },
                  bar: {
                      type: "boolean",
                  },
                  baz: {
                      type: "object",
                      title: "my object",
                      description: "my description",
                      required: ["foo"],
                      default: {
                          foo: "hey",
                          bar: true,
                      },
                      properties: {
                          foo: {
                              title: "Foo",
                              type: "string",
                          },
                          bar: {
                              type: "boolean",
                          },
                          baz: {
                              type: "object",
                              title: "my object",
                              description: "my description",
                              required: ["foo"],
                              default: {
                                  foo: "hey",
                                  bar: true,
                              },
                              properties: {
                                  foo: {
                                      title: "Foo",
                                      type: "string",
                                  },
                                  bar: {
                                      type: "boolean",
                                  },
                                  baz: {
                                      type: "object",
                                      title: "my object",
                                      description: "my description",
                                      required: ["foo"],
                                      default: {
                                          foo: "hey",
                                          bar: true,
                                      },
                                      properties: {
                                          foo: {
                                              title: "Foo",
                                              type: "string",
                                          },
                                          bar: {
                                              type: "boolean",
                                          },
                                      },
                                  }
                              },
                          }
                      },
                  }
              },
          }}
          configSchema={{help: "Help", error: ["1", "2", "3"], placeholder: "Gg", $foo: {autofocus: true}}}
          eventSchema={{
              onChange: console.log
          }}
          onChange={console.log} onBlur={() => console.log("blur")} onFocus={() => console.log("focus")}/>
    , document.getElementById("app"));