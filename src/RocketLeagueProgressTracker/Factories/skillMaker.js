import { measurementMaker, measurementsMaker } from "./measurementsMaker";
import { tooltipMaker } from "./tooltipMaker";

/**
 * @param {string} name 
 * @param {Measurement[]} measurements 
 * @param {number} degree 
 * @param {string} tooltip 
 * @param {string[]} fundamentals 
 * @returns {Skill} object
 */

export const skillMaker = ( name, measurements = measurementsMaker(measurementMaker(), []), degree = '', tooltip = tooltipMaker(), fundamentals = [], ) => ({
    name,
    degree,
    measurements,
    fundamentals,
    tooltip,
    degreeHistory: {
        [measurements.name]: [degree],
    }
});
