import { Button, TableCell, TableRow } from "@material-ui/core"
import { useContext } from "react"
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider"
import { removeSkillGroupAction } from "../Reducers/Actions/removeSkillGroupAction"
import { Skill } from "./Skill"

export const SkillGroup = ({ skills, index }) => {
    const [,dispatch] = useContext(SkillGroupsContext);
    return <>
        {skills.map((skill, i) => <Skill key={i} {...skill} index={i} />)}
        {/* TODO: Extract this into its own component */}
        <TableRow>
            <TableCell><Button>Insert New Skill Group</Button></TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillGroupAction(index))}>{`Remove Skill Group ${index + 1}`}</Button></TableCell>
        </TableRow>
    </>
}