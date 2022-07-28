import React, {useState} from 'react'
import {createPortal} from 'react-dom'

export const IFrame = ({
                           children,
                           ...props
                       }) => {
    const [contentRef, setContentRef] = useState(null)
    const mountNode = contentRef?.contentWindow?.document?.body

    setInterval(() => {
        const stylesHtml = document.querySelectorAll("head > style");
        const stylesFrame = document.querySelector('iframe#form-frame').contentWindow.document.head.querySelectorAll('style');
        if (stylesFrame.length !== stylesHtml.length) {
            document.querySelector('iframe#form-frame').contentWindow.document.head.querySelectorAll('style').forEach(element => element.remove())
            stylesHtml.forEach(style => {
                const newStyleElement = document.createElement("style");
                newStyleElement.textContent = style.textContent;
                document.querySelector('iframe#form-frame').contentWindow.document.head.appendChild(newStyleElement);
            })
            console.log('refresh-styles')
        }
    }, 1000);

    return (
            <iframe id="form-frame" {...props} ref={setContentRef} frameborder="0" style={{
                position: 'relative',
                width: '100%',
                height: 'calc(100vh - 64px)'
            }}>
                {mountNode && createPortal(children, mountNode)}
            </iframe>
    )
}