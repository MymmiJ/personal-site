import { FormControl, Input, InputLabel } from "@material-ui/core";
import { Label } from "@material-ui/icons";

export const NumberInput = ({ degree, onChange, onKeyUp = () => {} }) => {
    return <FormControl>
        <InputLabel htmlFor={`number-input-${degree}`}><Label/></InputLabel>
        <Input
            id={`number-input-${degree}`}
            style={{
                maxWidth: '128px',
                marginRight: '4px',
                marginLeft: '4px',
                ...(!!degree ? {
                    backgroundImage: `linear-gradient(
                        45deg, 
                        rgba(0,0,0,0.5) 25%, 
                        transparent 25%, 
                        transparent 50%, 
                        rgba(0,0,0,0.5) 50%, 
                        rgba(0,0,0,0.5) 75%, 
                        transparent 75%, 
                        transparent
                        )`,
                    backgroundSize: `4px 4px`
                } : {})
            }}
            value={degree}
            onChange={({ target: { value } }) => onChange(value)}
            onKeyUp={onKeyUp}
        />
    </FormControl>;
}