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
                    schema: {}, template, configSchema: {template: () => "Baz"}
                });
                expect(node.textContent).to.equal("Baz")
            })

            it("should support hidden", () => {
                const {node} = createFormComponent({configSchema: {hidden: true}});
                expect(node.getElementsByClassName("jform-hidden").length).to.equal(1)
            })

        });

        describe("title", () => {
            it("should use passed title template", () => {
                const template = getDefaultTemplate();
                template.common.field.title = () => "Bar";
                template.common.field.layout = ({title}) => title()

                const {node} = createFormComponent({schema: {}, template});
                expect(node.textContent).to.equal("Bar")
            })

            it("should use text from schema", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}
                });
                expect(node.textContent).to.equal("Foo")
            })

            it("should overlap from config schema", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {title: "Bar"}
                });
                expect(node.textContent).to.equal("Bar")
            })

            it("should support function initialization", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: (props) => "Bar"
                    }
                });
                expect(node.textContent).to.equal("Bar")
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

            //in this level of testing we cannot use required from schema, because from schema it object level property
            it("should support required", () => {
                const {node} = createFormComponent({
                    schema: {title: "Foo"}, configSchema: {
                        title: {
                            required: true, id: "match"
                        }
                    }
                });
                expect(node.querySelector("#match .jform-label-required").textContent).to.have.lengthOf.greaterThan(0)
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
                expect(node.querySelector("#match.jform-label.Bar").textContent).to.equal("Foo")
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

        describe("help", () => {
            it("should use passed help template", () => {
                const template = getDefaultTemplate();
                template.common.field.help = () => "Bar";
                template.common.field.layout = ({help}) => help()

                const {node} = createFormComponent({configSchema: {help: "Foo"}, template});
                expect(node.textContent).to.equal("Bar")
            })

            it("should use text from config schema", () => {
                const {node} = createFormComponent({configSchema: {help: "Bar"}});
                expect(node.textContent).to.equal("Bar")
            })

            it("should support function initialization", () => {
                const {node} = createFormComponent({configSchema: {help: (props) => "Bar"}});
                expect(node.textContent).to.equal("Bar")
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
                template.common.field.description = () => "Bar";
                template.common.field.layout = ({description}) => description()

                const {node} = createFormComponent({schema: {description: "Foo"}, template});
                expect(node.textContent).to.equal("Bar")
            })

            it("should use text from config schema", () => {
                const {node} = createFormComponent({schema: {description: "Bar"}});
                expect(node.textContent).to.equal("Bar")
            })

            it("should overlap from config schema", () => {
                const {node} = createFormComponent({
                    schema: {description: "Foo"}, configSchema: {description: "Bar"}
                });
                expect(node.textContent).to.equal("Bar")
            })

            it("should support function initialization", () => {
                const {node} = createFormComponent({configSchema: {description: (props) => "Bar"}});
                expect(node.textContent).to.equal("Bar")
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
        });

    })

    describe("error", () => {
        it("should use passed error template", () => {
            const template = getDefaultTemplate();
            template.common.field.error = () => "Bar";
            template.common.field.layout = ({errors}) => errors()

            const {node} = createFormComponent({schema: {description: "Foo"}, template});
            expect(node.textContent).to.equal("Bar")
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
                        text: ["Foo"], errorClass: "Bar", id: "match"
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
