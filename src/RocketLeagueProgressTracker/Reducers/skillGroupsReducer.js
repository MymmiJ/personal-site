export const SWITCH_PERSON = 'switch_person';
export const UPDATE_SKILL = 'update_skill';
export const ADD_NEW_SKILL = 'add_new_skill';
export const REMOVE_SKILL = 'remove_skill';
export const REMOVE_SKILL_GROUP = 'remove_skill_group';
export const ADD_NEW_SKILL_GROUP = 'add_new_skill_group';
export const INSERT_NEW_SKILL_GROUP = 'insert_new_skill_group';

export const skillGroupsReducer = (state, action) => {
    switch(action?.type) {
        case SWITCH_PERSON:
            return [
                ...state.slice(0, action.skillGroupIndex),
                {
                    ...state[action.skillGroupIndex],
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
        default:
            console.warn('Skill Group Action type not defined', action);
            return state;
    }
};