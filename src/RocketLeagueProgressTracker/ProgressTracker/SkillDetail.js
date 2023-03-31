import { Button, ButtonGroup, Paper, TableRow, useTheme } from "@material-ui/core";
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
import { useContext, useState } from "react";
import { TableRefContext } from "../ContextProviders/TableRefContext";
import { LineChart } from "./SkillDetailDisplays/LineChart";
import { SkillDetailTable } from "./SkillDetailDisplays/SkillDetailTable";
import { SkillGroupsPeopleContext } from "../ContextProviders/SkillGroupsPeopleProvider";
import { getColorFromSpectrumPosition } from "./Utilities/getColorFromSpectrumPosition";

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

const SPECTRUM_BREADTH = 12;

export const SkillDetail = ({ title, skillIndex, skillGroupIndex, activePersonName, skillDegreeHistory = [], }) => {
    const tableContainerRef = useContext(TableRefContext);
    const [getPeopleFromSkillGroup, dispatchPeopleToSkillGroup] = useContext(SkillGroupsPeopleContext);
    const theme = useTheme().palette.type;

    const localPeople = getPeopleFromSkillGroup(skillGroupIndex); // There's nothing for you, here.
    const [selectedLocalPeople, setLocalPeople] = useState([]);

    const toggleLocalPersonPresence = (personName) => {
        setLocalPeople(selectedLocalPeople.includes(personName) ?
            selectedLocalPeople.filter(name => name !== personName) :
            [...selectedLocalPeople, personName]);
    }

    ChartJS.defaults.color = theme === 'dark' ? '#fff' : '#303030';
    const targetWidth = tableContainerRef?.current?.offsetWidth - 24;

    const [display, setDisplay] = useState('table');

    const skillProgressions = Object.entries(skillDegreeHistory)
        .map(([measurementName, degreeHistoryMeasurement], i) => {
            const spectrumPosition = i % SPECTRUM_BREADTH;
            const { red, green, blue } = getColorFromSpectrumPosition(spectrumPosition/SPECTRUM_BREADTH);
            return ({
                label: `${activePersonName} - ${measurementName}`,
                data: degreeHistoryMeasurement.map(({ degree, date }) => ({
                    x: date,
                    y: degree,
                })),
                fill: false,
                borderColor: `rgb(${red},${green},${blue})`,
                tension: 0.1,
            });
        });

    const timescales = Object.values(skillDegreeHistory).map(degreeHistoryArray => degreeHistoryArray.map(({ date }) => date));

    const flattenedTimescales = timescales.flat().sort().filter((item, pos, array) => !pos || item !== array[pos - 1]);

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: !!title,
            text: title,
          },
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    // Luxon format string
                    tooltipFormat: 'DD T YY'
                },
                title: {
                    display: true,
                    text: 'Date'
                },
                ticks: {
                    color: ChartJS.defaults.color,
                }
            },
            y: {
                ticks: {
                    color: ChartJS.defaults.color,
                }
            },
        }
    };

    const data = {
        labels: flattenedTimescales,
        datasets: skillProgressions,
    };

    return <TableRow>
        <td colSpan="42">
            <Paper>
                <div style={{
                    display: "flex"
                }}>
                    <ButtonGroup style={{ margin: '16px' }}>
                        <Button variant={ display === 'table' ? 'contained' : 'outlined' } onClick={() => setDisplay('table')}>Table</Button>
                        <Button variant={ display === 'line_chart' ? 'contained' : 'outlined' } onClick={() => setDisplay('line_chart')}>Line Chart</Button>
                    </ButtonGroup>
                    <ButtonGroup style={{ margin: '16px' }}>
                        {/* TODO: Map people from the skill group into this section, add them to the table and line charts. */}
                        {
                            localPeople
                                .filter(
                                    person => person.name !== activePersonName
                                )
                                .map((person, i) => 
                                    <Button
                                        key={i}
                                        variant={ selectedLocalPeople.includes(person.name) ? 'contained' : 'outlined' }
                                        onClick={ () => toggleLocalPersonPresence(person.name)}
                                    >
                                        {person.name}
                                    </Button>)
                        }
                    </ButtonGroup>
                </div>
                <SkillDetailTable display={display} data={data} skillIndex={skillIndex} skillGroupIndex={skillGroupIndex} />
                <LineChart display={display} data={data} options={options} targetWidth={targetWidth ?? 0} />
            </Paper>
        </td>
    </TableRow>;
}