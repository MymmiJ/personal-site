import { Button, TableBody, TableCell, TableRow } from "@material-ui/core"
import { useContext } from "react"
import styled from "styled-components"
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider"
import { removeSkillGroupAction } from "../Reducers/Actions/removeSkillGroupAction"
import { Skill } from "./Skill"

const BottomBorderTableBody = styled(TableBody)`
    border-bottom: solid 4px;
`;

export const SkillGroup = ({ skills, index }) => {
    const [,dispatch] = useContext(SkillGroupsContext);
    return <BottomBorderTableBody>
        {skills.map((skill, i) => <Skill key={i} {...skill} index={i} skillGroupIndex={index} />)}
        {/* TODO: Extract this into its own component */}
        <TableRow>
            {/* Show Modal to add skill */}
            <TableCell><Button onClick={() => {}}>{`Add New Skill`}</Button></TableCell>
        </TableRow>
        {/* TODO: Extract this into its own component */}
        <TableRow>
            <TableCell><Button>Insert New Skill Group</Button></TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillGroupAction(index))}>{`Remove Skill Group ${index + 1}`}</Button></TableCell>
        </TableRow>
    </BottomBorderTableBody>
}