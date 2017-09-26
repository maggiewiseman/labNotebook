//This will have 2 sections
//A make a new course section
//A list of current courses and sections
import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';
import { Link } from 'react-router';
import AddSection from '../components/addSection';

class TeacherCourses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseName: ''
        };
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
            console.log('state', this.state);
        });
    }
    submit() {
        if(this.state.courseName){
            this.props.dispatch(saveNewCourse( this.state.courseName));
            this.courseNameInput.value = '';
            this.setState({
                courseName: ''
            });
        } else {
            this.setState({
                error: 'Please provide a course name.'
            })
        }
    }
    render() {
        var { courses, sections, error } = this.props;

        if(courses) {
            var courseList = makeCourseList(courses, sections);
        }
        return (
            <div>
                <header>
                    Make a new course
                </header>
                {this.state.error && <p>{this.state.error}</p>}
                {error && <p>{error}</p>}
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
        sections: state.teachers.sections,
        error: state.teachers.error
    };
}
export default connect(mapStateToProps)(TeacherCourses);

/********** LIST MAKING FUNCTIONS ************/
function filterListByCourseId(sections, courseId) {
    console.log(sections);
    console.log('id: ', courseId);
    var filteredList = sections.filter(section => {
        return section.course_id == courseId;
    });
    return filteredList;
}

function makeList(items) {
    var itemList = items.map(item => {
        console.log(item);
        return (
            <li key={item.id.toString()}>
                <Link to={`/teacher/section/${item.id}`}>{item.name}
                </Link>
            </li>
        );
    });
    return (
        <ul>
            {itemList}
        </ul>
    );
}

function makeCourseList(courses, sections) {
    return courses.map(course => {
        var link = '/teacher/course/' + course.id;
        if(sections) {
            var sectionsForThisCourse = filterListByCourseId(sections, course.id);
            var sectionList = makeList(sectionsForThisCourse);
            return (
                <li key={course.id.toString()}>
                    <Link to={link}>{course.name}</Link>
                    <AddSection courseId={course.id}/>
                    <ul>
                        {sectionList}
                    </ul>
                </li>
            );
        } else {
            return (
                <li key={course.id.toString()}>
                    <Link to={link}>{course.name}</Link>
                    </li>
            );
        }
    });
}
