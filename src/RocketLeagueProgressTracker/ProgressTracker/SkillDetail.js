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
import { useContext, useRef } from "react";
import { Line } from 'react-chartjs-2';
import { TableRefContext } from "../ContextProviders/TableRefContext";

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
    const tableContainerRef = useContext(TableRefContext);

    const targetWidth = tableContainerRef?.current?.offsetWidth - 24;
    console.log('target width', targetWidth);

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
    };

    const data = {
        labels: flattenedTimescales,
        datasets: skillProgressions,
    };

    return <TableRow>
        <td colSpan="42">
            <Paper>
                <Line style={{ width: `${targetWidth}px` }} options={options} data={data} width={targetWidth ?? 0} height={600} />
            </Paper>
        </td>
    </TableRow>;
}