import { SkillGroup } from "./SkillGroup";

export const ProgressTracker = ({ skillGroups }) => {
    // SkillGroups to change colour along the spectrum as `i` increases
    return <>
        {skillGroups.map((skillGroup, i) => <SkillGroup key={i} {...skillGroup} index={i} />)}
    </>;
}