import { ADD_MEASUREMENTS } from "../../globalMeasurementsReducer";

export const addNewGlobalMeasurementsAction = (newMeasurements) => ({
    type: ADD_MEASUREMENTS,
    measurements: newMeasurements
});