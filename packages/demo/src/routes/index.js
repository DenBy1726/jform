import React from "react";
import {Solutions} from "../components/solutions/Solutions";
import {Navigate} from "react-router-dom";
import {Home} from "../components/home/Home";

export default [
    {
        path: "",
        element: <Home/>
    },
    {
        path: "documentation"
    },
    {
        path: "components"
    },
    {
        path: "examples"
    },
    {
        path: "solutions",
        children: [
            {path: "", element: <Navigate to="/solutions/0" replace/>},
            {path: ":id", element: <Solutions/>}
        ]
    }
]