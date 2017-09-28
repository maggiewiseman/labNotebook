import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCategoriesForGrading, getStudentAssignmentList } from '../actions';

import {Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

class GradeACategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {

    }
    componentDidMount() {
        if(!this.props.studentAssignmentList) {
            this.props.dispatch(getStudentAssignmentList(this.props.params.sectionid));
        }
        console.log("GradeACategory", this.props);
        const { assignmentid, category} = this.props.params;
        this.props.dispatch(getCategoriesForGrading(assignmentid, category))
    }//end component did mount
    render() {
        console.log('PROPS in gradeACategory:', this.props);
        if(!this.props.currAssignmentId){
            console.log('returning null');
            return null;
        }
            const { studentCategoryData } = this.props;
            const { sectionid, assignmentid } = this.props.params;
            var gradeList = makeList(studentCategoryData, sectionid, assignmentid, this.handleChange);
            console.log("GRADELIST: ", gradeList);
            return (
                <div>
                    <p>Grade these:</p>
                    {gradeList}
                </div>
            )

    }
}

/************ CONNECTED COMPONENT *************/

var mapStateToProps = function(state) {
    return {
        studentCategoryData: state.teachers.studentCategoryData,
        currAssignmentId: state.teachers.currAssignmentId,
        studentAssignmentList: state.teachers.studentAssignmentList
    }
}
export default connect(mapStateToProps)(GradeACategory);



/*************** HELPER FUNCTIONS ***************/
function makeList(data) {
    console.log('Make list', data, event);
    return data.map(studentData => {
        return (
            <Row>
                <Col s={12} m={6}>
                    <p>Name: </p>
                    <div>
                    {studentData.content}
                    </div>
                </Col>
                <Col s={12} m={6}>
                    <Input type="textarea" name={`comments_${studentData.id}`} onChange={event} label="Comments"/>
                    <Input type="text" label="Grade" onChange={event}/>
                </Col>
            </Row>);
    });
}
