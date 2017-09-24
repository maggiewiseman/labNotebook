import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class App extends React.Component  {
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
                            <li>Home</li>
                            <li>New Assignment</li>
                            <li>Help</li>
                            <li>Account</li>
                            <li>Logout</li>
                        </ul>
                    </nav>
                    <sidebar>
                        <header>
                            Menu
                        </header>
                        <ul>
                            <li>Assignments</li>
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
export default connect()(App);
