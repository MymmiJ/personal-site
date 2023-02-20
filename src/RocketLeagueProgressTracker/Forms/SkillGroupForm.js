import {  FormGroup } from "@material-ui/core"
import { PeopleForm } from "./PeopleForm";
import { PersonForm } from "./PersonForm";
import { SkillForm } from "./SkillForm";

export const SkillGroupForm = ({ skillGroup, updateSkillGroup }) => {
    return <FormGroup>
        <SkillForm />
        <PeopleForm />
        <PersonForm />
    </FormGroup>;
}