import { Button, Modal, Paper } from "@material-ui/core";
import { useState } from "react";
import { skillGroupMaker } from "../../Factories/skillGroupMaker";
import { SkillGroupForm } from "../../Forms/SkillGroupForm";
import { addNewSkillGroupAction } from "../../Reducers/Actions/addNewSkillGroupAction";

export const NewSkillGroupModal = ({ dispatch, showModal, anchorEl }) => {
    const [skillGroupToCreate, setSkillGroupToCreate] = useState(skillGroupMaker());
    const addNewSkillGroup = () => {
        dispatch(addNewSkillGroupAction(skillGroupToCreate));
        setSkillGroupToCreate(skillGroupMaker());
    }
    return <Modal
            open={showModal}
            onClose={() => dispatch()}
            sx={{
                minWidth: 200,
                p: 12
            }}
        >
            <Paper>

                <SkillGroupForm skillGroup={skillGroupToCreate} updateSkillGroup={setSkillGroupToCreate} />
                <Button onClick={addNewSkillGroup}>Add New Skill Group</Button>
            </Paper>
        </Modal>;
};
