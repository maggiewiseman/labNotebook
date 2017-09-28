import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCommittedAssignments } from '../actions';
import Logout from '../../auth/logout.js';



class GradeAssignment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log('here?');
    }


    componentDidMount() {

        const {id, reportid} = this.props.params;
        console.log(id, reportid);

        this.props.dispatch(getCommittedAssignments(id, reportid));
    }


    render() {
        var form;
        const{assignment} = this.props;


        if(!assignment) {
            return null
        }

        var committedAssignment =
                <div>
                    {committed (assignment.title, 'title')}
                    {committed (assignment.question, 'question')}
                    {committed (assignment.abstract, 'abstract')}
                    {committed (assignment.hypothesis, 'hypothesis')}
                    {committed (assignment.variable, 'variable')}
                    {committed (assignment.material, 'material')}
                    {committed (assignment.procedure, 'procedure')}
                    {committed (assignment.data, 'data')}
                    {committed (assignment.calculation, 'calculation')}
                    {committed (assignment.discussion, 'discussion')}


                </div>

        return (
            <div>
            Hi
            {committedAssignment}
            </div>
        )


    }

}

var mapStateToProps = function(state) {
    return {
        assignment: state.teachers.committedAssignment
    }
}
export default connect(mapStateToProps)(GradeAssignment);




function committed (section, category) {

    if(section[category + '_content']) {

    return (
        <div>
        <h3>{category}:</h3>
        <p>{section[category + '_content']}</p>
        </div>
        )
    }
}
