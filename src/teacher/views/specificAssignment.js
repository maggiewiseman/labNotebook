import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import axios  from '../../api/axios';
import { getStudentAssignmentList, getAssignmentProperties } from '../actions';
import { capitalize } from '../../helpers';

import {Row, Col, Button, Input, Card, Collection, CollectionItem, MenuItem, Breadcrumb } from 'react-materialize';

class SpecificAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: [],
            showCategoriesToggle: false,
        };
        this.showCategories = this.showCategories.bind(this);
        this.handleCatPick = this.handleCatPick.bind(this);
        this.selectCategory = this.selectCategory.bind(this);
    }
    componentWillMount() {
        //needt to get list of students in this section and the id of their students_report
        console.log('Specific Assignment for a given section assignmentId', this.props.params.id);
        this.props.dispatch(getStudentAssignmentList(this.props.params.id));
        this.props.dispatch(getAssignmentProperties(this.props.params.id));
    }
    showCategories() {
        console.log('clicked')
        this.setState({
            showCategories: !this.state.showCategoriesToggle
        });
    }
    handleCatPick(e) {
        console.log('cat picked', e.target.value);
        this.setState({
            category: e.target.value
        }, () => {
            console.log('STATE after handleCatPick', this.state);
        });
    }
    selectCategory() {
        console.log('select category picked');
        browserHistory.push(`/teacher/grading/assignment/${this.props.params.id}/${this.props.currAssignmentId}/${this.state.category}`);
    }
    render() {
        const { showCategories } = this.state;
        const { studentList, currAssignmentId, assignmentProperties } = this.props;
        var assignmentName = '';

        if(studentList) {
            var studentHtmlList = makeInnerList(studentList, currAssignmentId)
            assignmentName = studentList[0].name;
        }

        if(assignmentProperties) {
            var selector = makeSelector(assignmentProperties[0]);
        }

        return (
            <div>
                <Row>
                    <Col m={12}>
                        <Breadcrumb className="indigo">
                            <MenuItem>Assignments</MenuItem>
                            <MenuItem>{assignmentName}</MenuItem>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row>
                    <Col m={6}>
                    <Input type="checkbox" label="Grade Anonymously" />
                    <Input type="checkbox" label="Randomize Students" />
                    <Input type="checkbox" label="Grade By Group" />
                    <Input type="checkbox" label="Grade By Category" onClick={this.showCategories} />
                    </Col>
                </Row>
                <Row>
                    <Col m={12}>
                            {showCategories &&
                            <div>
                                <Row>
                                    <Col m={8}>
                                        {makeSelector(assignmentProperties[0], this.handleCatPick)}
                                    </Col>
                                    <Col m={4}>
                                        <div>
                                            <Button name="selectCategory" onClick={this.selectCategory}>Select</Button>
                                        </div>
                                    </Col>
                                </Row>
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
        currAssignmentId: state.teachers.currAssignmentId,
        assignmentProperties: state.teachers.assignmentProperties
    }
}
export default connect(mapStateToProps)(SpecificAssignment);

/************* HELPER FUNCTIONS ***************/

function makeInnerList(items, assignmentId) {
    var itemList = items.map(item => {
        console.log('studentListItem: ', item);
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

function getCategoryList(assignmentProps) {
    console.log('MAKE Category List', assignmentProps);

    var options = [];
    for(var key in assignmentProps) {
        if(assignmentProps[key] == 'individual' || assignmentProps[key] == 'group') {
            options.push(key);
        }
    }
    return options;
}
function makeSelector(assignmentProps, handleCatPick) {

    var options = getCategoryList(assignmentProps);
    console.log('OPTIONS ARRAY:', options);
    var optionList = options.map(option => {
        console.log("OPTION:", option);
        return (
            <option value={option}>{capitalize(option)}</option>
        )
    })
    return (

        <Input s={12} type='select' label="Category to Grade Selection" defaultValue='1' onChange={handleCatPick}>
            {optionList}
        </Input>

    );
}

/*

<div>
<option value=''>Title</option>
<option value='2'>Question</option>
<option value='3'>Option 3</option>
    <Link to={`/teacher/grading/assignment/${this.props.params.id}/${currAssignmentId}/titles`}>Grade Titles</Link>
</div>
*/

/***************** STYLES *************/
var statusStyle = {
    display: 'inline',
    paddingLeft: '40px'

}
