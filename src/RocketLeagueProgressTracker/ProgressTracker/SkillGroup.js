import { Button, TableBody, TableCell, TableRow } from "@material-ui/core"
import { useContext, useRef, useState } from "react"
import styled from "styled-components"
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider"
import { NewSkillGroupModal } from "../Modals/AddItemModals/NewSkillGroupModal"
import { NewSkillModal } from "../Modals/AddItemModals/NewSkillModal"
import { addNewSkillAction } from "../Reducers/Actions/SkillGroupsActions/addNewSkillAction"
import { insertNewSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/insertNewSkillGroupAction"
import { removeSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/removeSkillGroupAction"
import { switchPersonAction } from "../Reducers/Actions/SkillGroupsActions/switchPersonAction"
import { Skill } from "./Skill"

const BottomBorderTableBody = styled(TableBody)`
    border-bottom: solid 4px;
`;

export const SkillGroup = ({ skills, people, activePerson, index }) => {
    const [,dispatch] = useContext(SkillGroupsContext);
    
    const [showNewSkillGroupModal, setShowNewSkillGroupModal] = useState(false);
    const [showNewSkillModal, setShowNewSkillModal] = useState(false);
    
    const tableBodyRef = useRef(null);
    return <BottomBorderTableBody ref={tableBodyRef}>
        <TableRow>
            <TableCell><strong>Person -</strong></TableCell>
            <TableCell><strong>{activePerson.name}</strong></TableCell>
            {people.filter(person => activePerson.name !== person.name).map((person, i) =>
                <TableCell key={i}><Button onClick={() => dispatch(switchPersonAction(person, index))}><em>{person.name}</em></Button></TableCell>)}
            <TableCell><Button>Add New Person</Button></TableCell>
        </TableRow>
        {skills.map((skill, i) => <Skill key={i} {...skill} index={i} skillGroupIndex={index} />)}
        <TableRow>
            <TableCell><Button onClick={() => setShowNewSkillModal(true)}>Add New Skill</Button></TableCell>
            <TableCell><Button>Add New Measurement</Button></TableCell>
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