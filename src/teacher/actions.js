import axios from '../api/axios';

var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';

export function saveNewCourse(name, desc) {
    console.log('ACTIONS: saveNewCourse');
    return axios.post('/api/teacher/course', {name, desc}).then((results) => {
        if(results.data.success){
            console.log('success adding new course');
        }
        return axios.get('/api/teacher/courses/' + '1');
    }).then((results) => {
        console.log('Actions: back from getting courses');
        return {
            type: SAVE_NEW_COURSE,
            courseList: results.data.courses
        };
    });

}
