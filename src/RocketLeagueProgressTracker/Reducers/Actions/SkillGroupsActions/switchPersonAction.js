import { SWITCH_PERSON } from "../../skillGroupsReducer";

export const switchPersonAction = (newPerson, skillGroupIndex) => ({
    type: SWITCH_PERSON,
    person: newPerson,
    skillGroupIndex
});