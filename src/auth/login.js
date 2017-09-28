import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { Row, Col, Input, Button, Card } from 'react-materialize';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleLogin(e) {
        const {email, password} = this.state;

    if (email && password) {

        axios.post('/api/login', {
            email, password
        })
        .then((res) => {
            console.log(res, res.data)

            const data = res.data;
            if(!data.success) {
                error: true
            } else {

                console.log(data.role);

                if (data.role == 'student'){
                    location.replace('/student');
                 } else {
                      location.replace('/teacher');
                 }
            }
        });
    } else {
        alert('The email or password are invalid');
    }
}


    render() {
        return (
            <Row className="reg-input-container">
                <Col m={2} s={12}>
                </Col>
                <Col m={8} s={12}>
                    <Card title='Login'>
                    <Input s={6} className="reg-input" name="email" placeholder="E-mail" label="E-mail" onChange={e => this.handleChange(e)}/>
                    <Input s={6} className="reg-input" name="password" placeholder="Password" type="password" label="Password" onChange={e => this.handleChange(e)}/>
                    <Button className="reg-button" onClick={e => this.handleLogin(e)}> Login </Button>
                    </Card>
                    <div className="center-align">
                        <Link to='/' >Register a New Account</Link>
                    </div>
                </Col>
                <Col m={2} s={12}>
                </Col>
            </Row>
        )
    }

}
