import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { measurementMaker } from "../../Factories/measurementsMaker";

export const MeasurementFormElement = ({ measurement, updateMeasurement, field }) => {
    const safeMeasurement = measurement ?? measurementMaker();
    const elementId = `measurement-${field}-input`;
    const elementDescriptionId = `measurement-${field}-helper-text`;
    return <FormControl>
        <InputLabel htmlFor={elementId}><Label alt={field}/></InputLabel>
        <Input
            id={elementId}
            value={safeMeasurement[field] ?? ''}
            onChange={({ target: { value } }) => {
                if(value && value.length >= 1) {
                    return updateMeasurement({...safeMeasurement, [field]: value })
                }
                return updateMeasurement(null);
            }}
            aria-describedby={`measurement-${field}-helper-text`}
        />
        <FormHelperText id={elementDescriptionId}>Enter a {field} for the measurement</FormHelperText>
    </FormControl>;
}