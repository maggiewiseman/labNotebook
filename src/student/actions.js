import axios from '../api/axios';


//***************getStudentData****************//

export function getStudentData() {
    return axios.get('/api/student/data').then((result) => {

        return {
            type: 'GET_STUDENT_DATA',
            data: result.data.studentData
        }
    })
}
