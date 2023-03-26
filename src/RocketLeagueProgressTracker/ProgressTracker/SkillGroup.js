import { Button, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { GlobalPeopleContext } from "../ContextProviders/GlobalPeopleProvider";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { NewMeasurementsModal } from "../Modals/AddItemModals/NewMeasurementsModal";
import { NewPeopleModal } from "../Modals/AddItemModals/NewPeopleModal";
import { NewSkillGroupModal } from "../Modals/AddItemModals/NewSkillGroupModal";
import { NewSkillModal } from "../Modals/AddItemModals/NewSkillModal";
import { addNewGlobalPeopleAction } from "../Reducers/Actions/GlobalPersonActions/addNewGlobalPeopleAction";
import { addNewSkillAction } from "../Reducers/Actions/SkillGroupsActions/addNewSkillAction";
import { insertNewSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/insertNewSkillGroupAction";
import { removeSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/removeSkillGroupAction";
import { switchPersonAction } from "../Reducers/Actions/SkillGroupsActions/switchPersonAction";
import { updatePeopleAction } from "../Reducers/Actions/SkillGroupsActions/updatePeopleAction";
import { Skill } from "./Skill";

// Number at which point we wrap to the start of the rainbow again
const SPECTRUM_BREADTH = 10;
// Never want to change these values for generating rainbow colors
const SATURATION = 1;
const FULL_COLOR = 1;
const ZERO_COLOR = 0;

const getColorFromSpectrumPosition = (spectrumPosition) => {
    const spectrumSegment = Math.floor(spectrumPosition * 6);
    const spectrumSegmentPosition = spectrumPosition * 6 - spectrumSegment;

    const waningColor = FULL_COLOR * (1 - spectrumSegmentPosition);
    const waxingColor = FULL_COLOR * (1 - (1 - spectrumSegmentPosition) * SATURATION);
    let r, g, b;
    switch (spectrumSegment % 6) {
        case 0:
            r = FULL_COLOR;
            g = waxingColor;
            b = ZERO_COLOR;
            break;
        case 1:
            r = waningColor;
            g = FULL_COLOR;
            b = ZERO_COLOR;
            break;
        case 2:
            r = ZERO_COLOR;
            g = FULL_COLOR;
            b = waxingColor;
            break;
        case 3:
            r = ZERO_COLOR;
            g = waningColor;
            b = FULL_COLOR;
            break;
        case 4:
            r = waxingColor;
            g = ZERO_COLOR;
            b = FULL_COLOR;
            break;
        case 5:
            r = FULL_COLOR;
            g = ZERO_COLOR;
            b = waningColor;
            break;
        default:
            console.warn('Maths has been disproven');
            r = g = b = FULL_COLOR;
            break;
    }

    return {
        red: Math.round(r * 255),
        green: Math.round(g * 255),
        blue: Math.round(b * 255),
    };
}

const BottomBorderTableBody = styled(TableBody)`
    border-bottom: solid 4px;
`;

export const SkillGroup = ({ skills, people, activePerson, index }) => {
    const [,dispatch] = useContext(SkillGroupsContext);

    const [showNewSkillGroupModal, setShowNewSkillGroupModal] = useState(false);
    const [showNewSkillModal, setShowNewSkillModal] = useState(false);
    const [showNewPeopleModal, setShowNewPeopleModal] = useState(false);
    
    const spectrumPosition = index % SPECTRUM_BREADTH;

    const { red, green, blue } = getColorFromSpectrumPosition(spectrumPosition/SPECTRUM_BREADTH);
    
    const tableBodyRef = useRef(null);
    return <BottomBorderTableBody style={{ backgroundColor: `rgba(${red},${green},${blue},0.02)` }} ref={tableBodyRef}>
        <TableRow>
            <TableCell><strong>Person -</strong></TableCell>
            <TableCell><strong>{activePerson.name}</strong></TableCell>
            {people.filter(person => activePerson.name !== person.name).map((person, i) =>
                <TableCell key={i}><Button onClick={() => dispatch(switchPersonAction(person, index))}><em>{person.name}</em></Button></TableCell>)}
            <TableCell><Button onClick={() => setShowNewPeopleModal(true)}>Add New People</Button></TableCell>
            <NewPeopleModal
                dispatch={(newPeople) => {
                    if(newPeople) {
                        const validPeople = newPeople
                            .filter(person => !people.find(skillGroupPerson => skillGroupPerson.name === person.name))
                        dispatch(updatePeopleAction(validPeople, index));
                    }
                    setShowNewPeopleModal(false);
                }}
                showModal={showNewPeopleModal}
            />
        </TableRow>
        {skills.map((skill, i) => <Skill key={i} {...skill} index={i} skillGroupIndex={index} />)}
        <TableRow>
            <TableCell><Button onClick={() => setShowNewSkillModal(true)}>Add New Skill</Button></TableCell>
        </TableRow>
        <TableRow>
            <TableCell><Button onClick={() => setShowNewSkillGroupModal(true)}>Insert New Skill Group</Button></TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillGroupAction(index))}>{`Remove Skill Group ${index + 1}`}</Button></TableCell>
        </TableRow>
        <NewSkillModal
            dispatch={(payload) => {
                setShowNewSkillModal(false);
                if(payload) {
                    const action = addNewSkillAction(payload, index);
                    dispatch(action);
                }
            }}
            showModal={showNewSkillModal}
            anchorEl={tableBodyRef?.current}
        />
        <NewSkillGroupModal
            dispatch={(payload) => {
                setShowNewSkillGroupModal(false);
                if(payload) {
                    const action = insertNewSkillGroupAction(payload, index + 1);
                    dispatch(action);
                }
            }}
            showModal={showNewSkillGroupModal}
            anchorEl={tableBodyRef?.current}
        />
    </BottomBorderTableBody>
}