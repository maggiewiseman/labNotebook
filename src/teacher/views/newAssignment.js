import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSections, saveNewAssignment } from '../actions';


class TeacherNewAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.submit = this.submit.bind(this);
    }
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log('Add Section: handleInput state:', this.state);
        });
    }
    componentDidMount() {

        this.props.dispatch(getAllSections());
        
    }
    submit() {
        //this.props.dispatch(saveNewAssignment());
        //validation!
        console.log(this.state);
        //browserHistory.push('/teacher/assignments');
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
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
                    {createAssignmentCategoryDiv('Title') }
                    {createAssignmentCategoryDiv('Question')}
                    {createAssignmentCategoryDiv('Abstract')}
                    {createAssignmentCategoryDiv('Hypothesis')}
                    {createAssignmentCategoryDiv('Variables')}
                    {createAssignmentCategoryDiv('Materials')}
                    {createAssignmentCategoryDiv('Procedures')}
                    {createAssignmentCategoryDiv('Data')}
                    {createAssignmentCategoryDiv('Calculations')}
                    {createAssignmentCategoryDiv('Discussion')}
                </div>;
        if(!sections) {
            return null;
        }else {
            return (
                <div>
                    <div>Sections list</div>
                    {makeSectionList(sections)}
                    <label forHtml="assignmentName">Assignment Name</label>
                    <input type="text" name="assignmentName" onChange={this.handleInput} />
                    <label forHtml="dueDate">Due Date (optional)</label>
                    <input type="text" name="dueDate" onChange={this.handleInput} />
                    <label forHtml="instructions">Instructions (optional)</label>
                    <input type="textarea" rows="4" name="instructions" onChange={this.handleInput} />

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


function createAssignmentCategoryDiv(category) {
    return (
        <div style={assignmentGridStyle}>
            <input type="checkbox" name={`include${category}checkbox`}/>
            <label forHtml={`for${category}`}>{`${category}`}</label>
            <input type="textbox" name={`${category}Input`} placeholder="Type default text here that will appear on all student assignments" />
            <input type="checkbox" name={`${category}Editable`}/>
            <input type="checkbox" name={`${category}Share`} />
        </div>
    )
}

function makeSectionList(items) {
    var itemList = items.map(item => {
        console.log(item);
        return (
            <li key={item.id.toString()}>
                <input type="checkbox" name={`sectioncb${item.id}`}/>{item.name}
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
