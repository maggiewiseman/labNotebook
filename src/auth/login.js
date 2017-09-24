import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';

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

        axios.post('/login', {
            email, password
        })
        .then((res) => {

            const data = res.data;
            if(!data.success) {
                error: true
            } else {
                location.replace('/')
            }
        })
    } else {
        alert('The email or password are invalid');
    }
}

    render() {
        return (
            <div className="reg-input-container">
            <input className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
            <input className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)}/>
            <button className="reg-button" onClick={e => this.handleLogin(e)}> Login </button>
            <Link className="wel-links" to='/' >Register</Link>
            </div>
        )
    }

}
