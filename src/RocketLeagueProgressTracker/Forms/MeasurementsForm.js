import { Button, Typography } from "@material-ui/core"
import { useContext, useState } from "react";
import { GlobalMeasurementsContext } from "../ContextProviders/GlobalMeasurementsContextProvider";
import { MeasurementForm } from "./MeasurementForm"

const usefulFields = ['name','priority'];

export const MeasurementsForm = ({ measurements, updateMeasurements }) => {
    const [showAddingOptions, setShowAddingOptions] = useState(false);
    const toggleShowAddingOptions = () => setShowAddingOptions(!showAddingOptions);

    // TODO: use global measurements context and add measurements to the options available
    const [globalMeasurements, dispatch] = useContext(GlobalMeasurementsContext);
    const addMeasurement = (i) => (measurement) => {
        const measurementHasAtLeastOneUsefulField = !!measurement && usefulFields.reduce((acc, currentField) => {
            return acc || !!measurement[currentField];
        }, false);
        if(measurementHasAtLeastOneUsefulField) {
            updateMeasurements({
                ...measurements,
                measurements: [...measurements.measurements, measurement]
            });
        }
    }

    return <div style={{
        borderTop: 'solid 4px',
        marginTop: '8px',
        borderBottom: 'solid 4px',
        marginBottom: '8px',
    }}>
        <Typography>Measurements:</Typography>
        {/* TODO: Have the default measurements appear here, then allow adding new measurements via. an 'Add Measurement' button that:
        reveals existing measurements in the global space and allows you to choose one
        reveals an 'Add New Measurement' button that, when selected, allows you to add a new measurement from a form and save with a 'Save Measurement' button */}
        { measurements.measurements.map((measurement, i) => <Typography key={i}>{measurement.name} // Type: {measurement.display}</Typography>)}
        <div>
            <Button onClick={() => toggleShowAddingOptions()}>Add New Measurement</Button>
            {/* on click, show menu of global measurements and allow selecting an option using the button, which on click is added to measurements
            and filtered from the global list using a locally stored list of already-selected-options */}

        </div>
        <div>
        {
            showAddingOptions &&
            <>
                {globalMeasurements.map((measurement, i) =>
                <Typography>
                    <Button
                        style={{
                            border: '2px solid',
                            margin: '8px'
                        }}
                    >
                        {measurement.name} <br />Type: {measurement.display}
                    </Button>
                </Typography>)}
            </>
        }
        </div>
    </div>
}