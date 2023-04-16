import { Divider } from "@material-ui/core";
import { MeasurementsForm } from "./MeasurementsForm";
import { SkillFormElement } from "./SkillFormComponents/SkillFormElement";
import { ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS } from "../Factories/measurementsMaker";
import { TimeInput } from "../ProgressTracker/SkillInput/TimeInput";
import { NumberInput } from "../ProgressTracker/SkillInput/NumberInput";

export const SkillForm = ({ skill, updateSkill }) => {
    const InputComponent = skill.measurements.display === ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.TIME ?
        TimeInput :
        NumberInput;

    return skill ?
    <>
        <SkillFormElement
            {...{ skill, updateSkill }}
            field="name"
        />
        <InputComponent
            degree={ skill.degree }
            onChange={ (degree) => updateSkill({ ...skill, degree }) }
        />
        <MeasurementsForm
            measurements={skill.measurements}
            updateMeasurements={(measurements) => updateSkill({
                ...skill,
                name: skill.name ?? ' ',
                degreeHistory: {
                    ...skill.degreeHistory,
                    [measurements.name]: [{
                        degree: [skill.degree],
                        date: Date.now()
                    }]
                },
                measurements
            })}
        />
        <Divider />
    </>: 
    null;
}