import React, {Component, useState, useCallback, createContext, useContext, useMemo, useRef,} from "react";

class ErrorBoundary extends Component {

    componentDidCatch(...args) {
        this.setState({});
        this.props.onError(...args);
    }

    render() {
        return this.props.children;
    }
}

const noop = () => false;
const errorBoundaryContext = createContext({
    componentDidCatch: {current: undefined},
    error: undefined,
    setError: noop,
});

export function ErrorBoundaryContext({children,}) {
    const [error, setError] = useState();
    const componentDidCatch = useRef();
    const ctx = useMemo(() => ({
        componentDidCatch,
        error,
        setError,
    }), [error]);
    return (React.createElement(errorBoundaryContext.Provider, {value: ctx},
        React.createElement(ErrorBoundary, {
            error: error, onError: (error, errorInfo) => {
                setError(error);
                componentDidCatch.current?.(error, errorInfo);
            }
        }, children)));
}


export function withErrorBoundary(WrappedComponent) {
    function WithErrorBoundary(props) {
        return (React.createElement(ErrorBoundaryContext, null,
            React.createElement(WrappedComponent, {key: "WrappedComponent", ...props})));
    }

    return WithErrorBoundary;
}

export function useErrorBoundary(componentDidCatch) {
    const ctx = useContext(errorBoundaryContext);
    ctx.componentDidCatch.current = componentDidCatch;
    const resetError = useCallback(() => {
        ctx.setError(undefined);
    }, []);
    return [ctx.error, resetError];
}
