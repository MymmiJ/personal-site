export const ADD_PERSON = 'add_person';

export const globalPeopleReducer = (state, action) => {
    switch(action.type) {
        case ADD_PERSON:
            return [...state, action.person];
        default:
            console.warn('People Action type not defined', action);
            return state;
    }
}