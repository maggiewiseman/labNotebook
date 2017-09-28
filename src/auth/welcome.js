import React from 'react';
import { MediaBox, Container, Row, Col} from 'react-materialize';

export default function (props) {

    return (
        <Container class="center-align">
            <Row>
                <Col m={3}>
                </Col>
                <Col m={6}>
                    <MediaBox src="/images/Cloud_book_logo.png" caption="Logo" width="300px" className="centerAlign"/>
                </Col>
                <Col m={3}>
                </Col>
            </Row>
            <Row>
                <Col m={1}>
                </Col>
                <Col m={10}>
                    {props.children}
                </Col>

                <Col m={1}>
                </Col>
            </Row>


        </Container>

    )
}
