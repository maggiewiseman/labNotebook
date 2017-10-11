import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {getStudentData, addNewClass, getAssignmentList} from './actions';
import AssignmentView from './components/AssignmentView';
import {MediaBox, Navbar, NavItem, Row, Col, Container, SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Modal, Input, Collection, CollectionItem} from 'react-materialize';
import Logout from '../auth/logout.js';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {

        this.props.dispatch(getStudentData());
        // this.props.dispatch(getAssignmentList())


    }

    handleChange(e) {

        this.setState({
            [e.target.name] : e.target.value
        });
    }

    newClass(e) {

        e.preventDefault();
        this.props.dispatch(addNewClass(this.state.course));

        this.emptyField(e);
    }

    emitMessage(e) {

        if(e.key === 'Enter') {

            e.preventDefault();
            this.props.dispatch(addNewClass(this.state.course));


            this.emptyField(e);
        }
    }

    emptyField(e) {

        e.target.value = '';
    }

    showAssignment(e) {
        console.log(e.target.id);

        this.setState({
            assignmentVisible: true
        })
    }



    render() {

        const{studentInfo} = this.props;

        if(!studentInfo) {

            return null
        }

    return (
    <Container>
     {studentInfo.first_name} {studentInfo.last_name}
        <Navbar>
            <NavItem><MediaBox src="/images/Cloud_book_logo.png" caption="Logo" width="90px" /></NavItem>
            <NavItem><Link to='/student'>Home</Link></NavItem>
            <NavItem>Courses</NavItem>
            <NavItem>Gradebook</NavItem>
            <NavItem>Account</NavItem>
            <NavItem><Logout /></NavItem>
        </Navbar>
        <Row>
            <Col s={12} m={3}>

                <Collapsible>
                    {studentInfo.courses.map(course => (

                    <CollapsibleItem header={course.course_name}>
                        <ul>
                        {course.assignments && course.assignments.map(assignment => (

                            <li onClick={e => this.showAssignment(e)}  id={assignment.assignment_id}>
                                <Link to={`/student/${course.course_id}/assignment/${assignment.assignment_id}`} > {assignment.assignment_name}</Link>
                            </li>)
                       )}
                       </ul>
                    </CollapsibleItem>
                    ))}

                </Collapsible>

                <Modal header="Add A Class" trigger={<Button>+ Class</Button>} actions={
                        <div>
                            <Button modal="close" onClick={e => this.newClass(e)} actions={'modal-close'}> Submit </Button>
                            <Button flat modal="close" waves="light">Dismiss</Button>
                        </div>
                    }>

                    <Input name="course" placeholder="Course Code"
                       onChange={e => this.handleChange(e)}
                       onKeyPress={e =>this.emitMessage(e)} />


                </Modal>
            </Col>
            <Col s={12} m={9}>
                {this.props.children}
            </Col>
        </Row>
    </Container> )
    }
}

const mapStateToProps = function(state) {
    console.log('mapStateToProps', state);

    return {
        studentInfo: state.students.studentInfo
    }
}
export default connect(mapStateToProps)(App);
