import { Button, Typography } from "@material-ui/core"
import { useContext } from "react";
import { GlobalPeopleContext } from "../ContextProviders/GlobalPeopleProvider";
import { PersonForm } from "./PersonForm"

export const PeopleForm = ({ people = [], updatePeople }) => {
    const [globalPeople,] = useContext(GlobalPeopleContext);

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
        <div>
            {
                globalPeople.map((person, i) =>
                    <Button
                        key={i}
                        style={{
                            border: '2px solid',
                            margin: '8px'
                        }}
                        onClick={() => updatePeople([
                            ...people.slice(0, i),
                            person,
                            ...people.slice(i+1)
                        ])}>
                        Add {person.name} to Skill Group
                    </Button>)
            }
        </div>
    </>
}