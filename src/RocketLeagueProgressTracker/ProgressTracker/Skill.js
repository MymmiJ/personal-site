import { TableCell, TableRow, Tooltip, Typography } from "@material-ui/core";
import { Measurement } from "./Measurement";

export const Skill = ({ name, degree, measurements, tooltip }) => {
    return <Tooltip {...tooltip}>
        <TableRow>
            <TableCell><Typography>{name}</Typography></TableCell>
            <TableCell><Measurement {...measurements} /></TableCell>
            <TableCell><Typography>{degree}</Typography></TableCell>
            <TableCell>Remove skill button</TableCell>
        </TableRow>
    </Tooltip>;
};