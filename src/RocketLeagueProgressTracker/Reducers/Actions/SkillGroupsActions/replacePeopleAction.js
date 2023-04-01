import { REPLACE_PEOPLE } from "../../skillGroupsReducer";

export const replacePeopleAction = (people, skillGroupIndex) => ({
    type: REPLACE_PEOPLE,
    people,
    skillGroupIndex
});