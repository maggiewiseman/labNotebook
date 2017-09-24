import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';

export default class Registration extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};
    }


    handleTeacherSubmit(e) {

        console.log('teacher button selected');
        this.setState({
            role: 'teacher'
        })
    };


    handleStudentSubmit() {

        console.log('student button selected');
        this.setState({
            role: 'student'
        })
    }

    handleChange(e) {

        this.setState({
            [e.target.name] : e.target.value
        });
    }

    handleStudentRegistration(e) {

        const {first_name, last_name, email, password, course} = this.state;


        if(first_name && last_name && email && password && course) {

            axios.post('/api/student/register', {
                first_name, last_name, email, password, course
            })
            .then((res) => {

                const data = res.data;

                if(!data.success) {
                    error: true
                } else {

                    location.replace('/student');
                }
            })
            .catch((err) => {
                console.log(err);
            })
        } else {

            //change aler to adding a <div> w/ error message
            alert('Something went wrong. Please try again.');
        }
    }

    handleTeacherRegistration(e) {
        const {first_name, last_name, email, password, course} = this.state;


        if (first_name && last_name && email && password) {

            axios.post('/api/teacher/register', {
                    first_name, last_name, email, password
                })
                .then((res) => {

                    const data = res.data;

                    if(!data.success) {
                        error: true
                    } else {

                        location.replace('/teacher');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });

        }

    }

    render () {

        const studentRegistration = (
            <div>
                <h3 className="signup-title">PLEASE SIGN UP</h3>
                    <input className="reg-input" name="first_name" placeholder="First Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="last_name" placeholder="Last Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="course" placeholder="Course Code" onChange={e => this.handleChange(e)}/>


                    <button className="reg-button" onClick={e => this.handleStudentRegistration(e)}> Submit </button>
            </div>
        )

        const teacherRegistration = (
            <div>
                <h3 className="signup-title">PLEASE SIGN UP</h3>
                    <input className="reg-input" name="first_name" placeholder="First Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="last_name" placeholder="Last Name" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
                    <input className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)}/>

                    <button className="reg-button" onClick={e => this.handleTeacherRegistration(e)}> Submit </button>
            </div>
        )

        return (
            <div>

            <h3>Please select one of the following to register:</h3>

            <button className="teacher-button" onClick={e => this.handleTeacherSubmit(e)}> TEACHER </button>

            <button className="teacher-button" onClick={e => this.handleStudentSubmit(e)}> STUDENT </button>

            {this.state.role == 'student' && studentRegistration}
            {this.state.role === 'teacher' && teacherRegistration}

            <div>If already a member, please<Link to="/login"> LOGIN</Link></div>

            </div>

        )
    }
}
