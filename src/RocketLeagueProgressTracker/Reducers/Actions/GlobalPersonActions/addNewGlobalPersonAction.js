import { ADD_PERSON } from "../../globalPeopleReducer";

export const addNewGlobalPersonAction = (newPerson) => ({
    type: ADD_PERSON,
    person: newPerson
});