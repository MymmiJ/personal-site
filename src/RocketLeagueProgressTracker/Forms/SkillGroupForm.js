import {  FormGroup } from "@material-ui/core"
import { PeopleForm } from "./PeopleForm";
import { PersonForm } from "./PersonForm";
import { SkillForm } from "./SkillForm";

export const SkillGroupForm = ({ skillGroup, updateSkillGroup }) => {
    const updatePeople = (people) => updateSkillGroup({
        ...skillGroup,
        people,
    });
    const updateActivePerson = (activePerson) => updateSkillGroup({
        ...skillGroup,
        activePerson,
    });
    return <FormGroup>
        <SkillForm />
        <PeopleForm people={skillGroup?.people} updatePeople={updatePeople} />
        <PersonForm person={skillGroup?.activePerson?.name ?? null} updatePerson={updateActivePerson} />
    </FormGroup>;
}