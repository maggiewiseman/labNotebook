import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { Row, Col, Input, Button, Card, Container } from 'react-materialize';


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

                <Card s={12} m={4} title='Create a New Student Account' className="center-align">
                    <Row>
                        <Input  s={12} m={6} className="reg-input" name="first_name" placeholder="First Name" onChange={e => this.handleChange(e)}/>
                        <Input  s={12} m={6} className="reg-input" name="last_name" placeholder="Last Name" onChange={e => this.handleChange(e)}/>
                        <Input  s={12} m={6} className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
                        <Input  s={12} m={6} className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)}/>
                        <Input  s={12} m={12} className="reg-input" name="course" placeholder="Course Code" onChange={e => this.handleChange(e)}/>
                    </Row>
                    <div>
                        <Button className="reg-button" onClick={e => this.handleStudentRegistration(e)}> Submit </Button>
                    </div>
                </Card>

        )

        const teacherRegistration = (
            <Card title='Create a New Teacher Account' className="center-align">
                    <Row>
                        <Col s={12}>
                            <Input s={12} m={6} className="reg-input" name="first_name" placeholder="First Name" onChange={e => this.handleChange(e)}/>
                            <Input s={12} m={6} className="reg-input" name="last_name" placeholder="Last Name" onChange={e => this.handleChange(e)}/>

                            <Input s={12} m={6}  className="reg-input" name="email" placeholder="E-mail" onChange={e => this.handleChange(e)}/>
                            <Input s={12} m={6} className="reg-input" name="password" placeholder="Password" type="password" onChange={e => this.handleChange(e)}/>
                        </Col>
                    </Row>
                    <div>
                        <Button onClick={e => this.handleTeacherRegistration(e)}> Submit </Button>
                    </div>
            </Card>
        )

        return (
            <Container>
                <Card className='darken-1' title='Please select one of the following to register' className="center-align">
                    <Row>
                        <Col s={0} m={1}>
                        </Col>
                        <Col s={12} m={5}><Button className="teacher-button" onClick={e => this.handleTeacherSubmit(e)}> TEACHER </Button></Col>

                        <Col s={12} m={5} ><Button className="teacher-button" onClick={e => this.handleStudentSubmit(e)}> STUDENT </Button></Col>
                        <Col s={0} m={1}>
                        </Col>

                    </Row>
                </Card>

                    {this.state.role == 'student' && studentRegistration}

                    {this.state.role === 'teacher' && teacherRegistration}

                <div className="center-align">If already a member, please<Link to="/login"> LOGIN</Link></div>

            </Container>

        )
    }
}

var btnStyle = {
    paddingRight: '10px'
}
