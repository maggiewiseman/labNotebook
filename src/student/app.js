import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {getStudentData} from './actions'


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {

        this.props.dispatch(getStudentData());
        console.log(this.props.data);

    }

    render() {

        const{data} = this.props;
        console.log('render component', data);

        if(!data) {

            return null
        }

    return (
     <div>
        {data.first_name}
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

    )
    }
}

const mapStateToProps = function(state) {
    console.log('mapStateToProps', state);

    return {
        data: state.students.data
    }
}
export default connect(mapStateToProps)(App);
