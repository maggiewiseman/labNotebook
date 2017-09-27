//this will have a button to make new assignment at the top
//this will show a list of all the assignments by section
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';
import { Collapsible, CollapsibleItem} from 'react-materialize';


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

        if(courses) {
            var courseList = makeCourseList(courses, sections);
        }

        return (
            <div>
                {courses &&
                <Collapsible>
                    {courseList}
                </Collapsible>
                }

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

/********** LIST MAKING FUNCTIONS ************/
function filterListByCourseId(sections, courseId) {
    console.log(sections);
    console.log('id: ', courseId);
    var filteredList = sections.filter(section => {
        return section.course_id == courseId;
    });
    return filteredList;
}

function makeCourseList(courses, sections) {
    return courses.map(course => {
        if(sections) {
            var sectionsForThisCourse = filterListByCourseId(sections, course.id);
            var sectionList = makeInnerList(sectionsForThisCourse);
            return (
                <CollapsibleItem header={course.name}>
        
                    <ul>
                        {sectionList}
                    </ul>
                </CollapsibleItem>
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

function makeInnerList(items) {
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
