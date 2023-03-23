import { REMOVE_SKILL } from "../skillGroupsReducer";

export const removeSkillAction = (skillGroupIndex, index) => ({
    type: REMOVE_SKILL,
    skillGroupIndex,
    index,
});
