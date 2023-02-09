import { Box, Tooltip, Typography } from "@material-ui/core";
import { Measurement } from "./Measurement";

export const Skill = ({ name, degreeOfSkill, measurements, tooltip }) => {
    return <Tooltip {...tooltip}>
        <Box>
            <Typography>{name}</Typography>
            <Typography>{degreeOfSkill}</Typography>
            <Measurement {...measurements} />
        </Box>
    </Tooltip>;
};