import { Button, ButtonGroup, Paper, Switch, TableRow, Typography, useTheme } from "@material-ui/core";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Colors,
    TimeScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { useContext, useEffect, useState } from "react";
import { TableRefContext } from "../../ContextProviders/TableRefContext";
import { LineChart } from "../SkillDetailDisplays/LineChart";
import { SkillDetailTable } from "../SkillDetailDisplays/SkillDetailTable";
import { SkillGroupsPeopleContext } from "../../ContextProviders/SkillGroupsPeopleProvider";
import { getColorFromSpectrumPosition } from "../Utilities/getColorFromSpectrumPosition";
import { SkillGroupsContext } from "../../ContextProviders/SkillGroupsContextProvider";
import { getMeasurementTypeYAxisFromSkillGroup } from "./yAxis";
import { SPECTRUM_BREADTH } from "./constants";
import { getTimescales } from "./timescales";

ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Colors,
    Title,
    Tooltip,
    Legend
);

export const SkillDetail = ({ title, skillIndex, skillGroupIndex, activePersonName, skillDegreeHistory = [], }) => {
    const tableContainerRef = useContext(TableRefContext);
    const [skillGroups,] = useContext(SkillGroupsContext);
    const [getPeopleFromSkillGroup,] = useContext(SkillGroupsPeopleContext);
    const [xAxisDisplayTime, setXAxisDisplayTime] = useState(true);
    const theme = useTheme().palette.type;

    const localPeople = getPeopleFromSkillGroup(skillGroupIndex)
        .filter(
            person => person.name !== activePersonName
        ); // There's nothing for you, here.
    const [selectedLocalPeopleNames, setLocalPeopleNames] = useState([]);
    useEffect(() => setLocalPeopleNames([]), [activePersonName]);

    const toggleLocalPersonPresence = (personName) => {
        setLocalPeopleNames(selectedLocalPeopleNames.includes(personName) ?
            selectedLocalPeopleNames.filter(name => name !== personName) :
            [...selectedLocalPeopleNames, personName]);
    }

    ChartJS.defaults.color = theme === 'dark' ? '#fff' : '#303030';
    const targetWidth = tableContainerRef?.current?.offsetWidth - 24;

    const [display, setDisplay] = useState('table');

    const selectedLocalPeopleSkillDegreeHistories = selectedLocalPeopleNames.map((personName) => {
        const selectedPerson = localPeople.find(person => person.name === personName);
        const selectedPersonSkillDegreeHistory = selectedPerson?.skills?.[skillIndex]?.degreeHistory;
        return selectedPersonSkillDegreeHistory ? {
            degreeHistory: selectedPersonSkillDegreeHistory,
            name: personName,
        } : false;
    }).filter(p => !!p);

    let currentSkillDegreeCount = 0;
    const activePersonSkillProgressions = Object.entries(skillDegreeHistory)
        .map(([measurementName, degreeHistoryMeasurement], i) => {
            const spectrumPosition = i % SPECTRUM_BREADTH;
            const { red, green, blue } = getColorFromSpectrumPosition(spectrumPosition/SPECTRUM_BREADTH);
            currentSkillDegreeCount = i + 1;
            const yAxisID = getMeasurementTypeYAxisFromSkillGroup(skillGroups[skillGroupIndex], skillIndex, measurementName);
            return ({
                label: `${activePersonName} - ${measurementName}`,
                data: degreeHistoryMeasurement.map(({ degree, date }) => ({
                    x: date,
                    y: degree,
                })),
                fill: false,
                borderColor: `rgb(${red},${green},${blue})`,
                tension: 0.1,
                yAxisID,
            });
        });
    const skillProgressions = [
        ...activePersonSkillProgressions,
        ...selectedLocalPeopleSkillDegreeHistories.map(selectedPersonSkillDegreeHistory => {
            const entries = Object.entries(selectedPersonSkillDegreeHistory.degreeHistory);
            const skillDegreeCountOffset = currentSkillDegreeCount;
            return entries.map(([measurementName, degreeHistoryMeasurement], i) => {
                const spectrumPosition = i + skillDegreeCountOffset % SPECTRUM_BREADTH;
                const { red, green, blue } = getColorFromSpectrumPosition(spectrumPosition/SPECTRUM_BREADTH);
                currentSkillDegreeCount = i + skillDegreeCountOffset + 1;
                const yAxisID = getMeasurementTypeYAxisFromSkillGroup(skillGroups[skillGroupIndex], skillIndex, measurementName);
                return ({
                    label: `${selectedPersonSkillDegreeHistory.name} - ${measurementName}`,
                    data: degreeHistoryMeasurement.map(({ degree, date }) => ({
                        x: date,
                        y: degree,
                    })),
                    fill: false,
                    borderColor: `rgb(${red},${green},${blue})`,
                    tension: 0.1,
                    yAxisID,
                });
            });
        }).flat()
    ];

    const timescales = getTimescales(skillProgressions, xAxisDisplayTime)

    const data = {
        labels: timescales,
        datasets: skillProgressions,
    };

    return <TableRow>
        <td colSpan="42">
            <Paper>
                <div style={{
                    display: "flex"
                }}>
                    <ButtonGroup style={{ margin: '16px' }}>
                        <Button variant={ display === 'table' ? 'contained' : 'outlined' } style={{ maxHeight: '40px' }}  onClick={() => {
                            setDisplay('table');
                            setXAxisDisplayTime(true);
                        }}>Table</Button>
                        <Button variant={ display === 'line_chart' ? 'contained' : 'outlined' } style={{ maxHeight: '40px' }}  onClick={() => setDisplay('line_chart')}>Line Chart</Button>
                    </ButtonGroup>
                    
                    {
                        display === 'line_chart' ?
                            <div style={{ margin: '16px' }}>
                                <Switch checked={ xAxisDisplayTime } onChange={ () => setXAxisDisplayTime(!xAxisDisplayTime) }
                                        aria-label="Enable Date On X Axis" title="Enable Date On X Axis" />
                                <Typography>Enable Date On X Axis</Typography>
                            </div>
                            : null
                    }
                    <ButtonGroup style={{ margin: '16px' }}>
                        {
                            localPeople
                                .map((person, i) => 
                                    <Button
                                        key={i}
                                        variant={ selectedLocalPeopleNames.includes(person.name) ? 'contained' : 'outlined' }
                                        style={{ maxHeight: '40px' }}
                                        onClick={ () => toggleLocalPersonPresence(person.name)}
                                    >
                                        {person.name}
                                    </Button>)
                        }
                    </ButtonGroup>
                </div>
                <SkillDetailTable display={display} data={data} skillIndex={skillIndex} skillGroupIndex={skillGroupIndex} />
                <LineChart display={display} data={data} title={title} targetWidth={targetWidth ?? 0} xAxisDisplayTime={xAxisDisplayTime} />
            </Paper>
        </td>
    </TableRow>;
}