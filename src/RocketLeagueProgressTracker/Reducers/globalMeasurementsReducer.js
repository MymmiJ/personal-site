export const ADD_MEASUREMENT = 'add_measurement';
export const ADD_MEASUREMENTS = 'add_measurements';
export const REPLACE_ALL_GLOBAL_MEASUREMENTS = 'replace_all_global_measurements';

export const globalMeasurementsReducer = (state, action) => {
    switch(action.type) {
        case ADD_MEASUREMENTS:
            return [...state, ...action.measurements];
        case ADD_MEASUREMENT:
            return [...state, action.measurement];
        case REPLACE_ALL_GLOBAL_MEASUREMENTS:
            return action.measurements;
        default:
            console.warn('Measurement Action type not defined', action);
            return state;
    }
}