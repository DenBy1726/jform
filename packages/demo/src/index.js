import React from "react";
import {render} from "react-dom";
import Form from "@jform/core"


//schema={{title: "Title", description: "description"}} configSchema={{help:"Help", error:["1", "2", "3"]}}

render(
    <Form onSubmit={console.log}
          schema={{
              title: 'Tell m',
              type: 'object',
              required: ['firstName'],
              properties: {
                  'image': {
                      type: 'string',
                      title: 'image'
                  },
                  user: {
                      type: 'object',
                      title: 'user',
                      'properties': {
                          'password': {
                              'type': 'string',
                              'title': 'Password'
                          },
                          'username': {
                              'type': 'string',
                              'title': 'username'
                          }
                      }
                  },
                  'details': {
                      type: 'boolean',
                      title: 'details'
                  },
                  'lastName': {
                      'type': 'string',
                      'title': 'Last name'
                  },
                  'bio': {
                      'type': 'string',
                      'title': 'Bio'
                  },
                  'firstName': {
                      'type': 'string',
                      'title': 'First name'
                  },
                  'age': {
                      'type': 'string',
                      'title': 'Age'
                  }
              }
          }}
          data={{}}
          configSchema={{
              widget: {
                  layout: [
                      {
                          firstName: {md: 6},
                          lastName: {md: 6, optional: ({isFilled}) => isFilled('firstName')}
                      }, {
                          image: {md: 3, optional: ({isFilled}) => isFilled('lastName')},
                          user: {md: 9, optional: ({isFilled}) => isFilled('lastName')},
                      }, {
                          details: {md: 12}
                      }, {
                          'description': {
                              md: 12,
                              optional: ({isFilled}) => isFilled('lastName'),
                              render: (props) => {
                                  const {data, errorSchema} = props
                                  const {firstName, lastName} = data

                                  return (
                                      <div>
                                          <h3>Hello, {firstName} {lastName}!</h3>
                                          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                              eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                                              voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                                              clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
                                              amet. Lorem ipsum dolor sit amet, consetetur sad</p>
                                      </div>
                                  )
                              }
                          }
                      }, {
                          age: {md: 12, optional: ({isTrue}) => isTrue('details')}
                      }, {
                          bio: {md: 12, optional: ({isTrue}) => isTrue('details')}
                      }
                  ]
              },
              $user: {
                  widget: {
                      layout: [
                          {username: {md: 12}}, {password: {md: 12}},
                      ]
                  }
              },
              $description: {}
          }}
          eventSchema={{
              onRemoveKey: ({removeKey}) => removeKey(),
              onAddKey: () => ({1: "1"})
          }}
          onChange={console.log} onBlur={() => console.log("blur")} onFocus={() => console.log("focus")}/>
    , document.getElementById("app"));