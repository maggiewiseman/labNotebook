import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios  from '../../api/axios';

import {Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

export default class SpecificAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentList: []
        }
    }
    componentWillMount() {
        //needt to get list of students in this section and the id of their students_report
        console.log('Specific Assignment sectionId', this.props.params.id);
        return axios.get('/api/teacher/students/' + this.props.params.id).then(results => {
            console.log('will mount', results);
            this.setState({
                studentList : results.data.studentList
            }, () => console.log('Students list? ', this.state));
        }).catch(e => {
            this.setState({
                error: e
            });
        })
    }
    render() {
        if(this.state.studentList) {
            console.log('got student list');
        }
        return (
            <div>
                Specific Assignment will go here!
            </div>
        )
    }
}
