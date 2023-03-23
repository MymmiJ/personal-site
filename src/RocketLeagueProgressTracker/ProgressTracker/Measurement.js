import { MenuItem, Select } from "@material-ui/core";

export const Measurement = ({ name, priority, display, maxPriority, commensurableWith, measurements, onSelect }) => {
    // Colour display according to measurement priority
    // Dropdown to select measurement type
    return <>
        <Select
            value={name}
            onChange={({ target: { value } }) => onSelect(value)}
        >
            {measurements.map(measurement => <MenuItem key={measurement.name} value={measurement.name}>{measurement.name}</MenuItem>)}
        </Select>
    </>;
};