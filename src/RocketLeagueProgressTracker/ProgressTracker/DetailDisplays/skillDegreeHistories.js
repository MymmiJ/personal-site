export const getSkillDegreeHistoriesFromPeople = (people) => {
    return people.map((person) => {
        if(!person?.skills) { return false; }
        const personSkillDegreeHistories = person?.skills?.map(skill => skill.degreeHistory ? ({
            degreeHistory: skill.degreeHistory,
            name: person.name ?? '',
            skill: skill.name ?? '',
            measurements: skill.measurements ?? {},
            activeMeasurementName: skill.measurements.name,
        }) : false)
        return personSkillDegreeHistories.filter(p => !!p);
    }).flat().filter(p => !!p);
}