import { UPDATE_PERSON_SKILL_DEGREE_HISTORY } from "../../../skillGroupsReducer";

export const updatePersonSkillDegreeHistory = (
    skillGroupIndex,
    personIndex,
    skillIndex,
    measurementName,
    degreeIndex,
    newDegreeValue,
) => ({
    type: UPDATE_PERSON_SKILL_DEGREE_HISTORY,
    skillGroupIndex,
    personIndex,
    skillIndex,
    measurementName,
    degreeIndex,
    newDegreeValue,
});