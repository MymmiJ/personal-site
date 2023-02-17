import { MenuItem, Select } from "@material-ui/core";

export const Measurement = ({ name, priority, display, maxPriority, commensurableWith, measurements }) => {
    // Colour display according to measurement priority
    // Dropdown to select measurement type
    return <>
        <Select
            value={name}
        >
            <MenuItem value={name}>{name}</MenuItem>
            {measurements.map(measurement => <MenuItem key={measurement.name}>{measurement.name}</MenuItem>)}
        </Select>
    </>;
};