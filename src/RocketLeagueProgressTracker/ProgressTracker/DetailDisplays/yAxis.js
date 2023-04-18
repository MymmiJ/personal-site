import { ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS } from "../../Factories/measurementsMaker";

export const getYAxisFromMeasurementName = (measurements) => {
    switch(measurements.display) {
        case ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER:
            return 'y';
        case ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.TIME:
            return 'yTime';
        default:
            return 'y';
    }
}

export const getMeasurementTypeYAxisFromSkillGroup = (skillGroup, skillIndex, measurementName) => {
    const measurements =  skillGroup.skills[skillIndex].measurements.measurements;
    const measurement = measurements.find(measurement => measurement.name === measurementName) ?? {};
    return getYAxisFromMeasurementName(measurement);
};
