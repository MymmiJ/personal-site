import { Button, Dialog } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { skillMaker } from "../../Factories/skillMaker";
import { SkillForm } from "../../Forms/SkillForm";

const SkillFormContainer = styled.div`
    padding: 8px;
`

export const NewSkillModal = ({ dispatch, showModal }) => {
    const [skillToCreate, setSkillToCreate] = useState(skillMaker());
    const addNewSkill = () => {
        dispatch(skillToCreate);
        setSkillToCreate(skillMaker());
    }
    return <Dialog
            PaperProps={{ style: { width: '36%' } }}
            open={showModal}
            onClose={() => {
                setSkillToCreate(skillMaker());
                dispatch();
            }}
        >
        <SkillFormContainer> 
            <SkillForm skill={skillToCreate} updateSkill={setSkillToCreate} />
            <Button onClick={addNewSkill}>Add New Skill</Button>
        </SkillFormContainer>
    </Dialog>;
};
