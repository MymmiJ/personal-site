import { FormControl, Input, InputLabel } from "@material-ui/core";
import { Label } from "@material-ui/icons";

export const PersonForm = ({ person, updatePerson = () => {} }) => {
    return person ? 
    <FormControl>
        <InputLabel><Label/>Name:</InputLabel>
        <Input value={person.name ?? ''} onChange={({ target: { value } }) => updatePerson({...person, name: value })} />
    </FormControl>: 
    null;
}