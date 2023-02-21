import { measurementMaker, measurementsMaker } from "./measurementsMaker";
import { tooltipMaker } from "./tooltipMaker";

export const skillMaker = ( name, measurements = measurementsMaker(measurementMaker(), []), tooltip = tooltipMaker(), degree = 0 ) => ({
    name,
    degree,
    measurements,
    tooltip,
});
