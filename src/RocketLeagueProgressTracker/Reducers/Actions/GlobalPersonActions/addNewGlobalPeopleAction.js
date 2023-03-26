import { ADD_PEOPLE } from "../../globalPeopleReducer";

export const addNewGlobalPeopleAction = (newPeople) => ({
    type: ADD_PEOPLE,
    people: newPeople
});