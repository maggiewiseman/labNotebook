var SAVE_NEW_COURSE = 'SAVE_NEW_COURSE';


export default function(state = {}, action) {

    if(action.type == SAVE_NEW_COURSE) {
        console.log('REDUCER: saving new course');
        Object.assign({}, state, {
            courseList: action.courseList
        });
    }
    return state;
}
