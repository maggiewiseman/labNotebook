import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommittedAssignments, saveGrading, commitGrade } from '../actions';
import Logout from '../../auth/logout.js';
import {capitalize} from '../../helpers';
import {Row, Col, Button, Input, Card, Collection, CollectionItem, MenuItem, Breadcrumb } from 'react-materialize';



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
                <div>
                    <Button name='saveAll' onClick={this.handleSaveAll}>Save All</Button>
                </div>
        </div>

        var finalReportComments =

        <div>
                <div>

                    {finalComments(assignment.report_comments, assignment.report_grade, this.handleChange, this.handleCommit)}

                </div>
        </div>

        return (

            <div>
                {committedAssignment}
                {finalReportComments}
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
                    <Card  title={capitalize(category)} >
                        <Input type="textarea" name={`${category}_comment`} onChange={handleChange}>{section[category + '_comments']} label="Comments"></Input>

                        <Input type="text" label="Grade" name={`${category}_grade`} onChange={handleChange}>{section[category + '_grade']}></Input>

                        <div>
                            <Button name={category} onClick={handleSaveGrading}>Save</Button>
                        </div>
                    </Card>
                </div>
            )
        } else if(section[category + '_grade']) {

            return (

                <Card title={capitalize(category)}>

                    <Input s={12}  type="textarea" label="Comment" name={`${category}_comment`} onChange={handleChange}></Input>

                    <Input s={12} type="text" label="Grade" name={`${category}_grade`} onChange={handleChange}>{section[category + '_grade']}</Input>

                    <div>
                        <Button name={category} onClick={handleSaveGrading}>Save</Button>
                    </div>
                </Card>
            )
        } else if (section[category + '_comments']) {
            return (

                <Card title={capitalize(category)}>

                    <Input s={12} type="textarea" name={`${category}_comment`} label="comments" onChange={handleChange}>{section[category + '_comments']}</Input>

                    <Input s={12} type="text" onChange={handleChange} name={`${category}_grade`} label="Grade" ></Input>

                    <Button name={category} onClick={handleSaveGrading}>Save</Button>
                </Card>
            )

        }  else {

            return (
                <div>

                    <Card title={capitalize(category)}>
                    <Row>
                        <Col s={12} m={6}>
                            <p>{section[category + '_content']}</p>
                        </Col>
                        <Col s={12} m={6}>
                            <Input s={12}  type="textarea" label="Comments" onChange={handleChange} name={`${category}_comment`}></Input>

                            <Input s={12} type="text" onChange={handleChange} name={`${category}_grade`} label="Grade"></Input>
                            <div>
                                <Button onClick={handleSaveGrading} name={category} >Save</Button>
                            </div>
                        </Col>
                    </Row>
                    </Card>
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

function finalComments(comment, grade, handleChange, handleCommit) {

    if(comment && grade) {

        return (

            <div>

                <Card title="Final Comments">

                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}>{comment}</Input>

                    <Input s={12} type="text" label="Overall Grade" name="commit_grade" onChange={handleChange}>{grade}</Input>

                </Card>
            </div>
        )

    } else if (grade) {

        return (

            <div>

                <Card title="Final Comments">

                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}></Input>

                    <Input s={12} type="text" name="commit_grade" onChange={handleChange}>{grade}</Input>
                </Card>
            </div>
        )


    } else if (comment) {
        return (

            <div>

                <Card title="Final Comments">

                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}>{comment}</Input>

                    <Input s={12} type="text" label="Overall Grade" name="commit_grade" onChange={handleChange}></Input>

                </Card>
            </div>
        )
    } else {
        return (

            <div>

                <Card title="Final Comments">


                    <Input s={12} type="textarea" label="Comments" name="commit_comment" onChange={handleChange}></Input>

                    <Input s={12} type="text" label="Overall Grade" name="commit_grade" onChange={handleChange}></Input>


                    <div>

                        <Button name='commit' onClick={handleCommit}>Commit To Student</Button>

                    </div>

                </Card>
            </div>
        )
    }
}
