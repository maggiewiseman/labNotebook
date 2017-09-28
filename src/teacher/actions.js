import axios from '../api/axios';
import { browserHistory } from 'react-router';

const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST',
    UPDATE_RECENT_ASSIGNMENTS = 'UPDATE_RECENT_ASSIGNMENTS',
    ADD_TEACHER_INFO = 'ADD_TEACHER_INFO',
    RECEIVE_STUDENT_ASSIGNMENT_LIST = 'RECEIVE_STUDENT_ASSIGNMENT_LIST',
    UPDATE_STUDENT_CATEGORY_DATA = 'UPDATE_STUDENT_CATEGORY_DATA', GET_COMMITS = 'GET_COMMITS',
    RECEIVE_ASSIGNMENT_PROPERTIES = 'RECEIVE_ASSIGNMENT_PROPERTIES', COMMIT_GRADE = 'COMMIT_GRADE',
    ERROR = 'ERROR';

/************ PREPARING TO GRADE *************/
export function getCategoriesForGrading(assignmentId, category){
    return axios.get(`/api/t/category/${assignmentId}/${category}`).then(results => {
        console.log("Back from getting Category Data", results);
        if(results.data.success){
            return {
                type: UPDATE_STUDENT_CATEGORY_DATA,
                payload: results.data.categoryData
            };
        } else {
            console.log('ERROR getting categories');
        }
    }).catch(e => {
        return {
            type: 'ERROR',
            error: e
        };
    });
}

export function getAssignmentProperties(assignmentId) {
    console.log('ACTIONS: getAssignmentProperties', assignmentId);
    return axios.get('/api/teacher/assignment/properties/' + assignmentId).then(results =>{
        console.log('Back from getting Assignment Properties', results);
        return {
            type: RECEIVE_ASSIGNMENT_PROPERTIES,
            payload: results.data.assignmentProps
        };
    }).catch(e => {
        this.setState({
            error: e
        });
    });
}

/************ ASSIGNMENTS *************/
export function getStudentAssignmentList(assignmentId) {
    console.log('ACTIONS: in get student assignment list');

    return axios.get('/api/teacher/students/' + assignmentId).then(results => {
        console.log('Back from getting student assignment list', results);
        return {
            type: RECEIVE_STUDENT_ASSIGNMENT_LIST,
            payload: results.data.studentList,
            currAssignmentId: assignmentId
        };
    }).catch(e => {
        this.setState({
            error: e
        });
    });
}
export function saveNewAssignment(assignmentInfo) {
    console.log('ACTIONS: in save assignment', assignmentInfo);
    if(assignmentInfo) {
        return axios.post('/api/teacher/assignment', {assignmentInfo}).then((results) => {
            if(results.data.success) {
                browserHistory.push('/teacher/assignments')
                return {
                    type: UPDATE_RECENT_ASSIGNMENTS,
                    payload: results.data.assignmentId
                };
            }
        }).catch(e => {
            return {
                type: ERROR,
                payload: e
            };
        });
    }
}
/************ SECTIONS *************/
export function saveNewSection(courseId, name, start, end){
    if(name) {
        return axios.post('/api/teacher/section', {courseId, name, start, end}).then(() => {
            return getAllSections();
        });
    } else {
        return {
            type: ERROR,
            payload: "You must give a name for the section"
        };
    }
}
export function getAllSections() {
    return axios.get('/api/teacher/sections').then(results => {
        console.log('ACTIONS getAllSections', results);
        return {
            type: SAVE_SECTION_LIST,
            payload: results.data.sections
        };
    }).catch(e => {
        return {
            type: ERROR,
            payload: e
        };
    });
}

/******** COURSES **************/
export function getCourseList() {
    return axios.get('/api/teacher/courses').then((results) => {
        console.log('Actions: back from getting courses', results);
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

export function getTeacherInfo() {
    console.log('ACTIONS: getUserInfo');
    return axios.get('/api/teacher').then(results => {
        if(results.data.success) {
            console.log('got teacher info:', results);
            return {
                type: ADD_TEACHER_INFO,
                payload: results.data.teacherInfo
            }
        }
    })
}

export function getCommittedAssignments(id, reportid) {
    return axios.get(`/api/teacher/grading/assignment/${id}/student/${reportid}`).then((result) => {
        console.log('got assignment per student report');
        return {
            type: GET_COMMITS,
            assignment: result.data.assignment
        }
    })
}

export function saveGrading (id, reportid, grade) {
    return axios.post(`/api/teacher/grading/grade/${id}/student/${reportid}`, {id, reportid, grade}).then((result) => {
        console.log('saving grade');
        return {
            type: ADD_GRADING,
            assignment: result.data.assignment
        }
    })
}

export function commitGrade(id, reportid, commit) {
    return axios.post('/api/teacher/grading/commit-grade', {id, reportid, commit}).then((result) => {
        return {
            type: COMMIT_GRADE,
            payload: result.data.grade
        }

    })
}
