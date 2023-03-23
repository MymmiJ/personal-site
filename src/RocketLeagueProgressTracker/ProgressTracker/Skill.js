import { Button, Input, TableCell, TableRow, Tooltip } from "@material-ui/core";
import { useContext } from "react";
import { SkillGroupsContext } from "../ContextProviders/SkillGroupsContextProvider";
import { removeSkillAction } from "../Reducers/Actions/removeSkillAction";
import { updateSkillAction } from "../Reducers/Actions/updateSkillAction";
import { Measurement } from "./Measurement";

export const Skill = ({ name, degree, degreeHistory, measurements, tooltip, index, skillGroupIndex }) => {
    const [, dispatch] = useContext(SkillGroupsContext);
    return <Tooltip {...tooltip}>
        <TableRow>
            <TableCell><Input
                value={name}
                onChange={({ target: { value } }) => dispatch(updateSkillAction('name', value, index, skillGroupIndex))}
                /></TableCell>
            <TableCell>
                <Measurement {...measurements} onSelect={(value) => {
                        dispatch(updateSkillAction(
                            'measurements',
                            measurements.selectMeasurement(value),
                            index,
                            skillGroupIndex,
                        ));
                        dispatch(updateSkillAction(
                            'degree',
                            degreeHistory[value]?.[degreeHistory[value]?.length - 1] ?? '',
                            index,
                            skillGroupIndex,
                        ));
                    }
                } />
            </TableCell>
            <TableCell><Input
                value={degree}
                onChange={({ target: { value } }) => dispatch(updateSkillAction('degree', Number(value), index, skillGroupIndex))}
                onBlur={() => dispatch(updateSkillAction('degreeHistory', {
                    ...degreeHistory,
                    [measurements.name]: [...degreeHistory[measurements.name], degree],
                 }, index, skillGroupIndex))}
                /></TableCell>
            <TableCell><Button onClick={() => dispatch(removeSkillAction(skillGroupIndex, index))}>Remove Skill</Button></TableCell>
        </TableRow>
    </Tooltip>;
};