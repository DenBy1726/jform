import React, {useEffect, useState} from 'react'
import {createPortal} from 'react-dom'

export const IFrame = ({
                           children,
                           height,
                           ...props
                       }) => {
    const [contentRef, setContentRef] = useState(null)
    const mountNode = contentRef?.contentWindow?.document?.body

    const sync = () => {
        const stylesHtml = document.querySelectorAll("head > style");
        const formFrame = document.querySelector('iframe#form-frame');
        if (!formFrame) {
            return;
        }
        const stylesFrame = formFrame.contentWindow.document.head.querySelectorAll('style');
        if (stylesFrame.length !== stylesHtml.length) {
            formFrame.contentWindow.document.head.querySelectorAll('style').forEach(element => element.remove())
            stylesHtml.forEach(style => {
                const newStyleElement = document.createElement("style");
                newStyleElement.textContent = style.textContent;
                formFrame.contentWindow.document.head.appendChild(newStyleElement);
            })
            console.log('refresh-styles')
        }
    }

    useEffect(() => sync(), [])

    setInterval(() => {
        sync()
    }, 1000);

    return (
        <iframe id="form-frame" {...props} ref={setContentRef} frameborder="0" style={{
            position: 'relative',
            width: '100%',
            height: height || 'calc(100vh - 64px)'
        }}>
            {mountNode && createPortal(children, mountNode)}
        </iframe>
    )
}