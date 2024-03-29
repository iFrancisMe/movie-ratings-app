import React from 'react'

// Button component for home and search buttons
export default function TitleBarButton(props) {

    // Inline styles related to alignment of elements only. Theming is handled in CSS module
    return (
        <div className={props.className} style={{margin: 'auto', minWidth: 80, maxWidth: 100}} onClick={props.onClick}>
            <props.icon  />
            <span className='align-text-top'> &nbsp;{props.text}</span>
        </div>
    )
}
