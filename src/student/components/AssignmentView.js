import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {getAssignment} from '../actions';



class Assignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.sectionID);

    }


    componentDidMount() {

        const {id} = this.props.params;

        this.props.dispatch(getAssignment(id));

        console.log('ass view', this.state);
    }


    render() {


        const{assignment, studentInfo} = this.props;


        if(!assignment) {
            return null
        }

        console.log(assignment.abstract.abstract_editable);

        var assignmentOptions =

                <div>
                    {editable(assignment.title)}
                    {editable(assignment.question)}
                    {editable(assignment.abstract)}
                    {editable(assignment.hypothesis)}
                    {editable(assignment.variable)}
                    {editable(assignment.material)}
                    {editable(assignment.procedure)}
                    {editable(assignment.data)}
                    {editable(assignment.calculation)}
                    {editable(assignment.discussion)}
                </div>;



        return (
            <div>

            <h3>Complete the following assignment</h3>

            {assignmentOptions}

            </div>
        )

    }
}

const mapStateToProps = function(state) {
    console.log('mapStateToProps', state);

    return {
        assignment: state.students.assignment,
        studentInfo: state.students.studentInfo
    }
}
export default connect(mapStateToProps)(Assignment);



function editable(section) {

    console.log(section);

    if(section[section + '_editable']) {

        return (
            <form>
                <label>section:</label>

                <textarea name="content" placeholder="Type here.." cols="30" rows="5" onChange={e => this.handleChange(e)} />

                <input type="submit" value="Save" />
            </form>

        )

    } else {
        <div>
        <p>section[section + '_content']</p>
        </div>
    }

}
