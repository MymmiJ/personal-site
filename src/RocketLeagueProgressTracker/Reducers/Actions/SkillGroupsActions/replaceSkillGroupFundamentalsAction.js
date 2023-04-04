import { REPLACE_SKILL_GROUP_FUNDAMENTALS } from "../../skillGroupsReducer";

export const replaceSkillGroupFundamentalsAction = (index, fundamentals) => ({
    type: REPLACE_SKILL_GROUP_FUNDAMENTALS,
    index,
    fundamentals,
});