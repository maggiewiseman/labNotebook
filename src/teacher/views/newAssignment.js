import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSections, saveNewAssignment } from '../actions';
import {Row, Col, Button, Input, Card, Collection, CollectionItem, Breadcrumb, MenuItem } from 'react-materialize'

class TeacherNewAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            include: {
                title: false,
                question: false,
                abstract: false,
                hypothesis: false,
                variables: false,
                materials: false,
                procedures: false,
                data: false,
                calculations: false,
                discussion:false
            },
            editable: {},
            shared: {},
            defaults: {
                defaults_title: "",
                defaults_question: "",
                defaults_abstract: "",
                defaults_hypothesis: "",
                defaults_variables: "",
                defaults_materials: "",
                defaults_procedures: "",
                defaults_data: "",
                defaults_calculations: "",
                defaults_discussion: "",
            }
        };
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
        this.handleSectionInput = this.handleSectionInput.bind(this);
        this.handleIncludeInput = this.handleIncludeInput.bind(this);
        this.handleDefaults = this.handleDefaults.bind(this);
        this.handleEditable = this.handleEditable.bind(this);
        this.handleShared = this.handleShared.bind(this);
    }
    componentDidMount() {

        this.props.dispatch(getAllSections());

    }
    handleSectionInput(event){
        var name = event.target.name;
        var sections = [...this.state.sections, name.substring(9,name.length)];
        this.setState({
            sections
        }, () => {
            console.log(this.state);
        });
    }
    handleIncludeInput(event){

        const target = event.target;
        const value = target.checked;
        const name = target.name;

        var include = Object.assign({}, this.state.include, {
            [name]: value
        });
        this.setState({include}, () => {
            console.log(this.state);
        });
    }
    handleInput(event) {
        const target = event.target;
        if(target.type == 'checkbox') {
            console.log(target.checked)
        }
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        }, () => {
            console.log('New Assignment: handleInput state:', this.state);
        });
    }
    handleDefaults() {
        const value = event.target.value;
        const name = event.target.name;

        var defaults = Object.assign({}, this.state.defaults, {
            [name]: value
        });
        this.setState({defaults}, () => {
            console.log(this.state);
        });
    }
    handleEditable() {
        const target = event.target;
        const value = target.checked;
        const name = target.name.substring(0, target.name.length-8);

        var editable = Object.assign({}, this.state.editable, {
            [name]: value
        });
        this.setState({editable}, () => {
            console.log(this.state);
        });
    }
    handleShared() {
        const target = event.target;
        const value = target.checked;
        const name = target.name.substring(0, target.name.length-5);

        var shared = Object.assign({}, this.state.shared, {
            [name]: value
        });
        this.setState({shared}, () => {
            console.log(this.state);
        });
    }
    submit() {
        if(this.checkSections()) {
            if(this.state.assignmentName){
                console.log('dispatching');
                this.props.dispatch(saveNewAssignment(this.state));

            } else {
                this.setState({
                    assignError: 'The assignment must have a name'
                });
            }
        } else {
            this.setState({
                sectionError: "Please select a class"
            });
        }

        //validation!
        //console.log(this.state);
        //browserHistory.push('/teacher/assignments');
    }
    checkSections() {
        console.log(console.log(this.state.sections.length));
        if(this.state.sections.length > 0) {
            return true;
        }
        return false;
    }
    render() {
        const { sections } = this.props;

        var events = {
            include: this.handleIncludeInput,
            defaults: this.handleDefaults,
            editable: this.handleEditable,
            shared: this.handleShared
        }

        var assignmentOptions =
                <Row>
                    <Row>
                    {createAssignmentCategoryDiv('Title', events) }
                    {createAssignmentCategoryDiv('Question', events)}
                    {createAssignmentCategoryDiv('Abstract', events)}
                    {createAssignmentCategoryDiv('Hypothesis', events)}
                    {createAssignmentCategoryDiv('Variables', events)}
                    {createAssignmentCategoryDiv('Materials', events)}
                    {createAssignmentCategoryDiv('Procedures', events)}
                    {createAssignmentCategoryDiv('Data', events)}
                    {createAssignmentCategoryDiv('Calculations', events)}
                    {createAssignmentCategoryDiv('Discussion', events)}
                    </Row>
                </Row>;
        if(!sections) {
            return null;
        }else {
            return (
                <div>
                    <Row>
                        <Col m={12}>

                        <Breadcrumb className="indigo">
                            <MenuItem>Assignments</MenuItem>
                            <MenuItem>New Assignment</MenuItem>
                        </Breadcrumb>

                        </Col>
                    </Row>
                    <Row>
                    <h5>To which classes should the assignment be added?</h5>

                        {this.state.sectionError && <p className='red-text darken-4'>{this.state.sectionError}</p>}
                        {makeSectionList(sections, this.handleSectionInput)}
                    </Row>
                    <Row>
                    <h5>Assignment Basics</h5>
                    {this.state.assignError && <p className='red-text darken-4'>{this.state.assignError}</p>}
                        <Input m={12} type="text" name="assignmentName" onChange={this.handleInput} label="Assignment Name"/>
                        <Input m={6} type="text" name="due" onChange={this.handleInput} label="Due Date YYYY-MM-DD (optional)" />
                        <Input m={6} type="checkbox" name="group_lab" onChange={this.handleInput} label="Group Lab?"/>
                        <Input m={12} type="textarea" name="instructions" onChange={this.handleInput} label="Instructions (optional)" />

                    </Row>
                    <Row>
                    <h5>Assignment Details</h5>

                        {assignmentOptions}

                        <Button onClick={this.submit}>Save assignment</Button>
                    </Row>
                </div>

            );
        }
    }
}

/********* CONNECTED COMPONENT ********/
const mapStateToProps = function(state) {
    return {
        error: state.teachers.error,
        sections: state.teachers.sections
    };
}
export default connect(mapStateToProps)(TeacherNewAssignment);

function createAssignmentCategoryDiv(category, events) {
    return (
        <Row>
            <Input m={2} type="checkbox" name={`${category.toLowerCase()}`} onChange={events.include} label={category}/>
            <Input m={2} type="checkbox" name={`${category.toLowerCase()}Editable`} onChange={events.editable} label={`Editable`}/>
            <Input m={2} type="checkbox" name={`${category.toLowerCase()}Share`} onChange={events.shared} label={`Share ${category}`}/>
            <Input m={6} type="text" name={`defaults_${category.toLowerCase()}`} placeholder={`Default ${category}. Will appear on all student assignments`}  onChange={events.defaults} />

        </Row>
    )
}

function makeSectionList(items, save) {
    var itemList = items.map(item => {
        console.log(item);
        return (
            <Input type="checkbox" name={`sectioncb${item.id}`} onChange={save} label={item.name}/>

        );
    });
    return (
        <Row>
            {itemList}
        </Row>
    );
}

/************** STYLES ****************/
var assignmentGridStyle = {
    display: "grid",
    gridTemplateColumns: '100px 100px auto 100px 100px'
}

var inputStyle = {
    width: '400px'
}
