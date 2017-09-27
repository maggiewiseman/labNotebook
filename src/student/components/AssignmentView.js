import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {getAssignment, saveAssignment, udpateAssignmentStatus, commitAssignment} from '../actions';
import {Card, Row, Col, Container, SideNav, SideNavItem, Button, Collapsible, CollapsibleItem, Modal, Input, Collection, CollectionItem} from 'react-materialize';



class Assignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.sectionID);
        this.handleChange = this.handleChange.bind(this);
        this.props.dispatch = this.props.dispatch.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveAll = this.handleSaveAll.bind(this);
        this.handleCommit = this.handleCommit.bind(this);
    }


    componentDidMount() {

        const {id} = this.props.params;

        this.props.dispatch(getAssignment(id));
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }


    handleSave(e) {

        var field = e.target.name

        console.log('dield', field);

        var send = {
            [field]: this.state[field]
        }
        console.log('send', send);
        const {id} = this.props.params;
        this.props.dispatch(saveAssignment(id, send));
    }

    handleCommit(e) {
        const {id} = this.props.params;

        this.props.dispatch(getAssignment(id));
        this.props.dispatch(commitAssignment(id, this.state))

    }

    handleSaveAll(e) {

        console.log('save all', this.state);
        const {id} = this.props.params;
        this.props.dispatch(saveAssignment(id, this.state));
    }

    render() {

        var form;
        const{assignment, studentInfo} = this.props;


        if(!assignment) {
            return null
        }
        console.log('STATUS', assignment.status);

        var assignmentOptions =
        <div>
            <div>
                {editable(assignment.title, 'title',this.handleChange, this.handleSave)}
                {editable(assignment.question, 'question',this.handleChange, this.handleSave)}
                {editable(assignment.abstract, 'abstract',this.handleChange, this.handleSave)}
                {editable(assignment.hypothesis, 'hypothesis',this.handleChange, this.handleSave)}
                {editable(assignment.variable, 'variable',this.handleChange, this.handleSave)}
                {editable(assignment.material, 'material',this.handleChange, this.handleSave)}
                {editable(assignment.procedure, 'procedure',this.handleChange, this.handleSave)}
                {editable(assignment.data, 'data',this.handleChange, this.handleSave)}
                {editable(assignment.calculation, 'calculation',this.handleChange, this.handleSave)}
                {editable(assignment.discussion, 'discussion',this.handleChange, this.handleSave)}
            </div>

            <Button name='saveAll' onClick={this.handleSaveAll}>Save All</Button>

            <Button name='commit' onClick={this.handleCommit}>Commit</Button>
        </div>

        var committedAssignment =
            <div>
                {committed (assignment.title, 'title')}
                {committed (assignment.question, 'question')}
                {committed (assignment.abstract, 'abstract')}
                {committed (assignment.hypothesis, 'hypothesis')}
                {committed (assignment.variable, 'variable')}
                {committed (assignment.material, 'material')}
                {committed (assignment.procedure, 'procedure')}
                {committed (assignment.data, 'data')}
                {committed (assignment.calculation, 'calculation')}
                {committed (assignment.discussion, 'discussion')}


            </div>

         if(assignment.status === "COMMITTED" || assignment.status === "GRADED" || assignment.status === "PENDING") {

            form = committedAssignment;
         } else {
            form = assignmentOptions;
        }

        return (
            <div className="blueBox">

                <h5>Put Assgignment Name Here</h5>
                {form}

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



function editable(section, category, handleChange, handleSave, handleSaveAll, handleCommit) {
    console.log(section[category + '_content']);

    if(section[category + '_editable']) {
        if(section[category + '_content']) {

            return (

                <div>
                    <label>{category}:</label>

                    <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{section[category + '_content']}</textarea>

                    <Button name={category} onClick={handleSave}>Save</Button>
                </div>
            )
        } else {
        return (

            <Card title={category}>
                <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange} />

                <Button name={category} onClick={handleSave}>Save</Button>
            </Card>


            )
        }
    } else if(section[category + '_editable'] === null || section[category + '_content'] === null) {
        return
    } else {
        return (
            <Card title={capitalize(category)}>
                <p>{section[category + '_content']}</p>
            </Card>
        )
    }

}

function committed (section, category) {

    if(section[category + '_content']) {

    return (
        <Card title={capitalize(category)}>
            <p>{section[category + '_content']}</p>
        </Card>
        )
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}
