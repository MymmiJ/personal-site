import { Typography } from "@material-ui/core";
import { skillMaker } from "../Factories/skillMaker";
import { SkillForm } from "./SkillForm";

const usefulFields = ['name','degree'];

export const SkillsForm = ({ skills = [], updateSkills }) => {
    const updateSkill = (i) => (skill) => {
        const skillHasAtLeastOneUsefulField = !!skill && usefulFields.reduce((acc, currentField) => {
            return acc || !!skill[currentField];
        }, false);
        if(skillHasAtLeastOneUsefulField) {
            updateSkills([...skills.slice(0,i), skill, ...skills.slice(i+1)]);
        } else {
            updateSkills([...skills.slice(0,i), ...skills.slice(i+1)]);
        }
    }
    const skillPlusNext = [...skills, skillMaker()];
    return <>
        <Typography>Skills:</Typography>
        { skillPlusNext.map((skill, i) =>
            <SkillForm
                skill={skill}
                updateSkill={updateSkill(i)}
                key={i}
            />)}
    </>
}