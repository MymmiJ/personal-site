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
import { replaceAllSkillGroupsAction } from "../Reducers/Actions/SkillGroupsActions/replaceAllSkillGroupsAction";
import { replaceAllGlobalMeasurementsAction } from "../Reducers/Actions/GlobalMeasurementActions/replaceAllGlobalMeasurementsAction";
import { replaceAllGlobalPeopleAction } from "../Reducers/Actions/GlobalPersonActions/replaceAllGlobalPeopleAction";

// TODO: Remove people from a skill group
export const ProgressTracker = () => {
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    const [globalMeasurements, dispatchGlobalMeasurements] = useContext(GlobalMeasurementsContext);
    const [globalPeople, dispatchGlobalPeople] = useContext(GlobalPeopleContext);
    const [showNewSkillGroupModal, setShowNewSkillGroupModal] = useState(false);
    const tableRef = useRef(null);
    const serializableData = {
        skillGroups,
        globalMeasurements,
        globalPeople,
    };

    const loadData = (data) => {
        dispatch(replaceAllSkillGroupsAction(data.skillGroups));
        dispatchGlobalMeasurements(replaceAllGlobalMeasurementsAction(data.globalMeasurements));
        dispatchGlobalPeople(replaceAllGlobalPeopleAction(data.globalPeople));
    };

    const importableData = (new URL(window.location)).searchParams.get('import-data');
    if(importableData) {
        try {
            const fromB64 = decodeURIComponent(atob(importableData));
            const deserializedData = JSON.parse(fromB64);
            loadData(deserializedData);
        } catch(e) {
            console.error(e);
        } finally {
            const href = window.location.href;
            const newUrl = href.split('?')[0];
            window.history.pushState({}, null, newUrl);
        }
    }

    return <>
        <Grid container direction="row-reverse">
            <ButtonGroup>
                <SaveButton data={serializableData} />
                <ExportButton data={serializableData} />
                <LoadButton
                    loadFunction={loadData}
                />
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