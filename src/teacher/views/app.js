import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Logout from '../../auth/logout.js';
import { getTeacherInfo } from '../actions';
import {Navbar, NavItem, Row, Col} from 'react-materialize'

class App extends React.Component  {
    componentDidMount() {
        console.log('getting Teacher info');
        this.props.dispatch(getTeacherInfo())
    }
    render() {
        if(false) {
            return <div className='loading'>Loading...</div>;
        } else {
            // const children = React.cloneElement(this.props.children, {
            //     info: this.state,
            //     events : {
            //         updateProfile: this.updateProfile,
            //         handleInput: this.handleInput
            //     },
            //
            // });
            return (
                <div>
                    <Navbar>

                            <NavItem href="/teacher">Home</NavItem>
                            <NavItem>New Assignment</NavItem>
                            <NavItem>Help</NavItem>
                            <NavItem>Account</NavItem>
                            <NavItem><Logout /></NavItem>

                    </Navbar>
                    <Row>
                        <Col s={3} className='sidebar'>
                            <ul>
                                <li><Link to="/teacher/assignments">Assignments</Link></li>
                                <li><Link to="/teacher/courses">Courses</Link></li>
                                <li>Gradebook</li>
                                <li>Students</li>
                                <li>Messages</li>
                            </ul>
                        </Col>
                        <Col s={9} className='mainContainer'>
                            {this.props.children}
                        </Col>
                    </Row>
                </div>
            );
        }
    };

}


/********* CONNECTED COMPONENT ********/
var mapStateToProps = function(state) {
    return {
        teacherInfo: state.teachers.teacherInfo
    }
}
export default connect(mapStateToProps)(App);
