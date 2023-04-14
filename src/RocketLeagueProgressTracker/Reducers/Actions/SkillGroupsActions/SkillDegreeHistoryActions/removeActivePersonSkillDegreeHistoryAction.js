import { REMOVE_ACTIVE_PERSON_SKILL_DEGREE_HISTORY } from "../../../skillGroupsReducer";

export const removeActivePersonSkillDegreeHistoryAction = (
    skillGroupIndex,
    skillIndex,
    measurementName,
    degreeIndex,
) => ({
    type: REMOVE_ACTIVE_PERSON_SKILL_DEGREE_HISTORY,
    skillGroupIndex,
    skillIndex,
    measurementName,
    degreeIndex,
});