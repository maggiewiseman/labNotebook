import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommittedAssignments, saveGrading, commitGrade } from '../actions';
import Logout from '../../auth/logout.js';
import {capitalize} from '../../helpers';



class GradeAssignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
        this.handleSaveGrading = this.handleSaveGrading.bind(this);
        this.handleSaveAll = this.handleSaveAll.bind(this);
        this.handleCommit = this.handleCommit.bind(this);

    }


    componentDidMount() {

        const {id, reportid} = this.props.params;
        console.log(id, reportid);

        this.props.dispatch(getCommittedAssignments(id, reportid));
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        }, () => {
            console.log(this.state);
        });
    }


    handleSaveGrading(e) {
        const {id, reportid} = this.props.params;

        var field = e.target.name

        var send = {
            [field+'_comment']: this.state[field+'_comment'],
            [field+'_grade']: this.state[field+'_grade']
        }

            this.props.dispatch(saveGrading(id, reportid, send));
    }

    handleCommit(e) {
        const {id, reportid} = this.props.params;
        console.log(e.target.name);
        var field = e.target.name

        var send = {
            [field+'_comment']: this.state[field+'_comment'],
            [field+'_grade']: this.state[field+'_grade']
        }
        console.log(send);
        this.props.dispatch(commitGrade(id, reportid, send));

    }

    handleSaveAll(e) {

        const {id, reportid} = this.props.params;

            this.props.dispatch(saveGrading(id, reportid, this.state));
    }


    render() {
        var form;
        const{assignment} = this.props;


        if(!assignment) {
            return null
        }

        var committedAssignment =
                <div>
                    {committed (assignment.title, 'title', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.question, 'question', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.abstract, 'abstract', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.hypothesis, 'hypothesis', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.variable, 'variable', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.material, 'material', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.procedure, 'procedure', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.data, 'data', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.calculation, 'calculation', this.handleChange, this.handleSaveGrading)}
                    {committed (assignment.discussion, 'discussion', this.handleChange, this.handleSaveGrading)}


                </div>

        var finalReportComments =
                <div>

                {finalComments(assignment.report_comments, assignment.report_grade, this.handleChange)}

                </div>

        return (
            <div>

            {committedAssignment}

            <button name='saveAll' onClick={this.handleSaveAll}>Save All</button>

            {finalReportComments}

            <button name='commit' onClick={this.handleCommit}>Commit To Student</button>


            </div>
        )


    }

}

var mapStateToProps = function(state) {
    return {
        assignment: state.teachers.committedAssignment
    }
}
export default connect(mapStateToProps)(GradeAssignment);




function committed (section, category, handleChange, handleSaveGrading) {

    if(section[category + '_editable']) {

        if (section[category + '_comments'] && section[category + '_grade']) {
            return (
            <div>
                <label>{capitalize(category)}:</label>

                <div>Teacher Comments</div>

                <textarea name={`${category}_comment`} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{section[category + '_comments']}</textarea>

                <div>Teacher Grade</div>

                <textarea name={`${category}_grade`} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{section[category + '_grade']}</textarea>


                <button name={category} onClick={handleSaveGrading}>Save</button>
            </div>
            )
        } else if(section[category + '_grade']) {

            return (

                <div>
                    <label>{capitalize(category)}:</label>

                    <div>Teacher Comments</div>

                    <textarea name={`${category}_comment`} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}></textarea>

                    <div>Teacher Grade</div>

                    <textarea name={`${category}_grade`} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{section[category + '_grade']}</textarea>


                    <button name={category} onClick={handleSaveGrading}>Save</button>
                </div>
            )
        } else if (section[category + '_comments']) {
            return (

                <div>
                    <label>{capitalize(category)}:</label>

                    <div>Teacher Comments</div>

                    <textarea name={`${category}_comment`} placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{section[category + '_comments']}</textarea>

                    <div>Teacher Grade</div>

                    <textarea onChange={handleChange} name={`${category}_grade`} placeholder="Type here.." cols="30" rows="5" ></textarea>


                    <button name={category} onClick={handleSaveGrading}>Save</button>
                </div>
            )

        }  else {

            return (
                <div>
                <h3>{capitalize(category)}:</h3>

                <p>{section[category + '_content']}</p>

                <div>Teacher Comments</div>

                <textarea onChange={handleChange} name={`${category}_comment`} placeholder="Type here.." cols="30" rows="5" ></textarea>

                <div>Teacher Grade</div>

                <textarea onChange={handleChange} name={`${category}_grade`} placeholder="Type here.." cols="30" rows="5" ></textarea>

                <button onClick={handleSaveGrading} name={category} >Save</button>

                </div>
                )
        }
    } else if(section[category + '_editable'] === null ||           section[category + '_content'] === null) {

        return

    } else {
        return (
            <div>
            <h5>{capitalize(category)}:</h5>
            <p>{section[category + '_content']}</p>
            </div>
        )

    }
}

function finalComments(comment, grade, handleChange) {

    if(comment && grade) {

        return (

        <div>

            <div>Final Comment</div>

        <textarea name="commit_comment" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{comment}</textarea>

        <div>Final Grade</div>

        <textarea name="commit_grade" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{grade}</textarea>

        </div>
        )

    } else if (grade) {

        return (

        <div>

        <div>Final Comment</div>

        <textarea name="commit_comment" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}></textarea>

        <div>Final Grade</div>

        <textarea name="commit_grade" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{grade}</textarea>

        </div>
        )


    } else if (comment) {
        return (

        <div>

        <div>Final Comment</div>

        <textarea name="commit_comment" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}>{comment}</textarea>

        <div>Final Grade</div>

        <textarea name="commit_grade" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}></textarea>

        </div>
        )
    } else {
        return (

        <div>

        <div>Final Comment</div>

        <textarea name="commit_comment" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}></textarea>

        <div>Final Grade</div>

        <textarea name="commit_grade" placeholder="Type here.." cols="30" rows="5" onChange={handleChange}></textarea>

        </div>
        )
    }
}
