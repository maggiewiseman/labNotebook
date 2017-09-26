import axios from '../api/axios';


//***************getStudentData****************//

export function getStudentData() {
    return axios.get('/api/student/data').then((result) => {
        return {
            type: 'GET_STUDENT_DATA',
            studentInfo: result.data.studentInfo
        }
    })
}

//******************addCourse*****************//

export function addNewClass(classID) {
    return axios.post('/api/student/class', {
        classID
    }).then((result) => {

        return {
            type: 'ADD_CLASS',
            newClassList: result.data.courses
        }
    })
}

//******************getAssignment*****************//

export function getAssignment(id) {
    return axios.get('/api/student/assignment/' + id, {
    }).then((result) => {
        return {
            type:'GET_ASSIGNMENT',
            assignment: result.data.assignment
        }
    })

}
