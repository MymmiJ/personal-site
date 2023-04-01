import { REPLACE_ALL_GLOBAL_MEASUREMENTS } from "../../globalMeasurementsReducer";

export const replaceAllGlobalMeasurementsAction = (newMeasurements) => ({
    type: REPLACE_ALL_GLOBAL_MEASUREMENTS,
    measurements: newMeasurements
});