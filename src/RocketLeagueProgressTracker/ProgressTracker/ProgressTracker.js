import { Button, Card, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { NewSkillGroupModal } from "../Modals/AddItemModals/NewSkillGroupModal";
import { SkillGroup } from "./SkillGroup";

export const ProgressTracker = () => {
    // TODO: Create & store reusable items such as measurements, people and skills
    // TODO: SkillGroups to change colour along the spectrum as `i` increases
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    const [showNewSkillGroupModal, setShowNewSkillGroupModal] = useState(false);
    const tableRef = useRef(null);
    return <Card> 
        <Table ref={tableRef}>
            {skillGroups?.map((skillGroup, i) => <SkillGroup key={i} {...skillGroup} index={i} />)}
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Button onClick={() => setShowNewSkillGroupModal(true)}>New Skill Group</Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        <NewSkillGroupModal
            dispatch={(action) => {
                setShowNewSkillGroupModal(false)
                dispatch(action);
            }}
            showModal={showNewSkillGroupModal}
            anchorEl={tableRef?.current}
        />
    </Card>;
}