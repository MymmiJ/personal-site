import { RENAME_SKILL_GROUP } from "../../skillGroupsReducer";

export const renameSkillGroupAction = (index, newName) => ({
    type: RENAME_SKILL_GROUP,
    index,
    newName,
});