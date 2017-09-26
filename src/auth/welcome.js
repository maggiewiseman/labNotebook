import React from 'react';

export default function (props) {

    return (
        <div id="welcome">
        <figure>
            <img src="/images/flaskIcon.png" alt="DreamLab NB log pink flask" />
        </figure>
        <h3>CloudNotebook</h3>
        {props.children}
        </div>

    )
}
