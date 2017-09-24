import axios from '../api/axios';

var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';

export function saveNewCourse(name, desc) {
    return axios.post('/api/teacher/course', {name, desc}).then((results) => {
        console.log('Actions: back from creating new course');
        return {
            type: SAVE_NEW_COURSE,
            courseList: results.data.courses
        };
    });

}
