import { Divider } from "@material-ui/core";
import { MeasurementForm } from "./MeasurementForm";
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
        {/* TODO: Replace with Measurements Form */}
        <MeasurementForm
            measurement={skill.measurement}
            updateMeasurement={(measurement) => updateSkill({ ...skill, measurement })}
        />
        <Divider />
    </>: 
    null;
}