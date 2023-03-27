import { Table, TableRow, TableCell, TableHead, TableBody } from "@material-ui/core";

export const SkillDetailTable = ({ display, data }) =>{
    const tableRows = [];

    data.datasets.forEach((dataset, i) => {
        dataset.data.forEach((dataPoint, j) => {
            if(!tableRows[j]) {
                tableRows[j] = [];
            }
            tableRows[j][i] = dataPoint;
        });
    });

    return <>{ display === 'table' && <Table>
        <TableHead>
            <TableRow>
                {
                    data.datasets.map((dataset, i) =>
                        <TableCell key={i}>{dataset.label ?? '' }</TableCell>)
                }
            </TableRow>
        </TableHead>
        <TableBody>
            {
                tableRows.map((row, i) =>
                    <TableRow key={i}>
                        {
                            Array.from(row, (_, i) => !(i in row) ? null : row[i])
                                .map((cell, j) =>
                                <TableCell key={j}>
                                    {
                                        cell
                                    }
                                </TableCell>)
                        }
                    </TableRow>)
            }
        </TableBody>
    </Table>}</>;
}
   