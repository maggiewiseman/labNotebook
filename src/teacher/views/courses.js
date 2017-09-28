//This will have 2 sections
//A make a new course section
//A list of current courses and sections
import React from 'react';
import { connect } from 'react-redux';
import { saveNewCourse, getCourseList, getAllSections } from '../actions';
import { Link } from 'react-router';
import AddSection from '../components/addSection';
import {Row, Col, Container, Card, Modal, Button, Input, Collapsible, CollapsibleItem, Collection, CollectionItem} from 'react-materialize'


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
            <Container>
            <Card>
                <Modal header="Add A Course" trigger={<Button>Add A Course</Button>}>
                {this.state.error && <p>{this.state.error}</p>}
                {error && <p>{error}</p>}
                <Input type="text" name="courseName" placeholder="Name of course" onChange={this.handleInput} ref={el => this.courseNameInput = el}/>

                <Button modal="close" onClick={this.submit}>Save new course</Button>
                </Modal>
            </Card>
                {courses &&
                    <Collapsible>
                    	{courseList}
                    </Collapsible>
                }
            </Container>
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
                <CollectionItem>
                    <Col s={3}>
                        <Link to={`/teacher/section/${item.id}`}>{item.name}</Link>
                    </Col>

                    <Col s={9}>
                        <p>Code For Students: {item.id}</p>
                    </Col>

                </CollectionItem>

            </li>
        );
    });
    return (
        <Collection>
            {itemList}
        </Collection>
    );
}



function makeCourseList(courses, sections) {
    return courses.map(course => {
        if(sections) {
            var sectionsForThisCourse = filterListByCourseId(sections, course.id);
            var sectionList = makeList(sectionsForThisCourse);
            return (
                <CollapsibleItem header={course.name}>
                    <AddSection courseId={course.id}/>
                    <ul>
                        {sectionList}
                    </ul>
                </CollapsibleItem>
            );
        } else {
            return (
                <li key={course.id.toString()}>{course.name}</li>
            );
        }
    });
}
