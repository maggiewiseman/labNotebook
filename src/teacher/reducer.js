const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST',
    UPDATE_RECENT_ASSIGNMENTS = 'UPDATE_RECENT_ASSIGNMENTS',
    ADD_TEACHER_INFO = 'ADD_TEACHER_INFO',
    RECEIVE_STUDENT_ASSIGNMENT_LIST = 'RECEIVE_STUDENT_ASSIGNMENT_LIST',
    UPDATE_STUDENT_CATEGORY_DATA = 'UPDATE_STUDENT_CATEGORY_DATA',
    GET_COMMITS = 'GET_COMMITS',
    RECEIVE_ASSIGNMENT_PROPERTIES = 'RECEIVE_ASSIGNMENT_PROPERTIES',
    ERROR = 'ERROR';


export default function(state = {}, action) {
    console.log('REDUCER: the action is: ', action);

    if(action.type == RECEIVE_ASSIGNMENT_PROPERTIES) {
        state = Object.assign({}, state, {
            assignmentProperties: action.payload
        });
    }
    if(action.type == UPDATE_STUDENT_CATEGORY_DATA) {
        state = Object.assign({}, state, {
            studentCategoryData: action.payload
        });
    }

    if(action.type == RECEIVE_STUDENT_ASSIGNMENT_LIST) {
        console.log('REDUCER: addTeacherInfo');
        state = Object.assign({}, state, {
            studentAssignmentList: action.payload,
            currAssignmentId: action.currAssignmentId
        });
    }
    if(action.type == ADD_TEACHER_INFO) {
        console.log('REDUCER: addTeacherInfo');
        state = Object.assign({}, state, {
            teacherInfo: action.payload
        });
    }
    if(action.type == UPDATE_RECENT_ASSIGNMENTS) {
        console.log('REDUCER: getting assignment list');
        state = Object.assign({}, state, {
            latestAssignment: action.payload
        });
    }

    if(action.type == SAVE_SECTION_LIST) {
        console.log('REDUCER: saving section list');
        state = Object.assign({}, state, {
            sections: action.payload
        });
    }

    if(action.type == SAVE_COURSE_LIST) {
        console.log('REDUCER: saving course list');
        state = Object.assign({}, state, {
            courses: action.payload
        });
    }

    if(action.type == GET_COMMITS) {
        console.log('GET_COMMITS', action.assignment);
        state = Object.assign({}, state, {
            committedAssignment: action.assignment
        })
    }

    if(action.type == ERROR) {
        state = Object.assign({}, state, {
            error: action.payload
        });
    }



    console.log('STATE', state);
    return state;
}
