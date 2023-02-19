export const REMOVE_SKILL_GROUP = 'remove_skill_group';

export const skillGroupsReducer = (state, action) => {
    switch(action.type) {
        case REMOVE_SKILL_GROUP:
            return state.filter((_skillGroup, i) => i !== action.index);
        default:
            console.warn('Action type not defined', action);
            return state;
    }
};