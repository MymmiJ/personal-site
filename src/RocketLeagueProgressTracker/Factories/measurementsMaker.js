export const ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS = {
    NUMBER: 'Number',
    TIME: 'Time',
    TEXT: 'Text',
};

export const measurementMaker = ( name="Level", priority=0, display=ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER, commensurableWith=[] ) => ({
    name,
    priority,
    display,
    commensurableWith,
});

export const measurementsMaker = (selectedMeasurement, measurements=[] ) => ({
    ...selectedMeasurement,
    maxPriority: Math.max(...[...measurements.map((m) => m.priority)]),
    measurements,
    selectMeasurement (measurementID) {
        let measurement;
        if(typeof measurementID === 'string' || measurementID instanceof String) {
            measurement = this.measurements.find((measurement) => measurement.name === measurementID);
        } else {
            // Assume index
            measurement = this.measurements[measurementID];
        }
        this.name = measurement.name;
        this.priority = measurement.priority;
        this.display = measurement.display;
        this.commensurableWith = measurement.commensurableWith;
        return this;
    }
});