import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSections, saveNewAssignment } from '../actions';


class TeacherNewAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            AbstractEditable: true,
            AbstractInput : "",
            AbstractShare : false,
            CalculationsEditable: true,
            CalculationsInput : "",
            CalculationsShare : false,
            DataEditable: true,
            DataInput : "",
            DataShare : false,
            DiscussionEditable: true,
            DiscussionInput : "",
            DiscussionShare : false,
            HypothesisEditable: true,
            HypothesisInput : "",
            HypothesisShare : false,
            MaterialsEditable: true,
            MaterialsInput : "",
            MaterialsShare : false,
            ProceduresEditable: true,
            ProceduresInput : "",
            ProceduresShare : false,
            QuestionInput : "",
            QuestionShare : false,
            TitleInput : "",
            TitleShare : false,
            VariablesEditable: true,
            VariablesInput : "",
            VariablesShare : false,
            assignmentName : "",
            dueDate :"",
            includeAbstract : false,
            includeCalculations : false,
            includeData : false,
            includeDiscussion : false,
            includeHypothesis : false,
            includeMaterials : false,
            includeProcedures : false,
            includeQuestion : false,
            includeTitle : false,
            includeVariables : false,
            instructions : "",
            QuestionEditable: true,
            sectioncb3 : false,
            TitleEditable: true
        };
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
    }
    componentDidMount() {

        this.props.dispatch(getAllSections());

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
    submit() {
        this.props.dispatch(saveNewAssignment(this.state.assignmentInfo));
        //validation!
        //console.log(this.state);
        //browserHistory.push('/teacher/assignments');
    }
    render() {
        const { sections } = this.props;

        var assignmentOptions =
                <div >
                    <div style={assignmentGridStyle}>
                        <p>Include</p>
                        <p>Category</p>
                        <p>Default values</p>
                        <p>Students can edit?</p>
                        <p>Shared amongst groups?</p>
                    </div>
                    {createAssignmentCategoryDiv('Title', this.handleInput) }
                    {createAssignmentCategoryDiv('Question', this.handleInput)}
                    {createAssignmentCategoryDiv('Abstract', this.handleInput)}
                    {createAssignmentCategoryDiv('Hypothesis', this.handleInput)}
                    {createAssignmentCategoryDiv('Variables', this.handleInput)}
                    {createAssignmentCategoryDiv('Materials', this.handleInput)}
                    {createAssignmentCategoryDiv('Procedures', this.handleInput)}
                    {createAssignmentCategoryDiv('Data', this.handleInput)}
                    {createAssignmentCategoryDiv('Calculations', this.handleInput)}
                    {createAssignmentCategoryDiv('Discussion', this.handleInput)}
                </div>;
        if(!sections) {
            return null;
        }else {
            return (
                <div>
                    <div>Sections list</div>
                    {makeSectionList(sections, this.handleInput)}
                    <label forHtml="assignmentName">Assignment Name</label>
                    <input type="text" name="assignmentName" onChange={this.handleInput} />
                    <label forHtml="dueDate">Due Date (optional)</label>
                    <input type="text" name="dueDate" onChange={this.handleInput} />
                    <label forHtml="instructions">Instructions (optional)</label>
                    <input type="textarea" rows="4" name="instructions" onChange={this.handleInput} />
                    <label forHtml="groupLabCb">Group Lab?</label>
                    <input type="checkbox" name="groupLabCb" onChange={this.handleInput} checked />

                    <h3>Assignment Details</h3>
                    {assignmentOptions}
                    <button onClick={this.submit}>Save assignment</button>
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


function createAssignmentCategoryDiv(category, save) {
    return (
        <div style={assignmentGridStyle}>
            <input type="checkbox" name={`include${category}`} onChange={save}/>
            <label forHtml={`for${category}`}>{`${category}`}</label>
            <input type="text" name={`${category}Input`} placeholder="Type default text here that will appear on all student assignments"  onChange={save} style={inputStyle}/>
            <input type="checkbox" name={`${category}Editable`} checked onChange={save}/>
            <input type="checkbox" name={`${category}Share`} onChange={save} />
        </div>
    )
}

function makeSectionList(items, save) {
    var itemList = items.map(item => {
        console.log(item);
        return (
            <li key={item.id.toString()}>
                <input type="checkbox" name={`sectioncb${item.id}`} onChange={save}/>{item.name}
            </li>
        );
    });
    return (
        <ul>
            {itemList}
        </ul>
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
