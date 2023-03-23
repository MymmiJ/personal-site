import { FormControl, FormHelperText, Input, InputLabel } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import { skillMaker } from "../../Factories/skillMaker";

export const SkillFormElement = ({ skill, updateSkill, field }) => {
    const safeSkill = skill ?? skillMaker();
    const elementId = `skill-${field}-input`;
    const elementDescriptionId = `skill-${field}-helper-text`;
    const value = safeSkill[field] ?? '';
    return <FormControl>
        <InputLabel htmlFor={elementId}><Label alt={field}/></InputLabel>
        <Input
            id={elementId}
            value={value}
            onChange={({ target: { value } }) => updateSkill({...safeSkill, [field]: value })}
            style={!!value ? {
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
            } : {}}
            aria-describedby={`skill-${field}-helper-text`}
        />
        <FormHelperText id={elementDescriptionId}>Enter a {field} for the skill</FormHelperText>
    </FormControl>;
}