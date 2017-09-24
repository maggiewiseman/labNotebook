import React from 'react';

export default class Main extends React.Component {


    constructor(props) {
        super(props);
        this.state = {};
    }


    handleTeacherSubmit(e) {
        location.replace('/register');

        console.log('teacher button selected');
        this.setState({
            role: 'teacher'
        }, () => {
            console.log(this.state);
        });
    }

    handleStudentSubmit() {
        location.replace('/register');
        console.log('student button selected');
        this.setState({
            role: 'student'
        }, () => {
            console.log(this.state);
        });
    }

    render () {

        return (
            <div>

            <h3>Please select one of the following:</h3>

            <button className="teacher-button" onClick={e => this.handleTeacherSubmit(e)}> TEACHER </button>

            <button className="teacher-button" onClick={e => this.handleStudentSubmit(e)}> STUDENT </button>

            </div>

        )
    }
}
