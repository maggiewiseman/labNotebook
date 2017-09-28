import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios  from '../../api/axios';
import { getCategoriesForGrading, getStudentAssignmentList } from '../actions';

import {Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

class GradeACategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        }
    }
    componentWillMount() {
        if(!this.props.studentAssignmentList) {
            this.props.dispatch(getStudentAssignmentList(this.props.params.sectionid));
        }
        console.log("GradeACategory", this.props.params);
        const { assignmentid, category} = this.props.params;
        this.props.dispatch(getCategoriesForGrading(assignmentid, category))
    }//end component will mount
    render() {
        const { studentCategoryData } = this.props;
        const { sectionid, assignmentid } = this.props.params;
        var gradeList = makeList(studentCategoryData, sectionid, assignmentid);
        return (
            <div>
                Category Grading...
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

    // var cards = data.map(student => {
    //
    // })
    return 'list';
}
