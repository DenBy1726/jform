import React, {useState} from "react"
import {DemoForm} from "components/common/DemoForm";
import {Col, Row, Tabs} from "antd";
import "./Editor.css"
import MonacoEditor from "react-monaco-editor";
import {JsEditor} from "./JsEditor";

const {TabPane} = Tabs;

const monacoEditorOptions = {
    minimap: {
        enabled: false,
    },
    automaticLayout: true,
};

const createEditor = ({editor, value, onChange, options, height}) => {
    return <div className="jeditor-panel">
        <MonacoEditor className="jeditor" language="json" value={JSON.stringify(value, null, 2)} theme="vs-light"
                      onChange={x => onChange(JSON.parse(x))}
                      height={height || 400}
                      options={{...monacoEditorOptions, ...options}}
                      {...editor}
        />
    </div>
}

export const Editor = (props) => {
    const {formProps, code, show = {schema: true, data: true}, useTabs = true, height} = props;
    const [schema, changeSchema] = useState(props.schema)
    const [data, changeData] = useState(props.data)

    const onChange = data => {
        if (props.onChange) {
            props.onChange();
        }
        changeData(data)
    }

    const editors = {
        schema: show.schema && schema && createEditor({value: schema, onChange: changeSchema}),
        data: show.data && createEditor({value: data, height, onChange: onChange}),
        jsx: show.code && code && <JsEditor height={height} code={code}/>
    }

    const content = Object.entries(editors).filter(([k, v]) => v).map(([k, v], i) => (
            useTabs ? <TabPane key={i} tab={k}>
                {v}
            </TabPane> : v
        )
    )


    return <div>
        <Row>
            <Col span={12}>
                {
                    useTabs ?
                        <Tabs tabPosition="left">
                            {content}
                        </Tabs>
                        : content
                }
            </Col>
            <Col span={12}>
                <DemoForm {...formProps} height={height} schema={schema} data={data} onChange={onChange}
                          schemaInitialized={({data}) => onChange(data)}/>
            </Col>
        </Row>
    </div>
}