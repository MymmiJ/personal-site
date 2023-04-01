import { Chart as ChartJS } from 'chart.js';
import { Line } from "react-chartjs-2";

const getTimeStringFromTimestamp = (timestamp) => {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = timestamp % 60;
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

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
          tooltip: {
            callbacks: {
                label: (context) => context.dataset.yAxisID === 'yTime' ? getTimeStringFromTimestamp(context.parsed.y) : context.parsed.y
            }
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
            yTime: {
                position: 'right',
                ticks: {
                    color: ChartJS.defaults.color,
                    callback: getTimeStringFromTimestamp,
                }
            }
        }
    };
    return <>{ display === 'line_chart' && <Line style={{ width: `${targetWidth}px` }} options={options} data={data} width={targetWidth} height={600} /> }</>;
}