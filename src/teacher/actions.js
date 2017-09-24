import axios from '../api/axios';

const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST';

/************ SECTIONS *************/
export function saveNewSection(courseId, name, start, end){
    return axios.post('/api/teacher/section', {courseId, name, start, end}).then(() => {
        return getAllSections();
    });
}
export function getAllSections() {
    return axios.get('/api/teacher/sections').then(results => {
        return {
            type: SAVE_SECTION_LIST,
            payload: results.data.sections
        };
    }).catch(e => {
        console.log('error: ', e);
    });
}

/******** COURSES **************/
export function getCourseList() {
    return axios.get('/api/teacher/courses').then((results) => {
        console.log('Actions: back from getting courses');
        return {
            type: SAVE_COURSE_LIST,
            payload: results.data.courses
        };
    });
}

export function saveNewCourse(name, desc) {
    console.log('ACTIONS: saveNewCourse');
    return axios.post('/api/teacher/course', {name, desc}).then((results) => {
        if(results.data.success){
            console.log('success adding new course');
            return getCourseList();
        }
    });

}
