export const UPDATE_PEOPLE = 'update_people';
export const REPLACE_PEOPLE = 'replace_people';
export const UPDATE_ACTIVE_PERSON_SKILL_DEGREE_HISTORY = 'update_active_person_skill_degree_history';
export const UPDATE_PERSON_SKILL_DEGREE_HISTORY = 'update_person_skill_degree_history';
export const SWITCH_PERSON = 'switch_person';
export const UPDATE_SKILL = 'update_skill';
export const ADD_NEW_SKILL = 'add_new_skill';
export const REMOVE_SKILL = 'remove_skill';
export const REMOVE_SKILL_GROUP = 'remove_skill_group';
export const ADD_NEW_SKILL_GROUP = 'add_new_skill_group';
export const INSERT_NEW_SKILL_GROUP = 'insert_new_skill_group';
export const REPLACE_ALL_SKILL_GROUPS = 'replace_all_skill_groups';

export const skillGroupsReducer = (state, action) => {
    switch(action?.type) {
        case UPDATE_ACTIVE_PERSON_SKILL_DEGREE_HISTORY:
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
                                degree: action.newDegreeValue,
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
        case REPLACE_PEOPLE:
            return [
                ...state.slice(0, action.skillGroupIndex),
                {
                    ...state[action.skillGroupIndex],
                    people: action.people,
                },
                ...state.slice(action.skillGroupIndex+1),
            ];
        case UPDATE_PEOPLE:
            const nextSkillGroup = state[action.skillGroupIndex];
            return [
                ...state.slice(0, action.skillGroupIndex),
                {
                    ...nextSkillGroup,
                    people: [...nextSkillGroup.people, ...action.people],
                },
                ...state.slice(action.skillGroupIndex+1),
            ];
        case SWITCH_PERSON:
            const skillGroup = state[action.skillGroupIndex];
            const currentlyActivePerson = skillGroup.activePerson;
            currentlyActivePerson.skills = skillGroup.skills.map(skill => ({ ...skill }));
            
            const activePersonIndex = skillGroup.people.findIndex(person => person.name === currentlyActivePerson.name);
            return [
                ...state.slice(0, action.skillGroupIndex),
                {
                    skills: action.person.skills ?? skillGroup.skills.map(skill => ({ ...skill, degree: 0, degreeHistory: {} })),
                    people: [...skillGroup.people.slice(0, activePersonIndex), currentlyActivePerson, ...skillGroup.people.slice(activePersonIndex+1)],
                    activePerson: action.person,
                },
                ...state.slice(action.skillGroupIndex+1),
            ];
        case UPDATE_SKILL:
            const skills = state[action.skillGroupIndex].skills;
            const updatedSkill = skills[action.index];
            updatedSkill[action.field] = action.value;
            return [
                ...state.slice(0, action.skillGroupIndex),
                {
                    ...state[action.skillGroupIndex],
                    skills: [...skills.slice(0, action.index), updatedSkill, ...skills.slice(action.index + 1)],
                },
                ...state.slice(action.skillGroupIndex+1),
            ];
        case ADD_NEW_SKILL:
            return [
                ...state.slice(0, action.skillGroupIndex),
                {
                    ...state[action.skillGroupIndex],
                    skills: [...state[action.skillGroupIndex].skills, action.newSkill],
                },
                ...state.slice(action.skillGroupIndex+1),
            ];
        case REMOVE_SKILL:
            return [
                ...state.slice(0, action.skillGroupIndex),
                {
                    ...state[action.skillGroupIndex],
                    skills: state[action.skillGroupIndex].skills.filter((_skill, i) => i !== action.index),
                },
                ...state.slice(action.skillGroupIndex+1)
            ];
        case REMOVE_SKILL_GROUP:
            return state.filter((_skillGroup, i) => i !== action.index);
        case ADD_NEW_SKILL_GROUP:
            return [...state, action.newSkillGroup];
        case INSERT_NEW_SKILL_GROUP:
            return [...state.slice(0, action.index), action.newSkillGroup, ...state.slice(action.index)];
        case REPLACE_ALL_SKILL_GROUPS:
            return action.skillGroups;
        default:
            console.warn('Skill Group Action type not defined', action);
            return state;
    }
};