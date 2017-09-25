import React from 'react';
import { connect } from 'react-redux';
import { saveNewSection } from '../actions';

class AddSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showDialog: false
        }
        this.handleInput = this.handleInput.bind(this);
        this.toggleShowDialog = this.toggleShowDialog.bind(this);
        this.submit = this.submit.bind(this);
    }
    toggleShowDialog() {
        this.setState({
            showDialog: !this.state.showDialog
        });
    }
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    submit() {
        this.props.dispatch(saveNewSection( this.props.courseId, this.state.sectionName, this.state.startDate, this.state.endDate));
        this.sectionNameInput.value = '';
        this.startDateInput.value = '';
        this.endDateInput.value = '';
        this.toggleShowDialog();
    }
    render() {
        const { courseId, error } = this.props;
        return (
            <div>
                {error && <p>{error}</p>}
                {this.state.showDialog || <button onClick={this.toggleShowDialog}>Add New Section</button>}
                {this.state.showDialog &&
                <div>
                    <input type="text" name="sectionName" placeholder="Section Name" onChange={this.handleInput} ref={el => this.sectionNameInput = el}/>
                    <input type="text" name="startDate" placeholder="Start Date (optional)" onChange={this.handleInput} ref={el => this.startDateInput = el}/>
                    <input type="text" name="endDate" placeholder="End Date (optional)" onChange={this.handleInput}     ref={el => this.endDateInput = el}/>
                    <button onClick={this.submit}>Save New Course</button>
                </div>}
            </div>
        )
    }
}


{/********* CONNECTED COMPONENT ********/}
const mapStateToProps = function(state) {
    return {
        error: state.teachers.error
    };
}
export default connect(mapStateToProps)(AddSection);
