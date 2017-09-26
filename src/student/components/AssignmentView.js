import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {getAssignmentList} from '../actions';



class Assignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.sectionID);

    }


    componentDidMount() {
        this.props.dispatch(getAssignment(assignmentID));
    }


    render() {

        const{assignments} = this.props;

        if(!assignments) {
            return null
        }

        return (
            <div>
            <ul>
                {assignments.map(assignment => (
                    <li>{assignment.assignment_name}</li>
                ))}

            </ul>
            </div>
        )

    }
}
