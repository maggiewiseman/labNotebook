import React from 'react';
import { connect } from 'react-redux';
import { getAssignments } from '../actions';
import {Row, Col, Card, Modal, Button, Input, Collection, CollectionItem} from 'react-materialize';
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
        var url ='/api/teacher/assignments/' + this.props.sectionId;
        console.log('URL', url);
        axios.get('/api/teacher/assignments/' + this.props.sectionId).then(results => {
            console.log('Back from getting assignments:,', results);
            if(results.data.success) {
                console.log(results.data.assignmentList);
                this.setState({
                    assignmentList: results.data.studentAssignmentList
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
            console.log('AssignmentList state:', this.state);
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
            <CollectionItem key={item.id.toString()}>

                <Link to={`/teacher/assignment/${item.id}`}>{item.name}</Link>
                    <p style={dueStyle}>Due: {item.due}</p>

            </CollectionItem>
        );
    });
    return (
        <div>
            <Collection>
                {itemList}
            </Collection>
        </div>
    );
}

/******* STYLES **********/

var dueStyle = {
    display: 'inline',
    paddingLeft: '40px'

}
