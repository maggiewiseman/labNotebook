//This will have 2 sections
//A make a new course section
//A list of current courses and sections


import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse, getCourseList } from '../actions';
import { Link } from 'react-router';

class TeacherCourses extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getCourseList());
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
        this.courseNameInput.value = '';
    }
    render() {
        var { courses, sections} = this.props;

        if(courses) {
            var courseList = courses.map(course => {
                var link = '/course/' + course.id;
                return (
                    <li><Link to={link}>{course.name}</Link></li>
                );
            });
        }
        return (
            <div>
                <header>
                    Make a new course
                </header>
                <input type="text" name="courseName" placeholder="Name of course" onChange={this.handleInput} ref={el => this.courseNameInput = el}/>

                <button type="submit" onClick={this.submit}>Save new course</button>
                {courses &&
                    <div>
                        <header>
                            Course List
                        </header>
                        <ul>
                            {courseList}
                        </ul>
                    </div>
                }
            </div>
        );
    }
}

{/********* CONNECTED COMPONENT ********/}
const mapStateToProps = function(state) {
    return {
        courses: state.teachers.courses,
        sections: state.teachers.sections
    };
}
export default connect(mapStateToProps)(TeacherCourses);
