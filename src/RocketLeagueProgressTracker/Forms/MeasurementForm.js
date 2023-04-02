import { FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";
import { ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS } from "../Factories/measurementsMaker";
import { MeasurementFormElement } from "./MeasurementFormComponents/MeasurementFormElement";

export const MeasurementForm = ({ measurement, updateMeasurement }) => {
    return measurement ? 
    <FormControl>
        <MeasurementFormElement
            {...{ measurement, updateMeasurement }}
            field="name"
            />
        <MeasurementFormElement
            {...{ measurement, updateMeasurement }}
            field="priority"
            />
        <Select
            labelId="measurement-display-select-label"
            id="measurement-display-select"
            value={measurement.display}
            label="Display Units"
            onChange={({ target: { value } }) => {
                updateMeasurement({
                    ...measurement,
                    display: value,
                })
            }}
        >
            {Object.entries(ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS).map(([key, value], index) =>
                <MenuItem value={value} key={index}>{key.toLocaleUpperCase()}</MenuItem>)}
        </Select>
        <FormHelperText>Select a display unit for the measurement</FormHelperText>
    </FormControl>: 
    null;
}