import { Typography } from "@material-ui/core"
import { PersonForm } from "./PersonForm"

export const PeopleForm = ({ people = [], updatePeople }) => {
    const updatePerson = (i) => (person) => {
        if(person) {
            updatePeople([...people.slice(0,i), person, ...people.slice(i+1)]);
        } else {
            updatePeople([...people.slice(0,i), ...people.slice(i+1)]);
        }
    }
    const peoplePlusNext = [...people, { name: '' }];
    return <>
        <Typography>People:</Typography>
        { peoplePlusNext.map((person, i) =>
            <PersonForm
                person={person}
                updatePerson={updatePerson(i)}
                key={i}
            />)}
    </>
}