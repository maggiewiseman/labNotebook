import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Lab extends React.Component {
    consructor(props) {
        super(props);
        this.state = {
            question: true;
            variables: true;
            hypothesis: true;
        };
    }
    render() {
        return (
            <div>
            {this.state.question && <Question question={'Find the relationship between pressure and volume.'}/>}
            {this.state.variables && <Variables />}
            {this.state.hypothesis} && <Hypothesis />}
            </div>
        );
    }
}

export const Question = LabSectionWrapper(QuestionForm, '/question');
export const Variables = LabSectionWrapper(VariablesForm, '/variables');

function LabSectionWrapper(Component, url) {
    return class LabSection extends React.Component {
        constructor(props) {
            super(props);
            this.state();
        }
        handleUupdate(e) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        save(e) {
            //write axios call and handle error/success
        }
        render() {
            return (
                <Component handleInput={this.handleInput}
                    save={this.save}
                    error={this.state.error}
                />
            )
        }
    }
}

function QuestionForm({handleInput, save, error}) {
    return (
        {error && <div className="error">error</div>}
        <textarea>
        Type your queston here.
        </textarea>
    )
}

function Variables({handleInput, save, error}) {
    return {
        {error && <div className="error">error</div>}
        <label for="iv">Independent Variable</label><input name="iv" type="text" placeholder="" onChange={handleInput}>
        <label for="dv">Dependent Variable</label><input name="dv" type="text" placeholder="" onChange={handleInput}>
        <label for="controls">Control Variables</label><input name="controls" type="textarea" placeholder="" onChange={handleInput}>
        <button type="submit" onClick={save}>Save</submit>
    }
}
