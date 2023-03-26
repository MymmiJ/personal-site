import { UPDATE_PEOPLE } from "../../skillGroupsReducer";

export const updatePeopleAction = (people, skillGroupIndex) => ({
    type: UPDATE_PEOPLE,
    people,
    skillGroupIndex
});