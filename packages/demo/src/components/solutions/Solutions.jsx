import React from "react";
import {useParams} from "react-router-dom";
import config from "./config"
import {DemoForm} from "../common/DemoForm";

export const Solutions = (props) => {
    let {id} = useParams();
    return <DemoForm onSubmit={console.log}
                 onChange={console.log} onBlur={() => console.log("blur")}
                 onFocus={() => console.log("focus")}
                 {...config[Number.parseInt(id)]}

    />
}