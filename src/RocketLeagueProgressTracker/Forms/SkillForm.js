import { Divider } from "@material-ui/core";
import { MeasurementsForm } from "./MeasurementsForm";
import { SkillFormElement } from "./SkillFormComponents/SkillFormElement";

export const SkillForm = ({ skill, updateSkill }) => {
    return skill ?
    <>
        <SkillFormElement
            {...{ skill, updateSkill }}
            field="name"
        />
        <SkillFormElement
            {...{ skill, updateSkill }}
            field="degree"
        />
        <MeasurementsForm
            measurements={skill.measurements}
            updateMeasurements={(measurements) => updateSkill({
                ...skill,
                name: skill.name ?? ' ',
                degreeHistory: {
                    ...skill.degreeHistory,
                    [measurements.name]: [skill.degree],
                },
                measurements
            })}
        />
        <Divider />
    </>: 
    null;
}