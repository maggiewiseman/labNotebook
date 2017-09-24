import React from 'react';
import axios from 'axios';
import {Link} from 'react-router'

export default class Registration extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {

        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleSubmit(e) {

        const {first, last, email, password, course} = this.state;


        if (this.state.role === 'student') {

            axios.post('/student/register', {
                first, last, email, password, course
            })
            .then((res) => {

                const data = res.data;

                if(!data.success) {
                    error: true
                } else {

                    location.replace('/');
                }
            })
            .catch((err) => {
                console.log(err);
            })
        } else if (this.state.role === 'teacher') {

                axios.post('/teacher/register', {
                    first, last, email, password
                })
                .then((res) => {

                    const data = res.data;

                    if(!data.success) {
                        error: true
                    } else {

                        location.replace('/');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        } else {

            //change aler to adding a <div> w/ error message
            alert('Something went wrong. Please try again.');
        }

    }

    render() {

        const studentRegistration = (
            <div>
                <h3 className="signup-title">PLEASE SIGN UP</h3>
                    <input className="reg-input" name="first" placeholder="First Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="last" placeholder="Last Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="course" placeholder="Course Code" onChange={e => this.handleChange(e)}/>


                    <button className="reg-button" onClick={e => this.handleSubmit(e)}> Submit </button>
            </div>
        )

        const teacherRegistration = (
            <div>
                <h3 className="signup-title">PLEASE SIGN UP</h3>
                    <input className="reg-input" name="first" placeholder="First Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="last" placeholder="Last Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)}/>

                    <button className="reg-button" onClick={e => this.handleSubmit(e)}> Submit </button>
            </div>
        )

        return (
        <div>
        HELLO


        </div>
        );
    }
}
