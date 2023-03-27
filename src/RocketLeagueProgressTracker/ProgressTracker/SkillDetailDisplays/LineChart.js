import { Line } from "react-chartjs-2";

export const LineChart = ({ display, targetWidth, options, data }) =>
    <>{ display === 'line_chart' && <Line style={{ width: `${targetWidth}px` }} options={options} data={data} width={targetWidth} height={600} /> }</>;