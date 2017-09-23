import React from 'react';

export default function (props) {

    return (
        <div id="welcome">
        <h3>Welcome to Lab Notebook...we need a catchy name</h3>
        {props.children}
        </div>

    )
}
