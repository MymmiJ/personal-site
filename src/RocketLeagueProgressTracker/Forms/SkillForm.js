import { Divider } from "@material-ui/core";
import { SkillFormElement } from "./SkillFormComponents/SkillFormElement";

export const SkillForm = ({ skill, updateSkill }) => {
    return skill ?
    <>
        <SkillFormElement
            {...{ skill, updateSkill }}
            field="name"
        />
        <SkillFormElement
            {...{ skill, updateSkill }}
            field="degree"
        />
        <Divider />
    </>: 
    null;
}