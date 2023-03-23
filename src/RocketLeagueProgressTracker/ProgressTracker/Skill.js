import { Button, TableCell, TableRow, Tooltip, Typography } from "@material-ui/core";
import { useContext } from "react";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { removeSkillAction } from "../Reducers/Actions/removeSkillAction";
import { Measurement } from "./Measurement";

export const Skill = ({ name, degree, degreeHistory, measurements, tooltip, index, skillGroupIndex }) => {
    const [, dispatch] = useContext(SkillGroupsContext);
    return <Tooltip {...tooltip}>
        <TableRow>
            <TableCell><Typography>{name}</Typography></TableCell>
            <TableCell><Measurement {...measurements} /></TableCell>
            <TableCell><Typography>{degree}</Typography></TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillAction(skillGroupIndex, index))}>Remove Skill</Button></TableCell>
        </TableRow>
    </Tooltip>;
};