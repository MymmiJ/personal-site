import { Button, Typography } from "@material-ui/core"
import { useContext, useState } from "react";
import { GlobalMeasurementsContext } from "../ContextProviders/GlobalMeasurementsContextProvider";
import { measurementMaker } from "../Factories/measurementsMaker";
import { addNewGlobalMeasurementAction } from "../Reducers/Actions/addNewGlobalMeasurementAction";
import { MeasurementForm } from "./MeasurementForm"

const usefulFields = ['name','priority'];

export const MeasurementsForm = ({ measurements, updateMeasurements }) => {
    const [showAddingOptions, setShowAddingOptions] = useState(false);
    const toggleShowAddingOptions = () => setShowAddingOptions(!showAddingOptions);

    const [showAddingNewOption, setShowAddingNewOption] = useState(false);
    const toggleShowAddingNewOption = () => setShowAddingNewOption(!showAddingNewOption);

    const [newMeasurement, setNewMeasurement] = useState(measurementMaker());

    const [measurementFilterList, setMeasurementFilterList] = useState([]);

    const [globalMeasurements, dispatch] = useContext(GlobalMeasurementsContext);
    const addMeasurement = (measurement) => {
        const measurementHasAtLeastOneUsefulField = !!measurement && usefulFields.reduce((acc, currentField) => {
            return acc || !!measurement[currentField];
        }, false);
        if(measurementHasAtLeastOneUsefulField && !measurements.measurements.map(measurement => measurement.name).includes(measurement.name)) {
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
        { measurements.measurements.map((measurement, i) =>
            <Typography key={i}>{measurement.name} // Type: {measurement.display}</Typography>)}
        <div>
            <Button onClick={() => {
                toggleShowAddingOptions();
                setShowAddingNewOption(false);
            }}>Add Measurement</Button>
        </div>
        <div>
        {
            showAddingOptions &&
            <>
                {globalMeasurements.filter((measurement) => !measurementFilterList.includes(measurement.name)).map((measurement, i) =>
                <Typography key={i}>
                    <Button
                        onClick={() => {
                            addMeasurement(measurement);
                            setMeasurementFilterList([...measurementFilterList, measurement.name]);
                        }}
                        style={{
                            border: '2px solid',
                            margin: '8px'
                        }}
                    >
                        {measurement.name} <br />Type: {measurement.display}
                    </Button>
                </Typography>)}
                <Button onClick={() => toggleShowAddingNewOption()}>Add New Measurement</Button>
                <>
                {
                    showAddingNewOption &&
                    <>
                        <div>
                            <MeasurementForm
                                measurement={newMeasurement}
                                updateMeasurement={setNewMeasurement}
                            />
                        </div>
                        <div>
                            <Button
                                onClick={() => {
                                    addMeasurement(newMeasurement);
                                    dispatch(addNewGlobalMeasurementAction(newMeasurement));
                                    setShowAddingNewOption(false);
                                    setNewMeasurement(measurementMaker());
                                }}
                                style={{
                                    border: '2px solid',
                                    margin: '8px'
                                }}
                            >
                                {newMeasurement.name} <br />Type: {newMeasurement.display}
                            </Button>
                        </div>
                    </>
                }
                </>
            </>
        }
        </div>
    </div>
}