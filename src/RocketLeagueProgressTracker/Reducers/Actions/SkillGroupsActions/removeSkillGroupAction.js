import { REMOVE_SKILL_GROUP } from "../../skillGroupsReducer";

export const removeSkillGroupAction = (index) => ({
    type: REMOVE_SKILL_GROUP,
    index,
});
