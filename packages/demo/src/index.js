import React from "react";
import {render} from "react-dom";
import {App} from "./App";
import {StoreProvider} from "easy-peasy";
import store from "./store";
import {HeadProvider} from "react-head";


render(
    <HeadProvider>
        <StoreProvider store={store}>
            <App/>
        </StoreProvider>
    </HeadProvider>,
    document.getElementById("app"))