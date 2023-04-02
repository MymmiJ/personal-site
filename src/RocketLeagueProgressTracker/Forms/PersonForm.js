import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { Label } from "@material-ui/icons";

export const PersonForm = ({ person, updatePerson }) => {
    return person ? 
    <FormControl>
        <InputLabel htmlFor='person-name-input'><Label alt='Name'/></InputLabel>
        <Input
            id='person-name-input'
            value={person.name ?? ''}
            onChange={({ target: { value } }) => {
                if(value && value.length >= 1) {
                    return updatePerson({...person, name: value })
                }
                return updatePerson(null);
            }}
            aria-describedby='person-name-helper-text'
        />
        <FormHelperText id='person-name-helper-text'>Enter a name for the person you want to add</FormHelperText>
    </FormControl>: 
    null;
}