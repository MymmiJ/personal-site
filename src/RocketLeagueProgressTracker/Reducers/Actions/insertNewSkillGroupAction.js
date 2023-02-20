import { INSERT_NEW_SKILL_GROUP } from "../skillGroupsReducer";

export const addNewSkillGroupAction = (newSkillGroup, index) => ({
    type: INSERT_NEW_SKILL_GROUP,
    newSkillGroup,
    index,
});