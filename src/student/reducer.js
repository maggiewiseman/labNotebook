export default function(state = {}, action) {

    if(action.type === 'GET_STUDENT_DATA') {
        state = Object.assign({}, state, {
            studentInfo: action.studentInfo
        });

    }

    if(action.type === 'ADD_CLASS') {
        state = Object.assign({}, state, {
            courses: action.newClassList

        })
    }

    // if(action.type === 'GET_ASSIGNMENTS') {
    //     state = Object.assign({}, state,{
    //         assignments: action.assignments
    //     })
    // }

    console.log("state", state);
    return state;
}
