//this will have a button to make new assignment at the top
//this will show a list of all the assignments by section
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';


class TeacherAssignments extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        if(!this.props.courses) {
            this.props.dispatch(getCourseList());
        }

        if(!this.props.sections) {
            this.props.dispatch(getAllSections());
        }
    }
    render() {
        const { courses, sections } = this.props

        return (
            <div>
                <ul>
                    <li>Courses will eventually be listed here... <Link to='/teacher/new/assignment'>New Assignment</Link>
                        <ul>
                            <li>Assignments will eventually be listed here...</li>
                        </ul>
                    </li>
                </ul>
            </div>

        );
    }
}

/********* CONNECTED COMPONENT ********/
const mapStateToProps = function(state) {
    return {
        courses: state.teachers.courses,
        sections: state.teachers.sections
    };
}
export default connect(mapStateToProps)(TeacherAssignments);
