import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios  from '../../api/axios';

import {Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

export default class SpecificAssignment extends React.Component {
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
        return axios.get('/api/teacher/students/' + this.props.params.id).then(results => {
            console.log('will mount', results);
            this.setState({
                assignmentId: this.props.params.id,
                studentList : results.data.studentList
            }, () => console.log('Students list? ', this.state));
        }).catch(e => {
            this.setState({
                error: e
            });
        })
    }
    showCategories() {
        console.log('clicked')
        this.setState({
            showCategories: !this.state.showCategoriesToggle
        });
    }
    render() {
        const { assignmentId, studentList, showCategories } = this.state;
        if(studentList) {
            var studentHtmlList = makeInnerList(studentList, assignmentId)
        }
        return (
            <div>
                <Row>
                    <Input type="checkbox" label="Grade Anonymously" />
                    <Input type="checkbox" lable="Randomize Students" />
                    <Input type="checkbox" label="Grade By Group" />
                    <Input type="checkbox" label="Grade By Section" onClick={this.showCategories} />
                </Row>
                {showCategories && <div>
                    <Button>Grade Titles</Button>
                    <Button>Grade Questions</Button>
                    <Button>Grade Hypotheses</Button>
                </div>}
                {studentHtmlList}
            </div>
        )
    }
}

function makeInnerList(items, assignmentId) {
    var itemList = items.map(item => {
        console.log(item);
        var status = determineStatus(item.status, assignmentId);
        return (
            <CollectionItem key={item.report_id.toString()}>
                <Link to={`/teacher/assignment/${assignmentId}/student/${item.report_id}`}>{item.first_name}  {item.last_name }</Link>
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
