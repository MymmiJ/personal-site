import { ADD_NEW_SKILL } from "../../skillGroupsReducer";

export const addNewSkillAction = (newSkill, skillGroupIndex) => ({
    type: ADD_NEW_SKILL,
    newSkill,
    skillGroupIndex
});