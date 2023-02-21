import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { skillMaker } from "../../Factories/skillMaker";

export const SkillFormElement = ({ skill, updateSkill, field }) => {
    const safeSkill = skill ?? skillMaker();
    const elementId = `skill-${field}-input`;
    const elementDescriptionId = `skill-${field}-helper-text`;
    return <FormControl>
        <InputLabel htmlFor={elementId}><Label alt={field}/></InputLabel>
        <Input
            id={elementId}
            value={safeSkill[field] ?? ''}
            onChange={({ target: { value } }) => {
                if(value && value.length >= 1) {
                    return updateSkill({...safeSkill, [field]: value })
                }
                return updateSkill(null);
            }}
            aria-describedby={`skill-${field}-helper-text`}
        />
        <FormHelperText id={elementDescriptionId}>Enter a {field} for the skill</FormHelperText>
    </FormControl>;
}