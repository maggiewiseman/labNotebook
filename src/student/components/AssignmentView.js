import React from 'react';
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router';
import axios from 'axios';
import { connect } from 'react-redux';
import {getAssignment, saveAssignment} from '../actions';



class Assignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.sectionID);
        this.handleChange = this.handleChange.bind(this);
        this.props.dispatch = this.props.dispatch.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleSaveAll = this.handleSaveAll.bind(this);
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

        var field = [e.target.name]



        var send = {
            [e.target.name]: this.state[field]
        }
        const {id} = this.props.params;
        this.props.dispatch(saveAssignment(id, send));

    }

    handleSaveAll(e) {

        console.log('save all', this.state);
        const {id} = this.props.params;
        this.props.dispatch(saveAssignment(id, this.state));
    }

    render() {


        const{assignment, studentInfo} = this.props;


        if(!assignment) {
            return null
        }

        var assignmentOptions =

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
                </div>;



        return (
            <div>

            <h3>Complete the following assignment</h3>

            {assignmentOptions}


            <button name='saveAll' onClick={this.handleSaveAll}>Save All</button>
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



function editable(section, category, handleChange, handleSave) {
    console.log(section[category + '_content']);

    if(section[category + '_editable']) {
        if(section[category + '_content']) {
            console.log("YAAAW");


            return (
                <div>
                    <label>{category}:</label>

                    <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{section[category + '_content']}</textarea>

                    <button name={category} onClick={handleSave}>Save</button>
                </div>


            )
        } else {
        return (
            <div>
                <label>{category}:</label>

                <textarea name={category} placeholder="Type here.." cols="30" rows="5" onChange={handleChange} />

                <button name={category} onClick={handleSave}>Save</button>
            </div>
            )
        }
    } else if(section[category + '_editable'] === null || section[category + '_content'] === null) {
        return
    } else {
        return (
        <div>
        <h3>{category}:</h3>
        <p>{section[category + '_content']}</p>
        </div>
    )
    }

}
