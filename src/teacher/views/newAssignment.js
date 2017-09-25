import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getAllSections, saveNewAssignment } from '../actions';


class TeacherNewAssignment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sections: [],
            include: {},
            editable: {},
            shared: {},
            defaults: {}
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
        const name = target.name.substring(0, name.substring(7,name.length));

        var include = Object.assign({}, this.state.include, {
            [name]: value
        });
        this.setState({include}, () => {
            console.log(this.state);
        });
    }
    handleInput(event) {

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
        const name = event.target.name.substring(0, event.target.name.length-5);

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
        this.props.dispatch(saveNewAssignment(this.state));
        //validation!
        //console.log(this.state);
        //browserHistory.push('/teacher/assignments');
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
                <div >
                    <div style={assignmentGridStyle}>
                        <p>Include</p>
                        <p>Category</p>
                        <p>Default values</p>
                        <p>Students can edit?</p>
                        <p>Shared amongst groups?</p>
                    </div>
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
                </div>;
        if(!sections) {
            return null;
        }else {
            return (
                <div>
                    <div>Sections list</div>
                    {makeSectionList(sections, this.handleSectionInput)}
                    <label forHtml="assignmentName">Assignment Name</label>
                    <input type="text" name="assignmentName" onChange={this.handleInput} />
                    <label forHtml="dueDate">Due Date (optional)</label>
                    <input type="text" name="dueDate" onChange={this.handleInput} />
                    <label forHtml="instructions">Instructions (optional)</label>
                    <input type="textarea" rows="4" name="instructions" onChange={this.handleInput} />
                    <label forHtml="groupLabCb">Group Lab?</label>
                    <input type="checkbox" name="groupLabCb" onChange={this.handleInput}/>

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

function createAssignmentCategoryDiv(category, events) {
    return (
        <div style={assignmentGridStyle}>
            <input type="checkbox" name={`include${category}`} onChange={events.include}/>
            <label forHtml={`for${category}`}>{`${category}`}</label>
            <input type="text" name={`${category}Input`} placeholder="Type default text here that will appear on all student assignments"  onChange={events.defaults} style={inputStyle}/>
            <input type="checkbox" name={`${category}Editable`} onChange={events.editable}/>
            <input type="checkbox" name={`${category}Share`} onChange={events.shared} />
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
