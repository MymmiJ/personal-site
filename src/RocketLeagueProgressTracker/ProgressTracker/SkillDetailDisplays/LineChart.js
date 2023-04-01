import { Chart as ChartJS } from 'chart.js';
import { Line } from "react-chartjs-2";

export const LineChart = ({ display, targetWidth, title, data }) => {
    
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
                    tooltipFormat: 'MMM d yyyy'
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
    return <>{ display === 'line_chart' && <Line style={{ width: `${targetWidth}px` }} options={options} data={data} width={targetWidth} height={600} /> }</>;
}