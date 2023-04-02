export const ADD_PEOPLE = 'add_people';
export const ADD_PERSON = 'add_person';
export const REPLACE_ALL_GLOBAL_PEOPLE = 'replace_all_global_people';

export const globalPeopleReducer = (state, action) => {
    switch(action.type) {
        case ADD_PEOPLE:
            return [...state, ...action.people];
        case ADD_PERSON:
            return [...state, action.person];
        case REPLACE_ALL_GLOBAL_PEOPLE:
            return action.people;
        default:
            console.warn('People Action type not defined', action);
            return state;
    }
}