import { Table, TableRow, TableCell, TableHead, TableBody, Input, Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { SkillGroupsContext } from "../../ContextProviders/SkillGroupsContextProvider";
import { updateActivePersonSkillDegreeHistory } from "../../Reducers/Actions/SkillGroupsActions/SkillDegreeHistoryActions/updateActivePersonSkillDegreeAction";
import { SkillGroupsPeopleContext } from "../../ContextProviders/SkillGroupsPeopleProvider";
import { getInputComponentFromMeasurements } from "../Skill";
import { removeActivePersonSkillDegreeHistoryAction } from "../../Reducers/Actions/SkillGroupsActions/SkillDegreeHistoryActions/removeActivePersonSkillDegreeHistoryAction";

// TODO: We've written everything twice here, when we have some time we should deduplicate and abstract.
// TODO: Allow removing entries from degreeHistory
export const SkillDetailTable = ({ display, data, skillIndex, skillGroupIndex }) => {
    const [scrollAmount, setScrollAmount] = useState(0);
    const [skillGroups, dispatch] = useContext(SkillGroupsContext);
    const measurements = skillGroups[skillGroupIndex].skills[skillIndex].measurements.measurements;
    const [getPeopleFromSkillGroup, dispatchPeopleToSkillGroup] = useContext(SkillGroupsPeopleContext);
    const tableRows = [];

    const currentPeople = getPeopleFromSkillGroup(skillGroupIndex);

    data.datasets.forEach((dataset, i) => {
        dataset.data.forEach((dataPoint, j) => {
            if(!tableRows[j]) {
                tableRows[j] = [];
            }

            const [personName, measurementName] = dataset.label.split(' - ');

            tableRows[j][i] = {
                dataPoint,
                InputComponent: getInputComponentFromMeasurements(measurements.find(measurement => measurement.name === measurementName) ?? {}),
                onChange: (value) => {
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
                        const personIndex = currentPeople.findIndex((person) => personName === person.name);
                        const currentPerson = currentPeople[personIndex];
                        const currentPersonSkills = currentPerson.skills;
                        const currentPersonSkill = currentPersonSkills[skillIndex];
                        const currentPersonDegreeHistory = currentPersonSkill.degreeHistory;
                        const currentPersonDegreeHistoryMeasurement = currentPersonDegreeHistory[measurementName];
                        // updatePeople
                        dispatchPeopleToSkillGroup(
                            [...currentPeople.slice(0, personIndex),
                            {
                                ...currentPerson,
                                skills: [...currentPersonSkills.slice(0,skillIndex), { ...currentPersonSkill,
                                    degreeHistory: {
                                        ...currentPersonDegreeHistory,
                                        [measurementName]: [...currentPersonDegreeHistoryMeasurement.slice(0,j),
                                            { degree: Number(value), date: dataPoint.x },
                                            ...currentPersonDegreeHistoryMeasurement.slice(j+1) ]
                                    }
                                }, ...currentPersonSkills.slice(skillIndex+1)]
                            },
                            ...currentPeople.slice(personIndex+1)
                            ],
                            skillGroupIndex,
                        );
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
                        const personIndex = currentPeople.findIndex((person) => personName === person.name);
                        const currentPerson = currentPeople[personIndex];
                        const currentPersonSkills = currentPerson.skills;
                        const currentPersonSkill = currentPersonSkills[skillIndex];
                        const currentPersonDegreeHistory = currentPersonSkill.degreeHistory;
                        const currentPersonDegreeHistoryMeasurement = currentPersonDegreeHistory[measurementName];
                        dispatchPeopleToSkillGroup(
                            [...currentPeople.slice(0, personIndex),
                            {
                                ...currentPerson,
                                skills: [...currentPersonSkills.slice(0,skillIndex), { ...currentPersonSkill,
                                    degreeHistory: {
                                        ...currentPersonDegreeHistory,
                                        [measurementName]: [...currentPersonDegreeHistoryMeasurement.slice(0,j),
                                            { degree: dataPoint.y, date: Date.parse(value) },
                                            ...currentPersonDegreeHistoryMeasurement.slice(j+1) ]
                                    }
                                }, ...currentPersonSkills.slice(skillIndex+1)]
                            },
                            ...currentPeople.slice(personIndex+1)
                            ],
                            skillGroupIndex,
                        );
                    }
                },
                onRemove: () => {
                    if(personName === skillGroups[skillGroupIndex].activePerson.name) {
                        dispatch(
                            removeActivePersonSkillDegreeHistoryAction(
                                skillGroupIndex,
                                skillIndex,
                                measurementName,
                                j,
                            )
                        );
                    } else {
                        // updatePeople
                        const personIndex = currentPeople.findIndex((person) => personName === person.name);
                        const currentPerson = currentPeople[personIndex];
                        const currentPersonSkills = currentPerson.skills;
                        const currentPersonSkill = currentPersonSkills[skillIndex];
                        const currentPersonDegreeHistory = currentPersonSkill.degreeHistory;
                        const currentPersonDegreeHistoryMeasurement = currentPersonDegreeHistory[measurementName];
                        dispatchPeopleToSkillGroup(
                            [...currentPeople.slice(0, personIndex),
                            {
                                ...currentPerson,
                                skills: [...currentPersonSkills.slice(0,skillIndex), { ...currentPersonSkill,
                                    degreeHistory: {
                                        ...currentPersonDegreeHistory,
                                        [measurementName]: currentPersonDegreeHistoryMeasurement
                                            .filter((_, i) => i !== j)
                                    }
                                }, ...currentPersonSkills.slice(skillIndex+1)]
                            },
                            ...currentPeople.slice(personIndex+1)
                            ],
                            skillGroupIndex,
                        );
                    }
                }
            };
        });
    });

    // Prevents scrolling past the table at right hand side
    const scrollValue = scrollAmount > 90 ? `calc(${scrollAmount}% - ${(1/(10-scrollAmount)) * 320}px)` : `${scrollAmount}%`;
    return <>{ display === 'table' && <>
    <input style={{ width: '89.5%' }} type="range" value={scrollAmount} onChange={({ target: { value }}) => setScrollAmount(Number(value))} min={0} max={75}/>
    <Table style={{
        position: 'relative',
        right: scrollValue,
    }}>
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
                                .map((maybeCell, j) => {
                                    if(!maybeCell) return <TableCell key={j} />;

                                    const { dataPoint, onChange, onChangeDate, onRemove, InputComponent } = maybeCell;
                                    return <TableCell key={j}>
                                        Degree of Skill:&nbsp;
                                        <InputComponent onChange={onChange} degree={dataPoint.y} />
                                        <br />
                                        Date (UTC):&nbsp;
                                        <Input
                                            type="datetime-local"
                                            value={(new Date(dataPoint.x)).toISOString().replace(/Z$/,'')}
                                            onChange={onChangeDate}
                                        />
                                        <br />
                                        <Button  onClick={onRemove}>Remove</Button>
                                    </TableCell>;   
                                })
                        }
                    </TableRow>)
            }
        </TableBody>
    </Table>
    <input style={{ width: '89.5%' }} type="range" value={scrollAmount} onChange={({ target: { value }}) => setScrollAmount(Number(value))} min={0} max={75}/>
    </>}</>;
}
   