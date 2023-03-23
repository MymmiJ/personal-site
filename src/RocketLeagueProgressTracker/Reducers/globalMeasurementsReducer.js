export const ADD_MEASUREMENT = 'add_measurement';

export const globalMeasurementsReducer = (state, action) => {
    switch(action.type) {
        case ADD_MEASUREMENT:
            return [...state, action.measurement];
        default:
            console.warn('Measurement Action type not defined', action);
            return state;
    }
}