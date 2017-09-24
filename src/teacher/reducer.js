var SAVE_COURSE_LIST = 'SAVE_COURSE_LIST';


export default function(state = {}, action) {
    console.log('REDUCER: the action is: ', action);
    if(action.type == SAVE_COURSE_LIST) {
        console.log('REDUCER: saving new course');
        state = Object.assign({}, state, {
            courses: action.payload
        });
    }
    console.log(state);
    return state;
}
