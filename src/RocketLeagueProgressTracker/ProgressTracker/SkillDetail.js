import { Paper, TableRow } from "@material-ui/core";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const SkillDetail = ({ title, skillProgressions = [], timescales= [] }) => {
    const flattenedTimescales = timescales.flat().sort().filter((item, pos, array) => !pos || item !== array[pos - 1]);

    const options = {
        responsive: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: !!title,
            text: title,
          },
        },
    };

    const data = {
        labels: flattenedTimescales,
        datasets: skillProgressions,
    };
    
    return <TableRow>
        <td colSpan="42">
            <Paper>
                <Line options={options} data={data} />
            </Paper>
        </td>
    </TableRow>;
}