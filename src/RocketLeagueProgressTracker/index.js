import { ExperimentContainer } from "../Common/Containers/ExperimentContainer";
import { measurementMaker, measurementsMaker, ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS } from "./Factories/measurementsMaker";
import { skillGroupMaker } from "./Factories/skillGroupMaker";
import { skillMaker } from "./Factories/skillMaker";
import { tooltipMaker } from "./Factories/tooltipMaker";
import { ProgressTracker } from "./ProgressTracker/ProgressTracker";

// TODO: Enable switch between local and remote.
const RocketLeagueProgressTracker = () => <ExperimentContainer>
    <ProgressTracker skillGroups={[skillGroupMaker([
        skillMaker('Dribbling', measurementsMaker(measurementMaker(
            'Dribbling Challenge 2 Level',
            1,
            ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.NUMBER
            ), [measurementMaker(
                'Dribbling Challenge 2 Time',
                0,
                ROCKET_LEAGUE_MEASUREMENT_DISPLAY_OPTIONS.TIME                
            )]),
            tooltipMaker('General Ground Control Skills'),
            20
        )
    ])]} />
</ExperimentContainer>;

export default RocketLeagueProgressTracker;
