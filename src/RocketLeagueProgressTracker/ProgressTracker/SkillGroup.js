import { Button, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { NewPeopleModal } from "../Modals/AddItemModals/NewPeopleModal";
import { NewSkillGroupModal } from "../Modals/AddItemModals/NewSkillGroupModal";
import { NewSkillModal } from "../Modals/AddItemModals/NewSkillModal";
import { addNewSkillAction } from "../Reducers/Actions/SkillGroupsActions/addNewSkillAction";
import { insertNewSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/insertNewSkillGroupAction";
import { removeSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/removeSkillGroupAction";
import { switchPersonAction } from "../Reducers/Actions/SkillGroupsActions/switchPersonAction";
import { updatePeopleAction } from "../Reducers/Actions/SkillGroupsActions/updatePeopleAction";
import { Skill } from "./Skill";
import { getColorFromSpectrumPosition } from "./Utilities/getColorFromSpectrumPosition";

// Number at which point we wrap to the start of the rainbow again
const SPECTRUM_BREADTH = 10;

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
    return <BottomBorderTableBody style={{ backgroundColor: `rgba(${red},${green},${blue},0.04)` }} ref={tableBodyRef}>
        <TableRow>
            <TableCell><strong>Person -</strong></TableCell>
            <TableCell colSpan="2">
                <strong>{activePerson.name}</strong>
                {
                    people.filter(person => activePerson.name !== person.name).map((person, i) =>
                        <Button key={i} onClick={() => dispatch(switchPersonAction(person, index))}><em>{person.name}</em></Button>)
                }
            </TableCell>

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
        {skills.map((skill, i) => <Skill key={i} {...skill} activePerson={activePerson} index={i} skillGroupIndex={index} />)}
        <TableRow>
            <TableCell colSpan="2"><Button onClick={() => setShowNewSkillModal(true)}>Add New Skill</Button></TableCell>
            <TableCell><Button onClick={() => setShowNewSkillGroupModal(true)}>Insert New Skill Group Below</Button></TableCell>
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