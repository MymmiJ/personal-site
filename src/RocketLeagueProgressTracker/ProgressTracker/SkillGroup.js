import { Button, FormHelperText, Input, TableBody, TableCell, TableRow } from "@material-ui/core";
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
import { renameSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/renameSkillGroupAction";
import { NewFundamentalsModal } from "../Modals/AddItemModals/NewFundamentalsModal";
import { replaceSkillGroupFundamentalsAction } from "../Reducers/Actions/SkillGroupsActions/replaceSkillGroupFundamentalsAction";
import { replacePeopleAction } from "../Reducers/Actions/SkillGroupsActions/replacePeopleAction";
import { SkillGroupDetail } from "./DetailDisplays/SkillGroupDetail";

// Number at which point we wrap to the start of the rainbow again
const SPECTRUM_BREADTH = 10;

const BottomBorderTableBody = styled(TableBody)`
    border-bottom: solid 4px;
`;

export const SkillGroup = ({ skills, people, activePerson, name='', fundamentals = [], index }) => {
    const [,dispatch] = useContext(SkillGroupsContext);

    const [showSkills, setShowSkills] = useState(true);
    const [showNewSkillGroupModal, setShowNewSkillGroupModal] = useState(false);
    const [showNewSkillModal, setShowNewSkillModal] = useState(false);
    const [showNewPeopleModal, setShowNewPeopleModal] = useState(false);
    const [showNewFundamentalsModal, setShowNewFundamentalsModal] = useState(false);
    const [showSkillGroupDetails, setShowSkillGroupDetails] = useState(false);
    
    const spectrumPosition = index % SPECTRUM_BREADTH;

    const { red, green, blue } = getColorFromSpectrumPosition(spectrumPosition/SPECTRUM_BREADTH);

    const tableBodyRef = useRef(null);
    return <BottomBorderTableBody style={{ backgroundColor: `rgba(${red},${green},${blue},0.04)` }} ref={tableBodyRef}>
        <TableRow>
            <TableCell>
                <Input onChange={({ target: { value } }) => dispatch(renameSkillGroupAction(index, value))} type="text" value={name} />
                <FormHelperText>Skill group name</FormHelperText>
            </TableCell>
            <TableCell colSpan="2">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    { activePerson.name && <><strong>Selected Person: </strong>
                        <Button variant="contained">{activePerson.name}</Button></> }
                    {
                        people.filter(person => activePerson.name !== person.name).map((person, i) =>
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                            <Button variant="outlined" onClick={() => dispatch(switchPersonAction(person, index))}><em>{person.name}</em></Button>
                            <Button style={{ maxHeight: '20px' }} variant="text" key={`remove-${i}`} onClick={() => dispatch(replacePeopleAction(people.filter(
                                existingPerson => existingPerson.name !== person.name
                            ), index))}>Remove</Button>
                        </div>)
                    }
                    <Button onClick={() => setShowNewPeopleModal(true)}>+</Button>
                </div>
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
            </TableCell>
            <TableCell>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <small>
                        Fundamentals:&nbsp;
                        {fundamentals.join(', ').replace(/, $/, '')}
                    </small>
                    <Button onClick={() => setShowNewFundamentalsModal(true)}>+</Button>
                    <NewFundamentalsModal
                        dispatch={(newFundamentals) => dispatch(replaceSkillGroupFundamentalsAction(index, [...fundamentals, ...newFundamentals]))}
                        existingFundamentals={fundamentals}
                        closeModal={() => setShowNewFundamentalsModal(false)}
                        showModal={showNewFundamentalsModal}/>
                </div>
            </TableCell>
            <TableCell>
                <Button onClick={() => setShowSkills(!showSkills)}>{showSkills ? 'Hide' : 'Show'} Skills</Button>
            </TableCell>
        </TableRow>
        { showSkills ? skills.map((skill, i) => <Skill key={i} {...skill} activePerson={activePerson} index={i} skillGroupIndex={index} />) : null}
        <TableRow>
            <TableCell colSpan="2"><Button onClick={() => setShowNewSkillModal(true)}>Add New Skill</Button></TableCell>
            <TableCell><Button onClick={() => setShowSkillGroupDetails(!showSkillGroupDetails)}>{`${showSkillGroupDetails ? 'Hide' : 'Show' } Skill Group Charts`}</Button></TableCell>
            <TableCell><Button onClick={() => setShowNewSkillGroupModal(true)}>Insert New Skill Group Below</Button></TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillGroupAction(index))}>{`Remove ${ name.length > 0 ? name : `Skill Group ${index + 1}`}`}</Button></TableCell>
        </TableRow>
        {
            showSkillGroupDetails ?
            <SkillGroupDetail
                title={name}
                skillGroupIndex={index}
                activePersonName={activePerson.name}
                skills={skills}
            /> :
            null
        }
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