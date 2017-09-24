const SAVE_COURSE_LIST = 'SAVE_COURSE_LIST',
    SAVE_SECTION_LIST = 'SAVE_SECTION_LIST';


export default function(state = {}, action) {
    console.log('REDUCER: the action is: ', action);

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
    console.log(state);
    return state;
}
