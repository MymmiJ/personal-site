import { Card, Table, TableBody } from "@material-ui/core";
import { SkillGroup } from "./SkillGroup";

export const ProgressTracker = ({ skillGroups }) => {
    // SkillGroups to change colour along the spectrum as `i` increases
    return <Card> 
        <Table>
            <TableBody>
                {skillGroups.map((skillGroup, i) => <SkillGroup key={i} {...skillGroup} index={i} />)}
            </TableBody>
        </Table>
    </Card>;
}