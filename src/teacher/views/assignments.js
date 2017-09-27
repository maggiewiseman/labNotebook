//this will have a button to make new assignment at the top
//this will show a list of all the assignments by section
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';
import { Button, Row, Col, Collapsible, CollapsibleItem, Collection, CollectionItem, Breadcrumb, MenuItem} from 'react-materialize';
import AssignmentList from '../components/assignmentList';


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
            console.log('making courses call');
            var courseList = makeCourseList(courses, sections);
        }

        return (
            <div>
                <Row>
                    <Col s={12}>
                        <Breadcrumb>
                            <MenuItem>Assignments</MenuItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <div>
                    <Button waves='light' node='a' href='/teacher/new/assignment'>New Assignment</Button>
                </div>

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
    console.log('Assignments: Filter list by course id: ', courseId);
    var filteredList = sections.filter(section => {
        return section.course_id == courseId;
    });
    return filteredList;
}

function makeCourseList(courses, sections) {
    return courses.map(course => {
        if(sections) {
            var sectionsForThisCourse = filterListByCourseId(sections, course.id);
            console.log('calling make inner courses');
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
                    {course.name}
                </li>
            );
        }
    });
}

function makeInnerList(items) {
    var itemList = items.map(item => {
        console.log(item);

        return (
            <CollectionItem key={item.id.toString()}>
                {item.name}
                <AssignmentList sectionId={item.id} />
            </CollectionItem>
        );
    });
    return (
        <Collection>
            {itemList}
        </Collection>
    );
}
