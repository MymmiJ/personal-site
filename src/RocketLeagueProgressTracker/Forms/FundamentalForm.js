import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { Label } from "@material-ui/icons";

export const FundamentalForm = ({ fundamental, updateFundamental }) => {
    return <FormControl>
        <InputLabel htmlFor='fundamental-name-input'><Label alt='Fundamental'/></InputLabel>
        <Input
            id='fundamental-name-input'
            value={fundamental ?? ''}
            onChange={({ target: { value } }) => {
                if(value) {
                    return updateFundamental(value);
                }
                return updateFundamental(null);
            }}
            aria-describedby='fundamental-name-helper-text'
        />
        <FormHelperText id='fundamental-name-helper-text'>Enter a name for the fundamental you want to add</FormHelperText>
    </FormControl>
}