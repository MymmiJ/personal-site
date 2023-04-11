import { Button, FormHelperText, Input, TableCell, TableRow, Tooltip } from "@material-ui/core";
import { useContext, useState } from "react";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { NewMeasurementsModal } from "../Modals/AddItemModals/NewMeasurementsModal";
import { removeSkillAction } from "../Reducers/Actions/SkillGroupsActions/removeSkillAction";
import { updateSkillAction } from "../Reducers/Actions/SkillGroupsActions/updateSkillAction";
import { Measurement } from "./Measurement";
import { SkillDetail } from "./SkillDetail";
import { NumberInput } from "./SkillInput/NumberInput";
import { ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS } from "../Factories/measurementsMaker";
import { TimeInput } from "./SkillInput/TimeInput";

export const getInputComponentFromMeasurements = (measurements) => {
    switch(measurements.display) {
        case ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER:
            return NumberInput;
        case ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.TIME:
            return TimeInput;
        default:
            return NumberInput;
    }
}

export const Skill = ({ name, degree, degreeHistory, measurements, tooltip, fundamentals, activePerson, index, skillGroupIndex }) => {
    const [, dispatch] = useContext(SkillGroupsContext);

    const [showDetails, setShowDetails] = useState(false);
    const [showNewMeasurementsModal, setShowNewMeasurementsModal] = useState(false);

    const InputComponent = getInputComponentFromMeasurements(measurements);

    const degreeHistoryMeasurement = degreeHistory?.[measurements.name];
    const degreeHistoryLatestValue = degreeHistoryMeasurement?.[degreeHistoryMeasurement?.length - 1];
    return <>
        <TableRow>
            <Tooltip {...tooltip}>
                <TableCell><Input
                    value={name}
                    onChange={({ target: { value } }) => dispatch(updateSkillAction('name', value, index, skillGroupIndex))}
                    />
                </TableCell>
            </Tooltip>
            <TableCell>
                <Measurement {...measurements} onSelect={(value) => {
                        dispatch(updateSkillAction(
                            'measurements',
                            measurements.selectMeasurement(value),
                            index,
                            skillGroupIndex,
                        ));
                        dispatch(updateSkillAction(
                            'degree',
                            degreeHistory[value]?.[degreeHistory[value]?.length - 1]?.degree ?? '',
                            index,
                            skillGroupIndex,
                        ));
                    }
                } />
                <Button onClick={() => setShowNewMeasurementsModal(true) }>+</Button>
                <NewMeasurementsModal showModal={showNewMeasurementsModal} dispatch={
                    (newMeasurements) => {
                        if(newMeasurements) {
                            const filteredNewMeasurements = newMeasurements.filter(measurement => !measurements.measurements.includes(measurement));
                            dispatch(updateSkillAction(
                                'measurements',
                                {
                                    ...measurements,
                                    measurements: [...measurements.measurements, ...filteredNewMeasurements]
                                },
                                index,
                                skillGroupIndex,
                            ));
                        }
                        setShowNewMeasurementsModal(false);
                    }
                } />
            </TableCell>
            <TableCell>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <InputComponent
                            degree={degree}
                            onChange={(value) => !isNaN(value) && dispatch(updateSkillAction('degree', Number(value), index, skillGroupIndex))}
                            onKeyUp={({ key }) => key === 'Enter' && dispatch(updateSkillAction('degreeHistory', {
                                ...degreeHistory,
                                [measurements.name]: [...(degreeHistory?.[measurements.name] ? degreeHistory[measurements.name] : []), {
                                    degree,
                                    date: Date.now(),
                                }],
                            }, index, skillGroupIndex))}
                        />
                        { degree !== degreeHistoryLatestValue?.degree ? <FormHelperText>Click 'Update Skill' or press the Enter key to add row</FormHelperText> : null }
                    </div>
                    <Button onClick={() => dispatch(updateSkillAction('degreeHistory', {
                        ...degreeHistory,
                        [measurements.name]: [...(degreeHistory?.[measurements.name] ? degreeHistory[measurements.name] : []), {
                            degree,
                            date: Date.now(),
                        }],
                    }, index, skillGroupIndex))}>Update Skill</Button>
                </div>
                <Button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'Show'} Details</Button>
            </TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillAction(skillGroupIndex, index))}>Remove Skill</Button></TableCell>
        </TableRow>
        { showDetails && <SkillDetail
            title={name}
            skillIndex={index}
            skillGroupIndex={skillGroupIndex}
            skillDegreeHistory={degreeHistory}
            activePersonName={activePerson.name}
        /> }
    </>;
};