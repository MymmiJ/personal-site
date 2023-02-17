import { TableCell, TableRow } from "@material-ui/core"
import { Skill } from "./Skill"

export const SkillGroup = ({ skills }) => {
    return <>
        {skills.map((skill, i) => <Skill key={i} {...skill} index={i} />)}
        {/* TODO: Extract this into its own component */}
        <TableRow>
            <TableCell>Add new skill group button</TableCell>
            <TableCell>Remove skill group button</TableCell>
        </TableRow>
    </>
}