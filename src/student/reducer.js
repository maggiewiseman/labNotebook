export default function(state = {}, action) {

    if(action.type === 'GET_STUDENT_DATA') {
        console.log('reducer get student data', action.data)
        state = Object.assign({}, state, {
            data: action.data
        });

    }

    console.log("state", state);
    return state;
}
