import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Logout from '../../auth/logout.js';
import { getTeacherInfo } from '../actions';

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
                    <nav>
                        <ul>
                            <li><Link to="/teacher">Home</Link></li>
                            <li>New Assignment</li>
                            <li>Help</li>
                            <li>Account</li>
                            <li><Logout /></li>
                        </ul>
                    </nav>
                    <sidebar>
                        <header>
                            Menu
                        </header>
                        <ul>
                            <li><Link to="/teacher/assignments">Assignments</Link></li>
                            <li><Link to="/teacher/courses">Courses</Link></li>
                            <li>Gradebook</li>
                            <li>Students</li>
                            <li>Messages</li>
                        </ul>
                    </sidebar>
                    {this.props.children}
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
