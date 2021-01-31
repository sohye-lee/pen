import React from 'react'

export default function Message(props) {
    return (
        <div className={`alert-${props.message || 'info'}`}>
            {props.children}
        </div>
    )
};
