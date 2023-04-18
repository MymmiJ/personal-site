import { Chart as ChartJS } from 'chart.js';
import { Radar } from "react-chartjs-2";

export const RadarChart = ({ display, targetWidth, title, data }) => {
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
            r: {
                ticks: {
                    color: ChartJS.defaults.color,
                    showLabelBackdrop: false
                }
            }
        },
    };
    return <>{ display === 'radar_chart' && <Radar style={{ width: `${targetWidth}px` }} options={options} data={data} width={targetWidth} height={600} /> }</>;
}