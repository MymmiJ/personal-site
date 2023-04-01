import { REPLACE_ALL_GLOBAL_PEOPLE } from "../../globalPeopleReducer";

export const replaceAllGlobalPeopleAction = (newPeople) => ({
    type: REPLACE_ALL_GLOBAL_PEOPLE,
    people: newPeople
});