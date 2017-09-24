//This will have 2 sections
//A make a new course section
//A list of current courses and sections

import React from 'react';

export default class TeacherCourses extends React.Component {
    render() {
        return (
            <div>
                <header>
                    Make a new course
                </header>
                <input type="text" placeholder="Name of course" />
                <button type="submit">Save new course</button>
            </div>
        );
    }
}
