import React from 'react';

export default class AddSection extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            showAddSectionDialog: false
        }
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e) {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            console.log('Add Section: handleInput state:', this.state);
        });
    }
    render() {
        const { courseId } = this.props;
        return (
            <div>
                {this.state.showAddSectionDialog || <button>Add New Section</button>}
                {this.state.showAddSectionDialog &&
                <div>
                    <input type="text" name="sectionName" placeholder="Section Name" onChange={this.handleInput}/>
                    <input type="text" name="startDate" placeholder="Start Date (optional)"/>
                    <input type="text" name="endDate" placeholder="End Date (optional)" />
                    <button>Save New Course</button>
                </div>

                }

            </div>
        )
    }
}
