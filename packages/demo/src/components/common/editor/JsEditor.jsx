import React from "react"
import MonacoEditor from "react-monaco-editor";
const rTabs = str => str.trim().replace(/^ {4}/gm, "");

export const JsEditor = ({height, code}) => {
    return <MonacoEditor className="jeditor" language="javascript"
                  value={rTabs(code)}
                  theme="vs-light"
                  height={height || 700}
                  options={{
                      minimap: {
                          enabled: false,
                      },
                      automaticLayout: true,
                      readOnly: true
                  }}
    />
}