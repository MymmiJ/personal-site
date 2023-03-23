import { ExperimentContainer } from "../Common/Containers/ExperimentContainer";
import { GlobalMeasurementsProvider } from "./ContextProviders/GlobalMeasurementsContextProvider";
import { SkillGroupsProvider } from "./ContextProviders/SkillGroupsContextProvider";

import { ProgressTracker } from "./ProgressTracker/ProgressTracker";

// TODO: Enable switch between local and remote.
const RocketLeagueProgressTracker = () =><ExperimentContainer>
    <SkillGroupsProvider>
        <GlobalMeasurementsProvider>
            <ProgressTracker />
        </GlobalMeasurementsProvider>
    </SkillGroupsProvider>
</ExperimentContainer>;

export default RocketLeagueProgressTracker;
