import {Form} from "../common/Form";
import React from "react";
import {useParams} from "react-router-dom";
import config from "./config"

export const Solutions = (props) => {
    let {id} = useParams();
    return <Form onSubmit={console.log}
                 onChange={console.log} onBlur={() => console.log("blur")}
                 onFocus={() => console.log("focus")}
                 {...config[Number.parseInt(id)]}

    />
}