import { UPDATE_ACTIVE_PERSON_SKILL_DEGREE_HISTORY } from "../../skillGroupsReducer";

export const updateActivePersonSkillDegreeHistory = (
    skillGroupIndex,
    skillIndex,
    measurementName,
    degreeIndex,
    newDegreeValue,
    newDegreeDate,
) => ({
    type: UPDATE_ACTIVE_PERSON_SKILL_DEGREE_HISTORY,
    skillGroupIndex,
    skillIndex,
    measurementName,
    degreeIndex,
    newDegreeValue,
    newDegreeDate,
});