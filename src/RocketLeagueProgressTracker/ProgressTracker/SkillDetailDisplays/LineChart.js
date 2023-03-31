import { Line } from "react-chartjs-2";

export const LineChart = ({ display, targetWidth, options, data }) =>
    <>{ display === 'line_chart' && <Line style={{ width: `${targetWidth-16}px` }} options={options} data={data} width={targetWidth-16} height={600} /> }</>;