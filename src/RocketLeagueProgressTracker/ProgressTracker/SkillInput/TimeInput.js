import { Input } from "@material-ui/core";

export const TimeInput = ({ degree, onChange, onKeyUp }) => {
    const degreeAsNumber = degree ? degree : 0;
    const hours = Math.floor(degreeAsNumber / 3600);
    const minutes = Math.floor((degreeAsNumber % 3600) / 60);
    const seconds = degreeAsNumber % 60;
    return <div style={{ display: 'flex', flexDirection: 'row' }}>
        H:
        <Input
            type="number"
            style={{ maxWidth: '64px', marginRight: '4px', marginLeft: '4px' }}
            value={Number(hours)}
            onChange={({ target: { value } }) => {
                const newDegree = (value * 3600) + (minutes * 60) + seconds;
                onChange(newDegree > 0 ? newDegree : 0);
            }}
            onKeyUp={onKeyUp}
        />
        M:
        <Input
            type="number"
            style={{ maxWidth: '64px', marginRight: '4px', marginLeft: '4px' }}
            value={Number(minutes)}
            onChange={({ target: { value } }) => {
                const newDegree = (hours * 3600) + (value * 60) + seconds;
                onChange(newDegree > 0 ? newDegree : 0);
            }}
            onKeyUp={onKeyUp}
        />
        S:
        <Input
            type="number"
            style={{ maxWidth: '64px', marginRight: '4px', marginLeft: '4px' }}
            value={Number(seconds)}
            onChange={({ target: { value } }) => {
                const newDegree = (hours * 3600) + (minutes * 60) + Number(value);
                onChange(newDegree > 0 ? newDegree : 0);
            }}
            onKeyUp={onKeyUp}
        />
    </div>;
}