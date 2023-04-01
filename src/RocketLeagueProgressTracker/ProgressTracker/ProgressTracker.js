import { Button, ButtonGroup, Card, Grid, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { useContext, useRef, useState } from "react";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { TableRefContext } from "../ContextProviders/TableRefContext";
import { NewSkillGroupModal } from "../Modals/AddItemModals/NewSkillGroupModal";
import { addNewSkillGroupAction } from "../Reducers/Actions/SkillGroupsActions/addNewSkillGroupAction";
import { SkillGroup } from "./SkillGroup";
import { SaveButton } from "./DataPersistence/Buttons/SaveButton";
import { ExportButton } from "./DataPersistence/Buttons/ExportButton";
import { LoadButton } from "./DataPersistence/Buttons/LoadButton";
import { GlobalMeasurementsContext } from "../ContextProviders/GlobalMeasurementsContextProvider";
import { GlobalPeopleContext } from "../ContextProviders/GlobalPeopleProvider";

export const ProgressTracker = () => {
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    const [globalMeasurements, dispatchGlobalMeasurements] = useContext(GlobalMeasurementsContext);
    const [globalPeople, dispatchGlobalPeople] = useContext(GlobalPeopleContext);
    const [showNewSkillGroupModal, setShowNewSkillGroupModal] = useState(false);
    const tableRef = useRef(null);
    return <>
        <Grid container direction="row-reverse">
            <ButtonGroup>
                <SaveButton data={{
                    skillGroups,
                    globalMeasurements,
                    globalPeople,
                }} />
                <ExportButton />
                <LoadButton />
            </ButtonGroup>
        </Grid>
        <Card ref={tableRef}> 
            <Table>
                <TableRefContext.Provider value={tableRef}>
                    {skillGroups?.map((skillGroup, i) => <SkillGroup key={i} {...skillGroup} index={i} />)}
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Button onClick={() => setShowNewSkillGroupModal(true)}>New Skill Group</Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </TableRefContext.Provider>
            </Table>
            <NewSkillGroupModal
                dispatch={(payload) => {
                    setShowNewSkillGroupModal(false);
                    if(payload) {
                        const action = addNewSkillGroupAction(payload);
                        dispatch(action);
                    }
                }}
                showModal={showNewSkillGroupModal}
                anchorEl={tableRef?.current}
            />
        </Card>
    </>;
}