import React from 'react';
import { connect } from 'react-redux';
import { getAssignments } from '../actions';
import {Row, Col, Card, Modal, Button, Input} from 'react-materialize';
import axios  from '../../api/axios';
import { Link } from 'react-router';

export default class AssignmentList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            assignmentList : []
        }
    }
    componentDidMount() {
        console.log('Component did mount: Asssignment List');
        axios.get('/api/teacher/assignments/' + this.props.sectionId).then(results => {
            if(results.data.success) {
                console.log(results.data.assignmentList);
                this.setState({
                    assignmentList: results.data.assignmentList
                });
            } else {
                this.setState({
                    error: 'Could not get list of assignments'
                });
            }
        }).catch(e => {
            this.setState({
                error: 'Could not get list of assignments'
            })
        });
    }
    render() {

        if(!this.state.assignmentList){
            return null;
        } else {
            const { assignmentList } = this.state;
            var listAssignments = makeListAssignments(assignmentList);

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


function makeListAssignments(items) {
    var itemList = items.map(item => {
        console.log(item);
        return (
            <li key={item.id.toString()}>
                {item.name}
            </li>
        );
    });
    return (
        <ul>
            {itemList}
        </ul>
    );
}
