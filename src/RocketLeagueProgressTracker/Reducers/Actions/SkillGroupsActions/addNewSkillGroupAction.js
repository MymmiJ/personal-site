import { ADD_NEW_SKILL_GROUP } from "../../skillGroupsReducer";

export const addNewSkillGroupAction = (newSkillGroup) => ({
    type: ADD_NEW_SKILL_GROUP,
    newSkillGroup,
});