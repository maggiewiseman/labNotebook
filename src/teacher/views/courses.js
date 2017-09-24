//This will have 2 sections
//A make a new course section
//A list of current courses and sections


import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse } from '../actions';

class TeacherCourses extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log('COURSES: handleInput state:', this.state);
        });
    }
    submit() {
        this.props.dispatch(saveNewCourse( this.state.courseName));
    }
    render() {
        return (
            <div>
                <header>
                    Make a new course
                </header>
                <input type="text" name="courseName" placeholder="Name of course" onChange={this.handleInput}/>

                <button type="submit" onClick={this.submit}>Save new course</button>
            </div>
        );
    }
}

{/********* CONNECTED COMPONENT ********/}
const mapStateToProps = function(state) {
    return {
        sections: state.sections
    };
}
export default connect(mapStateToProps)(TeacherCourses);
