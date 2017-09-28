import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios  from '../../api/axios';
import { getStudentAssignmentList } from '../actions';

import {Row, Col, Button, Input, Card, Collection, CollectionItem, MenuItem, Breadcrumb } from 'react-materialize';

class SpecificAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
            showCategoriesToggle: false
        };
        this.showCategories = this.showCategories.bind(this);

    }
    componentWillMount() {
        //needt to get list of students in this section and the id of their students_report
        console.log('Specific Assignment sectionId', this.props.params.id);
        this.props.dispatch(getStudentAssignmentList(this.props.params.id));
    }
    showCategories() {
        console.log('clicked')
        this.setState({
            showCategories: !this.state.showCategoriesToggle
        });
    }
    render() {
        const { showCategories } = this.state;
        const { studentList, currAssignmentId } = this.props;
        if(studentList) {
            var studentHtmlList = makeInnerList(studentList, currAssignmentId)
        }
        return (
            <div>
                <Row>
                    <Col m={12}>

                    <Breadcrumb className="indigo">
                        <MenuItem>Assignments</MenuItem>
                        <MenuItem>This Assignment</MenuItem>
                    </Breadcrumb>

                    </Col>
                </Row>
                <Row>
                    <Col m={12}>
                    <Input type="checkbox" label="Grade Anonymously" />
                    <Input type="checkbox" lable="Randomize Students" />
                    <Input type="checkbox" label="Grade By Group" />
                    <Input type="checkbox" label="Grade By Category" onClick={this.showCategories} />
                    <Input type="checkbox" label="Grade All Sections"/>
                    </Col>
                </Row>
                <Row>
                    <Col m={12}>
                {showCategories && <div>
                    <Link to={`/teacher/grading/assignment/${this.props.params.id}/${currAssignmentId}/titles`}>Grade Titles</Link>
                    <Button>Grade Questions</Button>
                    <Button>Grade Hypotheses</Button>
                </div>}
                    </Col>
                </Row>
                <Row>
                    <Col m={12}>
                        <p>Click a student to grade his/her report</p>
                    </Col>
                </Row>
                <Row>
                    <Col m={12}>
                        {studentHtmlList}
                    </Col>
                </Row>
            </div>
        )
    }
}


/************ CONNECTED COMPONENT *************/
var mapStateToProps = function(state) {
    return {
        studentList: state.teachers.studentAssignmentList,
        currAssignmentId: state.teachers.currAssignmentId
    }
}
export default connect(mapStateToProps)(SpecificAssignment);

/************* HELPER FUNCTIONS ***************/

function makeInnerList(items, assignmentId) {
    var itemList = items.map(item => {
        console.log(item);
        var status = determineStatus(item.status, assignmentId);
        return (
            <CollectionItem key={item.report_id.toString()}>
                <Link to={`/teacher/grading/assignment/${assignmentId}/student/${item.report_id}`}>{item.first_name}  {item.last_name }</Link>
                <p style={statusStyle}>Status: {status} </p>

            </CollectionItem>
        );
    });
    return (
        <Collection>
            {itemList}
        </Collection>
    );
}

function determineStatus(status) {
    if(status){
        return status;
    } else {
        return 'Not Started';
    }
}


var statusStyle = {
    display: 'inline',
    paddingLeft: '40px'

}
