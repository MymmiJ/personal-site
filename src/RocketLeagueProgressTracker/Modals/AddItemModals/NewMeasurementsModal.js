import { Button, Dialog } from "@material-ui/core";
import { useContext, useState } from "react";
import styled from "styled-components";
import { GlobalMeasurementsContext } from "../../ContextProviders/GlobalMeasurementsContextProvider";
import { measurementMaker, measurementsMaker } from "../../Factories/measurementsMaker";
import { MeasurementsForm } from "../../Forms/MeasurementsForm";
import { addNewGlobalMeasurementsAction } from "../../Reducers/Actions/GlobalMeasurementActions/addNewGlobalMeasurementsAction";

const MeasurementsFormContainer = styled.div`
    padding: 12px;
`;

const DEFAULT_MEASUREMENTS_OBJECT = measurementsMaker(measurementMaker(""));

export const NewMeasurementsModal = ({ dispatch, showModal }) => {
    const [measurementsToCreate, setMeasurementsToCreate] = useState(DEFAULT_MEASUREMENTS_OBJECT);
    const [globalMeasurements,dispatchGlobalMeasurements] = useContext(GlobalMeasurementsContext);

    const resetMeasurements = () => setMeasurementsToCreate(DEFAULT_MEASUREMENTS_OBJECT);

    const addNewMeasurements = () => {
        const validMeasurements = measurementsToCreate.measurements.filter(measurement => !!measurement.name);
        const filteredMeasurements = validMeasurements
            .filter(measurement => !globalMeasurements.find(globalMeasurement => globalMeasurement.name === measurement.name));
        dispatchGlobalMeasurements(addNewGlobalMeasurementsAction(filteredMeasurements));

        dispatch(validMeasurements);
        resetMeasurements();
    }

    return <Dialog
            PaperProps={{ style: { maxWidth: '420px' } }}
            open={showModal}
            onClose={() => {
                resetMeasurements();
                dispatch();
            }}
        >
        <MeasurementsFormContainer>
            <MeasurementsForm measurements={measurementsToCreate} updateMeasurements={setMeasurementsToCreate} alwaysShowAddingOptions={true} />
            <Button onClick={addNewMeasurements}>Add Measurement Types</Button>
        </MeasurementsFormContainer>
    </Dialog>;
};