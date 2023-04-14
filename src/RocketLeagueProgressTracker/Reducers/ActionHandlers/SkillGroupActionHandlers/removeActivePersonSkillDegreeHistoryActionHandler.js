export const removeActivePersonSkillDegreeHistoryActionHandler = (action, state) => {
    const activePersonSkillGroupToUpdate = state[action.skillGroupIndex];
    const activePersonToUpdate = activePersonSkillGroupToUpdate.activePerson;
    const activePersonSkillToUpdate = activePersonSkillGroupToUpdate.skills[action.skillIndex];
    const activePersonDegreeHistoryToRemoveFrom = activePersonSkillToUpdate.degreeHistory?.[action.measurementName];

    const newSkills = [
        ...activePersonSkillGroupToUpdate.skills.slice(0, action.skillIndex),
        {
            ...activePersonSkillToUpdate,
            degreeHistory: {
                ...activePersonSkillToUpdate.degreeHistory,
                [action.measurementName]: activePersonDegreeHistoryToRemoveFrom
                    .filter((_, i) => i !== action.degreeIndex)
                    .sort((a, b) => a.date - b.date),
            }
        },
        ...activePersonSkillGroupToUpdate.skills.slice(action.skillIndex+1),
    ];
    const updatedActivePerson = {
        ...activePersonToUpdate,
        skills: newSkills,
    };
    return [
        ...state.slice(0, action.skillGroupIndex),
        {
            ...activePersonSkillGroupToUpdate,
            skills: newSkills,
            activePerson: {
                ...updatedActivePerson,
            }
        },
        ...state.slice(action.skillGroupIndex+1),
    ];
}