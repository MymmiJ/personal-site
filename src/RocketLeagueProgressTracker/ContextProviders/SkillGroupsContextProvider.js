import { createContext, useReducer } from "react";
import { skillGroupsReducer } from "../Reducers/skillGroupsReducer";
// import { measurementMaker, measurementsMaker, ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS } from "../Factories/measurementsMaker";
import { skillGroupMaker } from "../Factories/skillGroupMaker";
// import { skillMaker } from "../Factories/skillMaker";
// import { tooltipMaker } from "../Factories/tooltipMaker";

// const DribblingChallengeLevelMeasurement = measurementMaker(
//     'Dribbling Challenge 2 Level',
//     1,
//     ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER
// );

// const DRIBBLING_DEMO_SKILL = skillMaker('Dribbling', measurementsMaker(
//         DribblingChallengeLevelMeasurement,
//         [measurementMaker(
//             'Dribbling Challenge 2 Time',
//             0,
//             ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.TIME                
//         ), DribblingChallengeLevelMeasurement]
//     ),
//     20,
//     tooltipMaker('General Ground Control Skills'),
// );

export const DEFAULT_SKILL_GROUPS_STATE =  [
    skillGroupMaker(
        [],
        [{ name: "AntiSkub" }, { name: "BeesMode" }],
        { name: "AntiSkub" }
    )
];

export const SkillGroupsContext = createContext();

export const SkillGroupsProvider = ({ children }) => {
    const [skillGroups, dispatch] = useReducer(skillGroupsReducer, DEFAULT_SKILL_GROUPS_STATE)

    return <SkillGroupsContext.Provider value={[skillGroups, dispatch]}>
        {children}
    </SkillGroupsContext.Provider>;
}
