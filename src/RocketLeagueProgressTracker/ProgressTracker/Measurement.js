import { Select, Typography } from "@material-ui/core";

export const Measurement = ({ name, priority, display, maxPriority, commensurableWith, measurements }) => {
    // Colour display according to measurement priority
    // Dropdown to select measurement type
    return <>
        <Typography>{name}</Typography>
        <Select></Select>
    </>;
};