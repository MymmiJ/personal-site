/* eslint-disable react/jsx-no-comment-textnodes */
import { Button, Checkbox, Typography } from "@material-ui/core"
import { useContext, useState } from "react";
import { GlobalMeasurementsContext } from "../ContextProviders/GlobalMeasurementsContextProvider";
import { measurementMaker } from "../Factories/measurementsMaker";
import { addNewGlobalMeasurementAction } from "../Reducers/Actions/GlobalMeasurementActions/addNewGlobalMeasurementAction";
import { MeasurementForm } from "./MeasurementForm"

const usefulFields = ['name','priority'];

export const MeasurementsForm = ({ measurements, updateMeasurements, alwaysShowAddingOptions = false }) => {
    const [showAddingOptions, setShowAddingOptions] = useState(alwaysShowAddingOptions);
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

    const filteredGlobalMeasurements = globalMeasurements.filter((measurement) => !measurementFilterList.includes(measurement.name));

    return <div style={{
        borderTop: 'solid 4px',
        marginTop: '8px',
        borderBottom: 'solid 4px',
        marginBottom: '8px',
    }}>
        <Typography>Measurements:</Typography>
        { measurements.measurements.map((measurement, i) =>
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <Typography key={`typography-${i}`}>{measurement.name} // Type: {measurement.display}</Typography>
                <Checkbox key={`checkbox-${i}`} onClick={() => updateMeasurements(measurements.selectMeasurement(measurement.name))} checked={measurement.name === measurements.name} />
            </div>)}
        { !alwaysShowAddingOptions && <div>
            <Button onClick={() => {
                toggleShowAddingOptions();
                setShowAddingNewOption(false);
            }}>Add Measurement</Button>
        </div> }
        <div>
        {
            showAddingOptions &&
            <>
                { filteredGlobalMeasurements.length > 0 ? <Typography>Select measurement types to add from the list below</Typography> : null }
                {filteredGlobalMeasurements.map((measurement, i) =>
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
                <Button onClick={() => toggleShowAddingNewOption()}>Add New Measurement Type</Button>
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
                                    setMeasurementFilterList([...measurementFilterList, newMeasurement.name]);
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