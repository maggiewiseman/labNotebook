import React from 'react';
import { connect } from 'react-redux';
import { getAssignments } from '../actions';
import {Row, Col, Card, Modal, Button, Input} from 'react-materialize';
import { axios } from '../api/axios';
import { Link } from 'react-router';

export default class AddSection extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        axios.get('/api/teacher/' + this.props.sectionId).then(results => {
            if(results.data.success) {
                this.setState({
                    assignmentList: results.data.assignmentList
                });
            } else
        }).catch(e => {
            this.setState({
                error: 'Could not get list of assignments'
            })
        });
    }
    render() {

        const { assignmentList } = this.state;
        if(!assignmentList){
            return null;
        } else {

            var listAssignments = makeListAssignments(assignmentList)

            return (
                <div>
                    <ul>
                        {listAssignments}
                    </ul>
                </div>
            );
        } //end else for returns
    } //end render
} //end class
