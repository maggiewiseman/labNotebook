import React from 'react';
import ReactDOM from 'react-dom';
import axios from '../api/axios';
import { Link } from 'react-router';


export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.logout = this.logout.bind(this);
    }
    logout() {
        axios.get('/logout').then(()=> {
            location.replace('/');
        });
    }
    render() {
        return (
            <Link onClick={this.logout}>Logout</Link>
        );
    }

}
