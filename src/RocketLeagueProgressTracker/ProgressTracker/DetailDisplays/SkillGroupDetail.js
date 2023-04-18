import { Button, ButtonGroup, Paper, Switch, TableRow, Typography, useTheme } from "@material-ui/core";
import { useContext, useState } from "react";
import { SkillGroupsPeopleContext } from "../../ContextProviders/SkillGroupsPeopleProvider";
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
    RadarController,
    RadialLinearScale,
} from 'chart.js';
import 'chartjs-adapter-luxon';
import { getSkillDegreeHistoriesFromPeople } from "./skillDegreeHistories";
import { SPECTRUM_BREADTH } from "./constants";
import { getColorFromSpectrumPosition } from "../Utilities/getColorFromSpectrumPosition";
import { getYAxisFromMeasurementName } from "./yAxis";
import { getTimescales } from "./timescales";
import { LineChart } from "../SkillDetailDisplays/LineChart";
import { TableRefContext } from "../../ContextProviders/TableRefContext";
import { RadarChart } from "../SkillDetailDisplays/RadarChart";

ChartJS.register(
    RadarController,
    CategoryScale,
    RadialLinearScale,
    LinearScale,
    TimeScale,
    PointElement,
    LineElement,
    Colors,
    Title,
    Tooltip,
    Legend
);

export const SkillGroupDetail = ({ title, skillGroupIndex, activePersonName, skills, }) => {
    const [getPeopleFromSkillGroup,] = useContext(SkillGroupsPeopleContext);
    const [xAxisDisplayTime, setXAxisDisplayTime] = useState(true);
    const theme = useTheme().palette.type;

    const tableContainerRef = useContext(TableRefContext);
    const targetWidth = (tableContainerRef?.current?.offsetWidth ?? 600) - 24;

    const localPeople = getPeopleFromSkillGroup(skillGroupIndex)
    .filter(
        person => person.name !== activePersonName
    ); // There's nothing for you, here.

    ChartJS.defaults.color = theme === 'dark' ? '#fff' : '#303030';

    const [display, setDisplay] = useState('line_chart');

    const activePersonSkillDegreeHistories = skills.map(skill => skill.degreeHistory ? ({
        degreeHistory: skill.degreeHistory,
        name: activePersonName ?? '',
        skill: skill.name ?? '',
        measurements: skill.measurements ?? {},
        activeMeasurementName: skill.measurements.name,
    }) : false)

    const localPeopleSkillDegreeHistories = getSkillDegreeHistoriesFromPeople(localPeople);

    const allSkillDegreeHistories = activePersonSkillDegreeHistories.concat(localPeopleSkillDegreeHistories)

    const allSkillProgressions = allSkillDegreeHistories.map((skillDegreeHistory, i) => {
        const activeDegreeHistory = skillDegreeHistory.degreeHistory[skillDegreeHistory.activeMeasurementName];
        if(!skillDegreeHistory || !activeDegreeHistory) {
            return false;
        }
        const spectrumPosition = i % SPECTRUM_BREADTH;
        const { red, green, blue } = getColorFromSpectrumPosition(spectrumPosition/SPECTRUM_BREADTH);
        const yAxisID = getYAxisFromMeasurementName(skillDegreeHistory.measurements);
        return ({
            label: `${skillDegreeHistory.name} - ${skillDegreeHistory.skill} (${skillDegreeHistory.activeMeasurementName})`,
            data: activeDegreeHistory.map(({ degree, date }) => ({
                x: date,
                y: degree,
            })),
            fill: false,
            borderColor: `rgb(${red},${green},${blue})`,
            tension: 0.1,
            yAxisID,
        });
    }).filter(p => !!p);
    
    const timescales = getTimescales(allSkillProgressions, xAxisDisplayTime);

    const radarLabels = skills.map(skill => skill.name);

    const rawRadarData = skills.map(skill => {
        const activeDegreeHistory = skill.degreeHistory[skill.measurements.name];
        if(!activeDegreeHistory || activeDegreeHistory.length === 0) return false;
        const skillDegrees = activeDegreeHistory.map(degree => degree.degree);
        const bestSkillDegree = Math.max(...skillDegrees);
        const otherBestSkillDegrees = localPeopleSkillDegreeHistories
            .filter(degreeHistory => degreeHistory.skill === skill.name)
            .map((degreeHistory) => ({
                name: degreeHistory.name,
                degree: Math.max(...degreeHistory.degreeHistory[skill.measurements.name].map(degree => degree.degree))
            }));
        return [
            {
                name: activePersonName,
                degree: bestSkillDegree
            },
            ...otherBestSkillDegrees,
        ];
    }).filter(p => !!p);
    const radarDataSets = rawRadarData.reduce((acc, curr, i) => {
            curr.forEach(curr => {
                const foundDataset = acc.find(dataset => dataset.label === curr.name);
                if(foundDataset) {
                    foundDataset.data[i] = curr.degree;
                    foundDataset.data = foundDataset.data.map(value => !value ? 0 : value);
                } else {
                    acc.push({
                        label: curr.name,
                        data: [curr.degree],
                    });
                }
            });
            return acc;
        }, []);

    const data = {
        labels: timescales,
        datasets: allSkillProgressions,
    };

    const radarData = {
        labels: radarLabels,
        datasets: radarDataSets,
    };

    return<TableRow style={{ maxHeight: '600px' }}>
        <td colSpan="42">
            <Paper>
                <div style={{
                    display: "flex",
                }}>
                    <ButtonGroup style={{ margin: '16px' }}>
                        <Button variant={ display === 'line_chart' ? 'contained' : 'outlined' } style={{ maxHeight: '40px' }} onClick={() => setDisplay('line_chart')}>Line Chart</Button>
                        <Button variant={ display === 'radar_chart' ? 'contained' : 'outlined' } style={{ maxHeight: '40px' }} onClick={() => {
                            setDisplay('radar_chart');
                            setXAxisDisplayTime(true);
                        }}>Radar Chart</Button>

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
                </div>
                {/* Do not remove this div. It gives the charts a sense of purpose. */}
                <div></div>
                <LineChart display={display} data={data} title={title} targetWidth={targetWidth ?? 0} xAxisDisplayTime={xAxisDisplayTime} />
                <RadarChart display={display} data={radarData} title={title} targetWidth={targetWidth ?? 0} />
            </Paper>
        </td>
    </TableRow>;
};
