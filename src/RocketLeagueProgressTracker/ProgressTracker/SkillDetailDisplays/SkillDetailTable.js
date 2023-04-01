import { Table, TableRow, TableCell, TableHead, TableBody, Input } from "@material-ui/core";
import { useContext } from "react";
import { SkillGroupsContext } from "../../ContextProviders/SkillGroupsContextProvider";
import { updateActivePersonSkillDegreeHistory } from "../../Reducers/Actions/SkillGroupsActions/updateActivePersonSkillDegreeAction";
import { updatePeopleAction } from "../../Reducers/Actions/SkillGroupsActions/updatePeopleAction";

export const SkillDetailTable = ({ display, data, skillIndex, skillGroupIndex }) =>{
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    const tableRows = [];

    data.datasets.forEach((dataset, i) => {
        dataset.data.forEach((dataPoint, j) => {
            if(!tableRows[j]) {
                tableRows[j] = [];
            }

            const [personName, measurementName] = dataset.label.split(' - ');

            tableRows[j][i] = {
                dataPoint,
                onChange: ({ target: { value }}) => {
                    if(isNaN(value)) return;
                    if(personName === skillGroups[skillGroupIndex].activePerson.name) {
                        dispatch(
                            updateActivePersonSkillDegreeHistory(
                                skillGroupIndex,
                                skillIndex,
                                measurementName,
                                j,
                                Number(value),
                                dataPoint.x,
                            )
                        );
                    } else {
                        // updatePeople
                    }

                },
                onChangeDate: ({ target: { value }}) => {
                    if(!value || !Date.parse(value)) return;
                    if(personName === skillGroups[skillGroupIndex].activePerson.name) {
                        dispatch(
                            updateActivePersonSkillDegreeHistory(
                                skillGroupIndex,
                                skillIndex,
                                measurementName,
                                j,
                                dataPoint.y,
                                Date.parse(value)
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
                                .map(({ dataPoint, onChange, onChangeDate }, j) =>
                                    <TableCell key={j}>
                                        Degree of Skill:&nbsp;
                                        <Input onChange={onChange} value={dataPoint.y} />
                                        <br />
                                        Date (UTC):&nbsp;
                                        <Input
                                            type="datetime-local"
                                            value={(new Date(dataPoint.x)).toISOString().replace(/Z$/,'')}
                                            onChange={onChangeDate}
                                        />
                                    </TableCell>)
                        }
                    </TableRow>)
            }
        </TableBody>
    </Table>}</>;
}
   