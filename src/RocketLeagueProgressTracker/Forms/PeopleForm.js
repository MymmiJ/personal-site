import { Typography } from "@material-ui/core"
import { PersonForm } from "./PersonForm"

export const PeopleForm = ({ people = [] }) => {
    return <>
        <Typography>People:</Typography>
        { people.map((person, i) => <PersonForm person={person} key={i} />)}
    </>
}