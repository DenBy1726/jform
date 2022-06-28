import {useEffect, useState} from "react";

export default () => {
    const [init, setInit] = useState(false);
    const [loadingInit, setLoadingInit] = useState(false);


    const didMount = (handler: Function) => {
        if (!loadingInit) {
            setLoadingInit(true)
            handler();
        }
    }

    const didUpdate = (handler: Function, deps: any[]) => {
        useEffect(() => {
            if (!init) {
                setInit(true);
            } else {
                handler();
            }
        }, deps);
    }

    return [didMount, didUpdate]
};