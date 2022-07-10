import React from "react"

export const renderLayout = (layout: any[],
                             col: ((name: string, rowProps: any) => React.ReactElement | null),
                             row: ((children: (React.ReactElement | null)[], index: number) => React.ReactElement)) => {
    return layout.map((rowProps: any, index: number) => {
        const children = Object.keys(rowProps).map((name: string) => {
            return col(name, rowProps[name]);
        });
        return row(children, index);
    })
}