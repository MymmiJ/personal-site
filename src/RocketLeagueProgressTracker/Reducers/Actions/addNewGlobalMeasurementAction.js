import { ADD_MEASUREMENT } from "../globalMeasurementsReducer";

export const addNewGlobalMeasurementAction = (newMeasurement) => ({
    type: ADD_MEASUREMENT,
    measurement: newMeasurement
});