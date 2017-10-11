import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {getStudentData} from './actions';

class Courses extends React.Component {

    render() {
        const {data} = this.props;

        if(!data) {
            return null;
        }


        return (
            const courseList = (
                <div className="menu-courses">
                    {props.courses.map(course => (
                        <li className="menu-course-list">
                        {course.name}
                        </li>
                        )
                    )}
                </div>
            );
        )
}
