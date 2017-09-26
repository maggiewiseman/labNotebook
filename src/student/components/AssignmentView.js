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
                    {editable(assignment.title, 'title')}
                    {editable(assignment.question, 'question')}
                    {editable(assignment.abstract, 'abstract')}
                    {editable(assignment.hypothesis, 'hypothesis')}
                    {editable(assignment.variable, 'variable')}
                    {editable(assignment.material, 'material')}
                    {editable(assignment.procedure, 'procedure')}
                    {editable(assignment.data, 'data')}
                    {editable(assignment.calculation, 'calculation')}
                    {editable(assignment.discussion, 'discussion')}
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



function editable(section, category) {

    console.log(section[section + '_editable']);



    if(section[category + '_editable']) {

        console.log('section true');

        return (
            <form>
                <label>{category}:</label>

                <textarea name="content" placeholder="Type here.." cols="30" rows="5" onChange={e => this.handleChange(e)} />

                <input type="submit" value="Save" />
            </form>

        )

    } else if(section[category + '_editable'] === null || section[category + '_content'] === null) {
        return
    } else {
        console.log('cannot edit', section[category + '_content']);

        return (
        <div>
        <h3>{category}:</h3>
        <p>{section[category + '_content']}</p>
        </div>
    )
    }

}
