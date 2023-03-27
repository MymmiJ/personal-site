import { Button, Input, TableCell, TableRow, Tooltip } from "@material-ui/core";
import { useContext, useState } from "react";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { NewMeasurementsModal } from "../Modals/AddItemModals/NewMeasurementsModal";
import { removeSkillAction } from "../Reducers/Actions/SkillGroupsActions/removeSkillAction";
import { updateSkillAction } from "../Reducers/Actions/SkillGroupsActions/updateSkillAction";
import { Measurement } from "./Measurement";
import { SkillDetail } from "./SkillDetail";
import { getColorFromSpectrumPosition } from "./Utilities/getColorFromSpectrumPosition";

const SPECTRUM_BREADTH = 12;

export const Skill = ({ name, degree, degreeHistory, measurements, tooltip, fundamentals, activePerson, index, skillGroupIndex }) => {
    const [, dispatch] = useContext(SkillGroupsContext);

    const [showDetails, setShowDetails] = useState(false);
    const [showNewMeasurementsModal, setShowNewMeasurementsModal] = useState(false);

    const skillProgressions = Object.entries(degreeHistory).map(([key, value], i) => {
        const spectrumPosition = i % SPECTRUM_BREADTH;

        const { red, green, blue } = getColorFromSpectrumPosition(spectrumPosition/SPECTRUM_BREADTH);
        return ({
            label: `${activePerson.name} - ${key}`,
            data: value,
            fill: false,
            borderColor: `rgb(${red},${green},${blue})`,
            tension: 0.1,
        });
    });

    const timescales = Object.values(degreeHistory).map(degreeHistoryArray => degreeHistoryArray.map((_, i) => i + 1));

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
                {/* TODO: Show different display units/input based on selected measurement */}
                <Measurement {...measurements} onSelect={(value) => {
                        dispatch(updateSkillAction(
                            'measurements',
                            measurements.selectMeasurement(value),
                            index,
                            skillGroupIndex,
                        ));
                        dispatch(updateSkillAction(
                            'degree',
                            degreeHistory[value]?.[degreeHistory[value]?.length - 1] ?? '',
                            index,
                            skillGroupIndex,
                        ));
                    }
                } />
                <Button onClick={() => setShowNewMeasurementsModal(true) }>Add New Measurement</Button>
                <NewMeasurementsModal showModal={showNewMeasurementsModal} dispatch={
                    (newMeasurements) => {
                        if(newMeasurements) {
                            dispatch(updateSkillAction(
                                'measurements',
                                {
                                    ...measurements,
                                    measurements: [...measurements.measurements, ...newMeasurements]
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
                    <Input
                        style={{ maxWidth: '128px', marginRight: '4px', marginLeft: '4px' }}
                        value={degree}
                        onChange={({ target: { value } }) => !isNaN(value) && dispatch(updateSkillAction('degree', Number(value), index, skillGroupIndex))}
                        onKeyUp={({ key }) => key === 'Enter' && dispatch(updateSkillAction('degreeHistory', {
                            ...degreeHistory,
                            [measurements.name]: [...(degreeHistory?.[measurements.name] ? degreeHistory[measurements.name] : []), degree],
                        }, index, skillGroupIndex))}
                    />
                    <Button onClick={() => dispatch(updateSkillAction('degreeHistory', {
                        ...degreeHistory,
                        [measurements.name]: [...(degreeHistory?.[measurements.name] ? degreeHistory[measurements.name] : []), degree],
                    }, index, skillGroupIndex))}>Enter</Button>
                </div>
                <Button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'Hide' : 'Show'} Details</Button>
            </TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillAction(skillGroupIndex, index))}>Remove Skill</Button></TableCell>
        </TableRow>
        { showDetails && <SkillDetail
            title={name}
            skillIndex={index}
            skillGroupIndex={skillGroupIndex}
            skillProgressions={skillProgressions}
            timescales={timescales}
        /> }
    </>;
};