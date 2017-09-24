//This will have 2 sections
//A make a new course section
//A list of current courses and sections


import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';
import { Link } from 'react-router';

class TeacherCourses extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {
        this.props.dispatch(getCourseList());
        this.props.dispatch(getAllSections());
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
                var link = '/teacher/course/' + course.id;
                if(sections ) {
                    var sectionForThisCourse = sections.filter(section => {
                        return section.course_id = course.id;
                    });
                    var sectionList = sectionForThisCourse.map(section => {
                        return (
                            <li key={section.id.toString()}>
                                <Link to={`/teacher/section/${section.section_id}`}>{section.name}
                                </Link>
                            </li>
                        );
                    });

                    return (
                        <li key={course.id.toString()}>
                            <Link to={link}>{course.name}</Link>
                            <ul>
                                {sectionList}
                            </ul>
                        </li>
                    );
                }
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
