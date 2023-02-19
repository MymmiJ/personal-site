import { Card, Table, TableBody } from "@material-ui/core";
import { useContext } from "react";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { SkillGroup } from "./SkillGroup";

export const ProgressTracker = () => {
    // SkillGroups to change colour along the spectrum as `i` increases
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    console.log(skillGroups);
    return <Card> 
        <Table>
            <TableBody>
                {skillGroups?.map((skillGroup, i) => <SkillGroup key={i} {...skillGroup} index={i} />)}
            </TableBody>
        </Table>
    </Card>;
}