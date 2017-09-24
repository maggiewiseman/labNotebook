import axios from '../api/axios';

var SAVE_COURSE_LIST = 'SAVE_COURSE_LIST';

export function getCourseList() {

}

export function saveNewCourse(name, desc) {
    console.log('ACTIONS: saveNewCourse');
    return axios.post('/api/teacher/course', {name, desc}).then((results) => {
        if(results.data.success){
            console.log('success adding new course');

            return axios.get('/api/teacher/courses');
        }
    }).then((results) => {
        console.log('Actions: back from getting courses');
        return {
            type: SAVE_COURSE_LIST,
            payload: results.data.courses
        };
    });

}
