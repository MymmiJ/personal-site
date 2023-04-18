export const updateActivePersonSkillDegreeHistoryActionHandler = (action, state) => {
    const activePersonSkillGroupToUpdate = state[action.skillGroupIndex];
    const activePersonToUpdate = activePersonSkillGroupToUpdate.activePerson;
    const activePersonSkillToUpdate = activePersonSkillGroupToUpdate.skills[action.skillIndex];
    const activePersonDegreeHistoryToUpdate = activePersonSkillToUpdate.degreeHistory?.[action.measurementName];

    const newSkills = [
        ...activePersonSkillGroupToUpdate.skills.slice(0, action.skillIndex),
        {
            ...activePersonSkillToUpdate,
            degreeHistory: {
                ...activePersonSkillToUpdate.degreeHistory,
                [action.measurementName]: [
                    ...activePersonDegreeHistoryToUpdate.slice(0, action.degreeIndex),
                    {
                        degree: Number(action.newDegreeValue),
                        date: action.newDegreeDate,
                    },
                    ...activePersonDegreeHistoryToUpdate.slice(action.degreeIndex+1),
                ].sort((a, b) => a.date - b.date),
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