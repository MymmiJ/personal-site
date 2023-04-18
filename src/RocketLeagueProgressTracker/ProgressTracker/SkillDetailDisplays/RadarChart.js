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
    return <>{ display === 'radar_chart' && <Radar style={{ width: `${Math.floor(targetWidth / 2)}px`,  maxWidth: `${Math.floor(targetWidth / 2)}px`, height: '600px', maxHeight: '600px' }} options={options} data={data} width={Math.floor(targetWidth / 2)} height={600} /> }</>;
}