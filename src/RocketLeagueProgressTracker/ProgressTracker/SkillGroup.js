import { Skill } from "./Skill"

export const SkillGroup = ({ skills }) => {
    return <>
        {skills.map((skill, i) => <Skill key={i} {...skill} index={i} />)}
    </>
}