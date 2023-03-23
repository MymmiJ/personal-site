import { UPDATE_SKILL } from "../skillGroupsReducer";

export const updateSkillAction = (field, value, index, skillGroupIndex) => ({
    type: UPDATE_SKILL,
    field,
    value,
    index,
    skillGroupIndex
});