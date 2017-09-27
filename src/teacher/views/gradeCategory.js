import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios  from '../../api/axios';

import {Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

export default class SpecificAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        }
    }
    componentWillMount() {
        //needt to get list of students in this section and the id of their students_report
        console.log('Specific Assignment sectionId', this.props.params.id);
        return axios.get('/api/teacher/grade/category' + this.props.params.id).then(results => {
            console.log('will mount', results);

            }, () => console.log('Students list? ', this.state));
        }).catch(e => {
            this.setState({
                error: e
            });
        })
    }//end component will mount
    render() {
        return (
            <div>
            </div>
        )
    }
}
