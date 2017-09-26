import React from 'react';
import { MediaBox, Container} from 'react-materialize';

export default function (props) {

    return (
        <Container>
        <div id="welcome">
        <MediaBox src="/images/flaskIcon.png" caption="Logo" width="50px"/>

        <h3>CloudNotebook</h3>
        {props.children}
        </div>
        </Container>

    )
}
