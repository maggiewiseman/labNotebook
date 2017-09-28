import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getCategoriesForGrading, getStudentAssignmentList } from '../actions';

import {Row, Col, Button, Input, Card, Collection, CollectionItem } from 'react-materialize';

class GradeACategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveEach = this.saveEach.bind(this);
        this.saveAll = this.saveAll.bind(this);
    }
    componentWillMount() {
        if(!this.props.studentAssignmentList) {
            this.props.dispatch(getStudentAssignmentList(this.props.params.sectionid));
        }
        console.log("GradeACategory", this.props);
        const { assignmentid, category} = this.props.params;
        this.props.dispatch(getCategoriesForGrading(assignmentid, category))
    }//end component did mount
    componentDidMount(){
        this.componentWillMount();
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => console.log(this.state));
    }
    saveEach(e) {
        console.log('you clicked save each');
    }
    saveAll(e) {
        console.log('you clicked save all');
    }
    render() {
        console.log('PROPS in gradeACategory:', this.props);
        if(!this.props.studentCategoryData){
            console.log('returning null');
            return null;
        }

            const { studentCategoryData } = this.props;
            const { sectionid, assignmentid } = this.props.params;

            const events = {
                inputChange : this.handleChange,
                saveEach : this.saveEach,
                saveAll : this.saveAll
            }
            var gradeList = makeList(studentCategoryData, sectionid, assignmentid, events);
            console.log("GRADELIST: ", gradeList);
            return (
                <div>
                    <p>Grade these:</p>
                    {gradeList}

                    <Row>
                        <div>
                            <Button onClick={this.saveAll}>Save All</Button>
                        </div>
                    </Row>
                </div>
            )

    }
}

/************ CONNECTED COMPONENT *************/

var mapStateToProps = function(state) {
    return {
        studentCategoryData: state.teachers.studentCategoryData,
        currAssignmentId: state.teachers.currAssignmentId,
        studentAssignmentList: state.teachers.studentAssignmentList
    }
}
export default connect(mapStateToProps)(GradeACategory);



/*************** HELPER FUNCTIONS ***************/
function makeList(data, sectionid, assignmentid, events) {
    console.log('Make list', events);
    return data.map(studentData => {
        return (
            <Card title={studentData.first_name} >
            <Row>
                <Col s={12} m={6}>
                    <p>Name: </p>
                    <div>
                    {studentData.content}
                    </div>
                </Col>
                <Col s={12} m={6}>
                    <div>
                    <Input s={12} type="textarea" name={`comments_${studentData.id}`} onChange={events.inputChange} label="Comments"/>
                    </div>
                    <Button onClick={events.saveEach}>Save</Button>
                    <div>
                    <Input s={12} name={`grade_${studentData.id}`} type="text" label="Grade" onChange={events.inputChange}/>
                    <Button onClick={events.saveEach}>Save</Button>
                    </div>
                </Col>
            </Row>
            </Card>);
    });
}
