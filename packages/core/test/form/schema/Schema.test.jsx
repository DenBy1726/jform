import React from "react"
import {getDefaultTemplate} from "../../../src/form";
import {createFormComponent, createSandbox} from "../../test_utils";
import {expect} from "chai";

describe("Schema", () => {

    let sandbox;

    describe("template", () => {

        beforeEach(() => {
            sandbox = createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it("should pass extra (theme) props", () => {
            const CustomCheckboxWidget = ({theme}) => {
                return (
                    <div id="custom-theme-props">
                        {theme.test}
                    </div>
                );
            };

            const {node} = createFormComponent({
                schema: {
                    type: "boolean",
                    description: "my description",
                },
                widgets: {
                    boolean: {
                        checkbox: CustomCheckboxWidget
                    }
                },
                configSchema: {
                    theme: {
                        test: "foo"
                    },
                },
            });

            expect(node.querySelector("#custom-theme-props").textContent).to.eql("foo");
        });

        describe("layout", () => {

            it("should use passed layout", () => {
                const template = getDefaultTemplate();
                template.common.field.layout = () => "Bar";

                const {node} = createFormComponent({schema: {}, template});
                expect(node.textContent).to.equal("Bar")
            })

            it("should override it by configSchema props", () => {
                const template = getDefaultTemplate();
                template.common.field.layout = () => "Bar";

                const {node} = createFormComponent({
                    schema: {}, template, configSchema: {layout: () => "Baz"}
                });
                expect(node.textContent).to.equal("Baz")
            })

            it("should support hidden", () => {
                const {node} = createFormComponent({configSchema: {hidden: true}});
                expect(node.getElementsByClassName("jform-hidden").length).to.equal(1)
            })

            it("should support className", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        layout: {
                            className: "Bar",
                            id: "match"
                        }
                    },
                    schemaInitialized: ({configSchema}) => {
                        console.log(configSchema)
                    }
                });
                expect(node.querySelectorAll("#match.Bar").length).to.equal(1)
                expect(node.querySelectorAll("#match.jform-field-layout-root.Bar").length).to.equal(1)
            })

            it("should support style", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        layout: {
                            style: {
                                width: '10px', margin: '1em'
                            }, id: "match"
                        }
                    }
                });

                expect(node.querySelector("#match").style[0]).to.equal("width")
                expect(node.querySelector("#match").style[1]).to.equal("margin")
            })

            it("should change render of components", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        layout: {
                            render: ({Title, Description, Children, Help, Errors}) => <div>
                                <div id="id1"><Title/></div>
                                <div id="id2"><Description/></div>
                                <div id="id3"><Children/></div>
                                <div id="id4"><Help/></div>
                                <div id="id5"><Errors/></div>
                            </div>

                        }
                    }
                });

                expect(node.querySelectorAll("#id1").length).to.equal(1)
                expect(node.querySelectorAll("#id2").length).to.equal(1)
                expect(node.querySelectorAll("#id3").length).to.equal(1)
                expect(node.querySelectorAll("#id4").length).to.equal(1)
                expect(node.querySelectorAll("#id5").length).to.equal(1)
            })

        });

        describe("title", () => {
            it("should use passed title template", () => {
                const template = getDefaultTemplate();
                template.common.field.title = () => <label id="match">Bar</>;

                const {node} = createFormComponent({schema: {}, template});
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should use text from schema", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}
                });
                expect(node.getElementsByClassName("jform-title")[0].textContent).to.equal("Foo")
            })

            it("should override from config schema", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {title: "Bar"}
                });
                expect(node.getElementsByClassName("jform-title")[0].textContent).to.equal("Bar")
            })

            it("should support function initialization", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: (props) => "Bar"
                    }
                });
                expect(node.getElementsByClassName("jform-title")[0].textContent).to.equal("Bar")
            })

            it("should support object initialization", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: {
                            text: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support function in object initialization", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: {
                            text: (props) => "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support custom template from props", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: {
                            template: (props) => <label id="match">Bar</label>, id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support additional class", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: {
                            className: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match.Bar").textContent).to.equal("Foo")
                expect(node.querySelector("#match.jform-title.Bar").textContent).to.equal("Foo")
            })

            it("should support styles", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: {
                            style: {
                                width: '10px', margin: '1em'
                            }, id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").style[0]).to.equal("width")
                expect(node.querySelector("#match").style[1]).to.equal("margin")
            })

        });

        //in this level of testing we cannot use required from schema, because from schema it object level property
        describe("required", () => {
            it("should display required mark", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        title: {
                            text: "Foo",
                            required: {
                                text: "!",
                                display: true
                            }
                        }
                    }
                });
                expect(node.getElementsByClassName("jform-label-required")[0].textContent).to.equal("!")
            })

            it("should support function initialization", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        title: {
                            text: "Foo",
                            required: {
                                text: () => "!",
                                display: true
                            }
                        }
                    }
                });
                expect(node.getElementsByClassName("jform-label-required")[0].textContent).to.equal("!")
            })

            it("should support additional class", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        title: {
                            text: "Foo",
                            required: {
                                display: true,
                                className: "Bar",
                                id: "match"
                            }
                        }
                    }
                });
                expect(node.querySelector("#match.Bar").textContent).to.equal("*")
                expect(node.querySelector("#match.jform-label-required.Bar").textContent).to.equal("*")
            })

            it("should support styles", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        title: {
                            text: "Foo",
                            required: {
                                display: true,
                                style: {
                                    width: "1em",
                                    margin: "10px"
                                },
                                id: "match"
                            }
                        }
                    }
                });
                expect(node.querySelector("#match").style[0]).to.equal("width")
                expect(node.querySelector("#match").style[1]).to.equal("margin")
            })

        });

        describe("hidden", () => {
            it("should support additional class", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        hidden: {
                            enable: true,
                            className: "Bar",
                            id: "match"
                        }
                    }
                });
                expect(node.querySelectorAll("#match.Bar").length).to.equal(1)
            })

            it("should support styles", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        hidden: {
                            enable: true,
                            style: {
                                width: "1em",
                                margin: "10px"
                            },
                            id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").style[0]).to.equal("width")
                expect(node.querySelector("#match").style[1]).to.equal("margin")
            })

        });


        describe("help", () => {
            it("should use passed help template", () => {
                const template = getDefaultTemplate();
                template.common.field.help = () => <label id="match">Bar</label>

                const {node} = createFormComponent({configSchema: {help: "Foo"}, template});
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should use text from config schema", () => {
                const {node} = createFormComponent({configSchema: {help: "Bar"}});
                expect(node.getElementsByClassName("jform-help")[0].textContent).to.equal("Bar")
            })

            it("should support function initialization", () => {
                const {node} = createFormComponent({configSchema: {help: (props) => "Bar"}});
                expect(node.getElementsByClassName("jform-help")[0].textContent).to.equal("Bar")
            })

            it("should support object initialization", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        help: {
                            text: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support function in object initialization", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        help: {
                            text: (props) => "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support custom template from props", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        help: {
                            text: "Bar", template: ({text}) => <label id="match">{text}</label>
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support additional class", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        help: {
                            text: "Foo", className: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match.Bar").textContent).to.equal("Foo")
                expect(node.querySelector("#match.jform-help.Bar").textContent).to.equal("Foo")
            })

            it("should support styles", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        help: {
                            text: "Bar", style: {
                                width: '10px', margin: '1em'
                            }, id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").style[0]).to.equal("width")
                expect(node.querySelector("#match").style[1]).to.equal("margin")
            })
        });

        describe("description", () => {
            it("should use passed description template", () => {
                const template = getDefaultTemplate();
                template.common.field.description = () => <label id="match">Bar</label>;

                const {node} = createFormComponent({schema: {description: "Foo"}, template});
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should use text from config schema", () => {
                const {node} = createFormComponent({schema: {description: "Bar"}});
                expect(node.getElementsByClassName("jform-description")[0].textContent).to.equal("Bar")
            })

            it("should overlap from config schema", () => {
                const {node} = createFormComponent({
                    schema: {description: "Foo"}, configSchema: {description: "Bar"}
                });
                expect(node.getElementsByClassName("jform-description")[0].textContent).to.equal("Bar")
            })

            it("should support function initialization", () => {
                const {node} = createFormComponent({configSchema: {description: (props) => "Bar"}});
                expect(node.getElementsByClassName("jform-description")[0].textContent).to.equal("Bar")
            })

            it("should support object initialization", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        description: {
                            text: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support function in object initialization", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        description: {
                            text: (props) => "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support custom template from props", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        description: {
                            text: "Bar", template: ({text}) => <label id="match">{text}</label>
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should support additional class", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        description: {
                            text: "Foo", className: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match.Bar").textContent).to.equal("Foo")
                expect(node.querySelector("#match.jform-description.Bar").textContent).to.equal("Foo")
            })

            it("should support styles", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        description: {
                            text: "Bar", style: {
                                width: '10px', margin: '1em'
                            }, id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").style[0]).to.equal("width")
                expect(node.querySelector("#match").style[1]).to.equal("margin")
            })

            it("should render the description using provided description field", () => {
                const {node} = createFormComponent({
                    schema: {
                        type: "boolean",
                        description: "my description",
                    },
                    template: {
                        type: {
                            boolean: {
                                description: ({text}) => (
                                    <div className="field-description">{text} overridden</div>
                                )
                            }
                        }
                    }
                });

                expect(node.querySelector(".field-description").textContent).eql("my description overridden");
            });

        });

        describe("error", () => {
            it("should use passed error template", () => {
                const template = getDefaultTemplate();
                template.common.field.error = () => <label id="match">Bar</label>;

                const {node} = createFormComponent({schema: {description: "Foo"}, template});
                expect(node.querySelector("#match").textContent).to.equal("Bar")
            })

            it("should overlap from config schema", () => {
                const {node} = createFormComponent({
                    configSchema: {error: ["1", "2"]}
                });
                expect(node.getElementsByClassName("jform-error").length).to.equal(2)
            })

            it("should support object initialization", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        error: {
                            text: ["1", "2"], id: "match"
                        }
                    }
                });
                expect(node.getElementsByClassName("jform-error").length).to.equal(2)
            })

            it("should support custom template from props", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        error: {
                            text: ["1", "2"], template: ({text}) => <label id="match">{text}</label>
                        }
                    }
                });
                expect(node.querySelector("#match").textContent).to.equal("12")
            })

            it("should support additional class", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        error: {
                            text: ["Foo"], className: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match.Bar").textContent).to.equal("Foo")
                expect(node.querySelector("#match.jform-errors.Bar").textContent).to.equal("Foo")
            })

            it("should support additional class for error", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        error: {
                            text: ["Foo"], errorClassName: "Bar", id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match .jform-error.Bar").textContent).to.equal("Foo")
            })

            it("should support styles", () => {
                const {node} = createFormComponent({
                    configSchema: {
                        error: {
                            text: ["Bar"], style: {
                                width: '10px', margin: '1em'
                            }, id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match").style[0]).to.equal("width")
                expect(node.querySelector("#match").style[1]).to.equal("margin")
            })

            it("should support user defined errors", () => {
                const {node} = createFormComponent({
                    errors: ["Foo"],
                    configSchema: {
                        error: {
                            text: ["Bar"], style: {
                                width: '10px', margin: '1em'
                            }, id: "match"
                        }
                    }
                });
                expect(node.getElementsByClassName("jform-error").length).to.equal(2)
            })
        });
    })
})
