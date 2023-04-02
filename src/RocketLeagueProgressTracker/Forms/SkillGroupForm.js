import {  FormGroup } from "@material-ui/core"
import { PeopleForm } from "./PeopleForm";
import { SkillsForm } from "./SkillsForm";

export const SkillGroupForm = ({ skillGroup, updateSkillGroup }) => {
    const updatePeople = (people) => updateSkillGroup({
        ...skillGroup,
        people,
    });
    const updateSkills = (skills) => updateSkillGroup({
        ...skillGroup,
        skills,
    });
    return <FormGroup>
        <SkillsForm skills={skillGroup?.skills} updateSkills={updateSkills} />
        <PeopleForm people={skillGroup?.people} updatePeople={updatePeople} />
    </FormGroup>;
}