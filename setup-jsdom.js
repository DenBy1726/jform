
const originalPrototypeOf = Object.getPrototypeOf;
Object.getPrototypeOf = (arg) => {
    if(arg === undefined) {
        return {};
    } else {
        return originalPrototypeOf(arg);
    }
}

var { JSDOM } = require("jsdom");

// Setup the jsdom environment
// @see https://github.com/facebook/react/issues/5046
if (!global.hasOwnProperty("window")) {
    const { window } = new JSDOM("<!doctype html><html><body></body></html>");
    global.document = window.document;
    global.window = window;
    global.navigator = global.window.navigator;
    global.File = global.window.File;
}

// atob
global.atob = require("atob");
global.HTMLElement = window.HTMLElement;

Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

// HTML debugging helper
global.d = function d(node) {
    console.log(require("html").prettyPrint(node.outerHTML, { indent_size: 2 }));
};