import { Input } from "@material-ui/core";

export const NumberInput = ({ degree, onChange, onKeyUp = () => {} }) => {
    return <Input
        style={{ maxWidth: '128px', marginRight: '4px', marginLeft: '4px' }}
        value={degree}
        onChange={({ target: { value } }) => onChange(value)}
        onKeyUp={onKeyUp}
    />;
}