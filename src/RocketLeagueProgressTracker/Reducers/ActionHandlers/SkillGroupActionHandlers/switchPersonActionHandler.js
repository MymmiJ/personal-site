export const switchPersonActionHandler = (action, state) => {
    const skillGroup = state[action.skillGroupIndex];
    const currentlyActivePerson = skillGroup.activePerson;
    currentlyActivePerson.skills = skillGroup.skills.map(skill => ({ ...skill }));
    
    const activePersonIndex = skillGroup.people.findIndex(person => person.name === currentlyActivePerson.name);
    return [
        ...state.slice(0, action.skillGroupIndex),
        {
            ...skillGroup,
            skills: action.person.skills ?? skillGroup.skills.map(skill => ({ ...skill, degree: 0, degreeHistory: {} })),
            people: [...skillGroup.people.slice(0, activePersonIndex), currentlyActivePerson, ...skillGroup.people.slice(activePersonIndex+1)],
            activePerson: action.person,
        },
        ...state.slice(action.skillGroupIndex+1),
    ];
}