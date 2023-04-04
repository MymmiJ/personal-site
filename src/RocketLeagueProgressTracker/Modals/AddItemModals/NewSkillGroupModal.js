import { Button, Dialog, FormHelperText, Input } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { skillGroupMaker } from "../../Factories/skillGroupMaker";
import { SkillGroupForm } from "../../Forms/SkillGroupForm";

const SkillGroupFormContainer = styled.div`
    padding: 12px;
`

export const NewSkillGroupModal = ({ dispatch, showModal }) => {
    const [skillGroupToCreate, setSkillGroupToCreate] = useState(skillGroupMaker());
    const addNewSkillGroup = () => {
        dispatch(skillGroupToCreate);
        setSkillGroupToCreate(skillGroupMaker());
    }
    return <Dialog
            PaperProps={{ style: { width: '40%' } }}
            open={showModal}
            onClose={() => {
                setSkillGroupToCreate(skillGroupMaker());
                dispatch();
            }}
        >
        <SkillGroupFormContainer>
            <Input onChange={({ target: { value } }) => setSkillGroupToCreate({
                ...skillGroupToCreate,
                name: value,
            })} type="text" value={skillGroupToCreate.name} />
            <FormHelperText>Skill group name</FormHelperText>
            <SkillGroupForm skillGroup={skillGroupToCreate} updateSkillGroup={setSkillGroupToCreate} />
            <Button onClick={addNewSkillGroup}>Add New Skill Group</Button>
        </SkillGroupFormContainer>
    </Dialog>;
};
