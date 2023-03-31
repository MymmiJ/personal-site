import { Table, TableRow, TableCell, TableHead, TableBody, Input } from "@material-ui/core";
import { useContext } from "react";
import { SkillGroupsContext } from "../../ContextProviders/SkillGroupsContextProvider";
import { updateActivePersonSkillDegreeHistory } from "../../Reducers/Actions/SkillGroupsActions/updateActivePersonSkillDegreeAction";
import { updatePersonSkillDegreeHistory } from "../../Reducers/Actions/SkillGroupsActions/updatePersonSkillDegreeAction";

export const SkillDetailTable = ({ display, data, skillIndex, skillGroupIndex }) =>{
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    const tableRows = [];

    data.datasets.forEach((dataset, i) => {
        dataset.data.forEach((dataPoint, j) => {
            if(!tableRows[j]) {
                tableRows[j] = [];
            }
            tableRows[j][i] = {
                dataPoint,
                onChange: ({ target: { value }}) => {
                    const [personName, measurementName] = dataset.label.split(' - ');
                    if(isNaN(value)) return;
                    if(personName === skillGroups[skillGroupIndex].activePerson.name) {
                        dispatch(
                            updateActivePersonSkillDegreeHistory(
                                skillGroupIndex,
                                skillIndex,
                                measurementName,
                                j,
                                Number(value)
                            )
                        );
                    } else {
                        // updatePeople
                    }

                }
            };
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
                                .map(({ dataPoint, onChange }, j) =>
                                    <TableCell key={j}>
                                        <Input onChange={onChange} value={dataPoint.y} />
                                    </TableCell>)
                        }
                    </TableRow>)
            }
        </TableBody>
    </Table>}</>;
}
   