import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios  from '../../api/axios';
import { getCategoriesForGrading } from '../actions';

import {Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

class GradeACategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        }
    }
    componentWillMount() {
        console.log("GradeACategory", this.props.params.assignmentid);
        const { assignmentid, category} = this.props.params;
        this.props.dispatch(getCategoriesForGrading(assignmentid, category))
    }//end component will mount
    render() {
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
        currAssignmentId: state.teachers.currAssignmentId
    }
}
export default connect(mapStateToProps)(GradeACategory);
