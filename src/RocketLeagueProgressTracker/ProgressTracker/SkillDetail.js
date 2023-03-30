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
} from 'chart.js';
import { useContext, useState } from "react";
import { TableRefContext } from "../ContextProviders/TableRefContext";
import { LineChart } from "./SkillDetailDisplays/LineChart";
import { SkillDetailTable } from "./SkillDetailDisplays/SkillDetailTable";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Colors,
    Title,
    Tooltip,
    Legend
);

export const SkillDetail = ({ title, skillIndex, skillGroupIndex, skillProgressions = [], timescales= [] }) => {
    const tableContainerRef = useContext(TableRefContext);
    const theme = useTheme().palette.type;
    
    ChartJS.defaults.color = theme === 'dark' ? '#fff' : '#303030';
    const targetWidth = tableContainerRef?.current?.offsetWidth - 24;

    const [display, setDisplay] = useState('table');

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
                ticks: {
                    color: ChartJS.defaults.color,
                }
            },
            y: {
                ticks: {
                    color: ChartJS.defaults.color,
                }
            }
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
                    </ButtonGroup>
                </div>
                <SkillDetailTable display={display} data={data} skillIndex={skillIndex} skillGroupIndex={skillGroupIndex} />
                <LineChart display={display} data={data} options={options} targetWidth={targetWidth ?? 0} />
            </Paper>
        </td>
    </TableRow>;
}