import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {getStudentData, addNewClass, getAssignmentList} from './actions';
import AssignmentView from './components/AssignmentView';


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
        console.log('e');
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
     <div>
        {studentInfo.first_name} {studentInfo.last_name}
               <nav>
                   <ul>
                      <Link to='/student'><li>Home</li></Link>
                       <li>Courses</li>
                       <li>Gradebookrysjlktd</li>
                       <li>Account</li>
                       <li>Logout</li>
                   </ul>
               </nav>
               <sidebar>
                   <header>
                       Menu
                   </header>
                   <div>

                   <ul>
                   {studentInfo.courses.map(course => (

                       <li>{course.course_name}
                           <ul>

                       {course.assignments && course.assignments.map(assignment => (



                          <li onClick={e => this.showAssignment(e)}  id={assignment.assignment_id}><Link to={`/student/assignment/${assignment.assignment_id}`} > {assignment.assignment_name}</Link>
                          </li>
                           )
                       )}
                       </ul>

                       </li>

                   ))}
                   </ul>



                   </div>
               </sidebar>

               <input className="reg-input" name="course" placeholder="Course Code"
               onChange={e => this.handleChange(e)}
               onKeyPress={e =>this.emitMessage(e)} />

                <button className="new-class-button" onClick={e => this.newClass(e)}> Submit </button>
               {this.props.children}


        </div>

    )
    }
}

const mapStateToProps = function(state) {
    console.log('mapStateToProps', state);

    return {
        studentInfo: state.students.studentInfo
    }
}
export default connect(mapStateToProps)(App);
