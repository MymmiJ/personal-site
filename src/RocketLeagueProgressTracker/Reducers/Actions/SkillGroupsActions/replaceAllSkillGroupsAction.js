import { REPLACE_ALL_SKILL_GROUPS } from "../../skillGroupsReducer";

export const replaceAllSkillGroupsAction = (skillGroups) => ({
    type: REPLACE_ALL_SKILL_GROUPS,
    skillGroups,
});