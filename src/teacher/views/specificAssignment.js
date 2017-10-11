import React from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import axios  from '../../api/axios';
import { getStudentAssignmentList, getAssignmentProperties, getCourseList } from '../actions';
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
    componentWillReceiveProps(){
        if(this.props.assignmentProperties){
            var categoryList = getCategoryList(this.props.assignmentProperties[0]);
            //console.log('SHOW CATEGORIES: CATEGORY LIST: ', categoryList);
            this.setState({
                categoryList,
                category: categoryList[0]
            });
        }
    }
    componentWillMount() {
        if(this.props.assignmentProperties){
            var categoryList = getCategoryList(this.props.assignmentProperties[0]);
            //console.log('SHOW CATEGORIES: CATEGORY LIST: ', categoryList);
            this.setState({
                categoryList,
                category: categoryList[0]
            });
        }
        //needt to get list of students in this section and the id of their students_report
        //console.log('Specific Assignment for a given section assignmentId', this.props.params.id);
        this.props.dispatch(getCourseList());
        this.props.dispatch(getStudentAssignmentList(this.props.params.id));
        this.props.dispatch(getAssignmentProperties(this.props.params.id));
    }
    showCategories() {
        this.setState({
            showCategories: !this.state.showCategoriesToggle
        });
    }
    handleCatPick(e) {
        this.setState({
            category: e.target.value
        });
    }
    selectCategory() {
        browserHistory.push(`/teacher/category/assignment/${this.props.params.id}/${this.props.currAssignmentId}/${this.state.category}`);
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
            //var selector = makeSelector(assignmentProperties[0]);
            var categoryList = this.state.categoryList;
        }

        if(this.state.categoryList){
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
                                            {this.state.categoryList && makeSelector(this.state.categoryList, this.handleCatPick)}
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
        } else {
            return null;
        }
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

    var options = [];
    for(var key in assignmentProps) {
        if(assignmentProps[key] == 'individual' || assignmentProps[key] == 'group') {
            options.push(key);
        }
    }
    return options;
}
function makeSelector(options, handleCatPick) {

    var optionList = options.map(option => {
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

/***************** STYLES *************/
var statusStyle = {
    display: 'inline',
    paddingLeft: '40px'

}
